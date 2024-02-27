<template>
  <AdminListWrapper v-if="mounted" pagination show-header>
    <ModalWindow :show="showModalDoctorList" title="Список врачей" @close="showModalDoctorList = false">
      <PersonalityList />
    </ModalWindow>

    <ModalWindow :show="showModalDrugApplications" title="Список комиссий" @close="showModalDrugApplications = false">
      <CommissionDrugApplications />
    </ModalWindow>

    <ModalWindow :show="templatesOpened" title="Выбрать шаблон комиссии" @close="templatesOpened = false">
      <GridContainer grid-gap="5px" margin="10px 0">
        <Button v-for="template in commissionsTemplates" :key="template.id" button-class="change-button" :text="template.name" @click="createCommission(template)" />
      </GridContainer>
    </ModalWindow>
    <ModalWindow :show="showModalDiagnosis" title="Выберите диагноз" @close="showModalDiagnosis = false">
      <GridContainer grid-gap="5px" margin="10px 0">
        <Button
          v-for="patientDiagnosis in selectedCommission.patient.patientDiagnosis"
          :key="patientDiagnosis.id"
          button-class="change-button"
          :text="patientDiagnosis.mkbItem.getFullName()"
          @click="setPatientDiagnosis(patientDiagnosis, selectedCommission)"
        />
      </GridContainer>
    </ModalWindow>
    <!--    :background="patientDiagnosis.mkbItemId === commission.drugId ? '#dff2f8' : ''"-->
    <ModalWindow :show="showModalDrugs" title="Выбор лекарства" @close="showModalDrugs = false">
      <DrugSelectForm @select="(e) => setDrugRecipe(e, selectedCommission)" />
    </ModalWindow>

    <div class="filter-block">
      <GridContainer max-width="900px" grid-gap="27px 10px" grid-template-columns="repeat(auto-fit, minmax(200px, 1fr))" margin="0px">
        <template #grid-items>
          <InfoItem margin="0" :with-open-window="false" :with-icon="false" height="76px" background="#F5F5F5" border-color="#C4C4C4" padding="7px" :with-hover="false">
            <template #title>
              <StringItem string="поиск и сортировка" font-size="10px" padding="0" />
            </template>
            <template #close-inside-content>
              <div :style="{ width: '100%' }">
                <RemoteSearch key-value="patient" placeholder="Начните вводить ФИО" max-width="100%" @select="selectSearch" />
                <!--                <SortList class="filters-block" :store-mode="true" label-name="" max-width="100%" @load="loadPatients" />-->
              </div>
            </template>
          </InfoItem>
        </template>
      </GridContainer>
    </div>
    <div class="scroll-block">
      <div class="patient-count">Количество комиссий: {{ count }}</div>
      <CollapseContainer>
        <template #default="scope">
          <CollapseItem
            v-for="(commission, i) in commissions"
            :key="commission.id"
            :tab-id="i + 1"
            :active-id="scope.activeId"
            padding="0 8px"
            :is-collaps="false"
            @changeActiveId="scope.changeActiveId"
          >
            <template #inside-title>
              <div class="flex-block" @click.prevent="() => undefined">
                <div class="item-flex">
                  <div class="line-item-left">
                    <!-- <Button :text="`№${commission.number}`" button-class="edit-button" color="#006bb4" @click="edit(patient.id)"/> -->
                    <Button button-class="edit-button" color="#006bb4" icon="outlined" icon-class="edit-icon" @click="edit(patient.id)" />
                    <StringItem :string="`№${commission.number}`" color="#006BB4" font-size="20px" min-width="110px" margin="0 10px 0 0" />
                  </div>
                  <div class="line-item-right">
                    <Button button-class="commission-button" color="#006bb4" icon="commission" icon-class="edit-icon" @click="openModalDoctorList(commission)" />
                    <InfoItem :close="infoItemToggle" title="ФИО пациента" min-width="200px">
                      <StringItem :string="commission.patient ? commission.patient.human.getFullName() : ''" custom-class="patient-name" width="230px" />
                      <template #open-inside-content>
                        <RemoteSearch key-value="patient" placeholder="Введите имя пациента" @click.stop="() => undefined" @select="(e) => setPatient(e, commission)" />
                      </template>
                    </InfoItem>
                  </div>
                </div>
                <div class="item-flex">
                  <GridContainer max-width="1920px" grid-gap="10px" grid-template-columns="repeat(auto-fit, minmax(220px, 1fr))" margin="0px">
                    <InfoItem
                      v-if="commission.patient && commission.patient.id"
                      :close="infoItemToggle"
                      margin="0"
                      width="100%"
                      :with-open-window="false"
                      title="диагноз"
                      @click="openModalDiagnosis(commission)"
                    >
                      <StringItem :string="commission.patientDiagnosis ? commission.patientDiagnosis.mkbItem.getCode() : ''" custom-class="medicine" />
                    </InfoItem>

                    <InfoItem
                      v-if="commission.patient && commission.patientDiagnosis"
                      :close="infoItemToggle"
                      margin="0"
                      width="100%"
                      :with-open-window="false"
                      title="лекарство"
                      @click="openModalDrugs(commission)"
                    >
                      <StringItem :string="commission.drugRecipe ? commission.drugRecipe.getFullName() : ''" custom-class="medicine" font-size="10px" />
                    </InfoItem>
                    <InfoItem title="дата комиссии" margin="0" open-height="auto" :with-open-window="false" width="100%">
                      <DateInput
                        v-model:model-value="commission.date"
                        placeholder="Выбрать"
                        @change="updateCommission(commission)"
                        @beforeChange="(date) => commission.setDate(date)"
                      />
                    </InfoItem>
                    <Button
                      v-if="commission.canGetProtocol()"
                      text="Сформировать протокол"
                      button-class="medical-commission-button"
                      color="#006bb4"
                      @click="fillCommissionDownload(commission)"
                    />
                    <Button text="Заявки в ДЗМ" button-class="medical-commission-button" color="#006bb4" @click="openModalDrugApplications(commission)" />
                  </GridContainer>
                </div>
              </div>
            </template>
          </CollapseItem>
        </template>
      </CollapseContainer>
    </div>
  </AdminListWrapper>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref, ref } from 'vue';

import Commission from '@/classes/Commission';
import CommissionTemplate from '@/classes/CommissionTemplate';
import DrugRecipe from '@/classes/DrugRecipe';
import Patient from '@/classes/Patient';
import PatientDiagnosis from '@/classes/PatientDiagnosis';
import CommissionDrugApplications from '@/components/admin/Commissions/CommissionDrugApplications.vue';
import DrugSelectForm from '@/components/admin/Commissions/DrugSelectForm.vue';
import PersonalityList from '@/components/admin/Patients/PersonalityList.vue';
import Button from '@/services/components/Button.vue';
import CollapseContainer from '@/services/components/Collapse/CollapseContainer.vue';
import CollapseItem from '@/services/components/Collapse/CollapseItem.vue';
import ModalWindow from '@/services/components/ModalWindow.vue';
import RemoteSearch from '@/services/components/RemoteSearch.vue';
import ISearchObject from '@/interfaces/ISearchObject';
import CommissionsSortsLib from '@/libs/sorts/CommissionsSortsLib';
import DateInput from '@/services/components/DateInput.vue';
import GridContainer from '@/services/components/GridContainer.vue';
import InfoItem from '@/services/components/InfoItem.vue';
import StringItem from '@/services/components/StringItem.vue';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminCommissionsList',
  components: {
    DrugSelectForm,
    CommissionDrugApplications,
    CollapseContainer,
    RemoteSearch,
    AdminListWrapper,
    CollapseItem,
    Button,
    StringItem,
    InfoItem,
    GridContainer,
    ModalWindow,
    PersonalityList,
    DateInput,
  },
  setup() {
    const templatesOpened: Ref<boolean> = ref(false);
    const commissions: Ref<Commission[]> = computed(() => Provider.store.getters['commissions/items']);
    const selectedCommission: Ref<Commission> = computed(() => Provider.store.getters['commissions/item']);
    const patient: Ref<Patient> = computed(() => Provider.store.getters['patients/item']);
    const count: Ref<number> = computed(() => Provider.store.getters['commissions/count']);
    const commissionsTemplates: ComputedRef<CommissionTemplate[]> = computed(() => Provider.store.getters['commissionsTemplates/items']);
    const infoItemToggle: Ref<boolean> = ref(false);
    const showModalDiagnosis: Ref<boolean> = ref(false);
    const showModalDrugs: Ref<boolean> = ref(false);
    const showModalDoctorList: Ref<boolean> = ref(false);
    const showModalDrugApplications: Ref<boolean> = ref(false);

    const loadCommissions = async () => {
      await Provider.loadItems();
    };

    const load = async () => {
      await loadCommissions();
    };

    const openCreateCommissionModal = async () => {
      await Provider.store.dispatch('commissionsTemplates/getAll');
      templatesOpened.value = true;
      await loadCommissions();
    };

    Hooks.onBeforeMount(load, {
      adminHeader: {
        title: 'Врачебные комиссии',
        buttons: [{ text: 'Создать комиссию', type: 'normal-button', action: openCreateCommissionModal }],
      },
      sortsLib: CommissionsSortsLib,
      getAction: 'getAll',
    });

    const selectSearch = async (event: ISearchObject): Promise<void> => {
      await Provider.router.push(`/admin/commissions/${event.value}`);
    };

    const updateCommission = async (commission: Commission): Promise<void> => {
      await Provider.withHeadLoader(async () => {
        await Provider.store.dispatch('commissions/update', commission);
      });
    };

    const setPatient = async (event: ISearchObject, commission: Commission) => {
      await Provider.store.dispatch('patients/get', event.value);
      commission.setPatient(patient.value);
      await updateCommission(commission);
      infoItemToggle.value = !infoItemToggle.value;
    };

    const createCommission = async (template: CommissionTemplate): Promise<void> => {
      const item = Commission.CreateFromTemplate(template);
      await Provider.store.dispatch('commissions/createAndSetNumber', item);
      Provider.store.commit('commissions/unshiftToAll', item);
      templatesOpened.value = false;
    };

    const fillCommissionDownload = async (commission: Commission): Promise<void> => {
      await Provider.store.dispatch('commissions/filledApplicationDownload', commission);
    };

    const selectCommission = (c: Commission): void => {
      Provider.store.commit('commissions/set', c);
    };

    const setPatientDiagnosis = async (patientDiagnosis: PatientDiagnosis, c: Commission): Promise<void> => {
      const findedCommission = commissions.value.find((com: Commission) => com.id === c.id);
      if (findedCommission) {
        findedCommission.setPatientDiagnosis(patientDiagnosis);
        showModalDiagnosis.value = false;
        await updateCommission(findedCommission);
      }
    };

    const openModalDiagnosis = (c: Commission) => {
      selectCommission(c);
      showModalDiagnosis.value = true;
    };
    const openModalDrugs = async (c: Commission) => {
      selectCommission(c);
      showModalDrugs.value = true;
    };

    const openModalDoctorList = (c: Commission) => {
      selectCommission(c);
      showModalDoctorList.value = true;
    };

    const openModalDrugApplications = (c: Commission) => {
      selectCommission(c);
      showModalDrugApplications.value = true;
    };

    const setDrugRecipe = async (drugRecipe: DrugRecipe, c: Commission): Promise<void> => {
      const findedCommission = commissions.value.find((com: Commission) => com.id === c.id);
      if (findedCommission) {
        findedCommission.setDrugRecipe(drugRecipe);
        showModalDrugs.value = false;
        await updateCommission(findedCommission);
      }
    };

    return {
      showModalDrugApplications,
      openModalDrugApplications,
      selectedCommission,
      setDrugRecipe,
      infoItemToggle,
      setPatientDiagnosis,
      fillCommissionDownload,
      createCommission,
      templatesOpened,
      commissionsTemplates,
      setPatient,
      updateCommission,
      count,
      selectSearch,
      loadCommissions,
      commissions,
      ...Provider.getAdminLib(),
      openModalDiagnosis,
      showModalDiagnosis,
      openModalDrugs,
      showModalDrugs,
      openModalDoctorList,
      showModalDoctorList,
    };
  },
});
</script>
<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

.patient-name {
  color: #006bb4;
  font-size: 14px;
  width: 100%;
  padding: 0;
}

.medicine {
  color: $site_dark_gray;
  font-size: 17px;
  width: 100%;
  padding: 0;
}

.hidden {
  display: none;
}

.scroll-block {
  height: 75vh;
  overflow: hidden;
  overflow-y: scroll;
  margin-left: 8px;
}

.registers-tooltip {
  &:hover {
    cursor: pointer;
  }
}

.patient-link {
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

.tag-link:hover {
  background-color: darken(white, 10%);
  cursor: pointer;
}

.flex-block {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon-edit {
  width: 28px;
  height: 28px;
}

.item-flex {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin: 0 10px 0 0;
}

.item-flex:last-child {
  margin: 10px 0;
}

.line-item-left {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: auto;
  padding: 0;
}

.line-item-right {
  display: flex;
  justify-content: right;
  align-items: center;
  width: auto;
  padding: 0;
}

.icon-plus {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.icon-del {
  width: 10px;
  height: 10px;
  cursor: pointer;
}

:deep(.el-input__inner) {
  height: 34px;
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 14px;
  color: $site_dark_gray;
  padding-left: 0;
  padding-right: 0;
  border: none;
  width: 100%;
}

:deep(.edit-icon) {
  width: 28px;
  height: 28px;
  color: #006bb4;
}

.filter-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filter-block {
  position: relative;
  display: flex;
  z-index: 3;
  justify-content: space-between;
  align-items: flex-end;
  width: calc(100% - 20px);
  padding: 10px 10px 24px 10px;
  background: #f5f5f5;
  height: auto;
  border-bottom: 1px solid #c4c4c4;
}

.tools-block {
  display: flex;
  justify-content: right;
  align-items: center;
  margin-left: 10px;
}

.patient-count {
  margin-top: 10px;
  color: $site_light_pink;
  font-size: 14px;
}

:deep(.el-form-item) {
  margin: 8px 0 0 0;
}

:deep(.edit-button) {
  width: 40px;
  height: 40px;
  border-radius: 5px;
  color: #006bb4;
  background: #dff2f8;
  margin: 0 10px 0 0;
}

:deep(.commission-button) {
  min-width: 40px;
  max-width: 40px;
  height: 40px;
  border-radius: 5px;
  color: #006bb4;
  background: #dff2f8;
  margin: 0 10px 0 0;
}

:deep(.change-button) {
  width: 100%;
  height: 42px;
  border-radius: 5px;
  background: #ffffff;
  color: #343e5c;
}

:deep(.medical-commission-button) {
  width: 100%;
  height: 40px;
  border-radius: 5px;
  color: #006bb4;
  background: #dff2f8;
}

@media (max-width: 1915px) {
  .flex-block {
    width: 100%;
    display: block;
    justify-content: space-between;
    align-items: center;
  }

  .line-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0;
  }

  .item-flex {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }

  .item-flex:last-child {
    margin-top: 10px;
    margin-bottom: 10px;
  }
}

@media (max-width: 560px) {
  .line-item-left {
    margin: 10px 0;
  }

  .line-item-right {
    margin: 10px 0;
    justify-content: space-between;
  }

  .item-flex:first-child {
    display: block;
    width: 100%;
    margin: 0 0px 10px 0;
  }
}
</style>
