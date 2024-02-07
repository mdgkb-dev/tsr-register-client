<template>
  <RightTabsContainer :is-toggle="isToggle" slider-on-width="180px" @toggle="toggle">
    <template #icon>
      <svg class="icon-plus">
        <use xlink:href="#plus"></use>
      </svg>
    </template>
    <template #slider-body>
      <div class="slider-body">
        <div v-for="commissionTemplate in commissionsTemplates" :key="commissionTemplate.id" class="slider-item" @click="addCommission(commissionTemplate)">
          {{ commissionTemplate.name.substring(12) }}
        </div>
      </div>
    </template>
    <template #tabs>
      <div
        v-for="commission in commissions"
        :key="commission.id"
        :class="{ 'tabs-item-active': commission.id === selectedCommission.id, 'tabs-item': commission.id !== selectedCommission.id }"
        @click="selectCommission(commission.id)"
      >
        <div class="tab-item-text">№{{ commission.number }}</div>
      </div>
    </template>
    <template #body>
      <ModalWindow :show="showModalDoctorList" title="Список врачей" @close="showModalDoctorList = false">
        <PersonalityList />
      </ModalWindow>
      <ModalWindow :show="showModalDiagnosis" title="Выберите диагноз" @close="showModalDiagnosis = false">
        <GridContainer grid-gap="5px" margin="10px 0">
          <Button
            v-for="patientDiagnosis in patient.patientDiagnosis"
            :key="patientDiagnosis.id"
            button-class="change-button"
            :text="patientDiagnosis.mkbItem.getFullName()"
            @click="setPatientDiagnosis(patientDiagnosis)"
          />
        </GridContainer>
      </ModalWindow>

      <ModalWindow :show="showModalMedicine" title="Выберите лекарство" @close="showModalMedicine = false">
        <DrugSelectForm @select="(e) => setDrugRecipe(e, selectedCommission)" />
      </ModalWindow>

      <div class="body">
        <div v-if="selectedCommission">
          <ResearcheContainer background="#DFF2F8">
            <template #header>
              <div class="researche-name">
                <span>Заболевание СПИНАЛЬНО МЫШЕЧНАЯ АТРОФИЯ</span>
              </div>

              <div class="line-item">
                <div class="item-name">Протокол №{{ selectedCommission.number }}</div>
                <Button
                  text="Удалить"
                  background="#ffffff"
                  margin="0"
                  height="42px"
                  font-size="16px"
                  border-radius="5px"
                  color="#343e5c"
                  :color-swap="true"
                  @click="removeCommission"
                >
                </Button>
              </div>
            </template>
            <template #body>
              <div class="line-item">
                <div class="item-left">
                  <el-form>
                    <el-form-item label="Дата проведения" @change="updateCommission">
                      <DatePicker v-model="selectedCommission.date" />
                    </el-form-item>
                  </el-form>
                </div>
                <div class="item-right">
                  <el-form>
                    <el-form-item label="Стасус заявки:">
                      <el-select v-model="status">
                        <el-option v-for="s in statuses" :key="s" :label="s" :value="s"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
              <div class="line-item">
                <div class="item-left">
                  <el-form>
                    <el-form-item label="Дата начала периода:" @change="updateCommission">
                      <DatePicker v-model="selectedCommission.startDate" />
                    </el-form-item>
                  </el-form>
                </div>
                <div class="item-right">
                  <el-form>
                    <el-form-item label="Дата окончания периода:" @change="updateCommission">
                      <DatePicker v-model="selectedCommission.endDate" />
                    </el-form-item>
                  </el-form>
                </div>
              </div>

              <div class="flex-block">
                <div class="flex-block-left">
                  <Button text="Состав врачебной комиссии" button-class="medical-commission-button" color="#006bb4" @click="openModalDoctorList()" />
                  <Button
                    :text="selectedCommission.patientDiagnosis ? selectedCommission.patientDiagnosis.mkbItem.getFullName() : 'Выбрать диагноз'"
                    button-class="medical-commission-button"
                    :color="selectedCommission.patientDiagnosis ? '#006bb4' : '#B0A4C0'"
                    @click="openModalDiagnosis()"
                  />
                  <Button
                    :text="selectedCommission.drugRecipe ? selectedCommission.drugRecipe.drug?.getName() : 'Выбрать лекарство'"
                    button-class="medical-commission-button"
                    :color="selectedCommission.drug ? '#006bb4' : '#B0A4C0'"
                    margin="0"
                    @click="openModalMedicine()"
                  />
                </div>
                <Button
                  text="Сформировать протокол"
                  button-class="protocol-button"
                  :color="selectedCommission.drug && selectedCommission.patientDiagnosis ? '#006bb4' : '#B0A4C0'"
                  @click="fillCommissionDownload"
                />
              </div>

              <CollapseItem :is-collaps="true" padding="0 10px" margin="10px 3px">
                <template #inside-title>
                  <StringItem string="Расчет потребности" color="#343E5C" font-size="18px" />
                </template>
                <template #inside-content>
                  <NeedingComponent :commission="selectedCommission" />
                </template>
              </CollapseItem>
            </template>
          </ResearcheContainer>
        </div>
      </div>
    </template>
  </RightTabsContainer>
  <svg width="0" height="0" class="hidden">
    <symbol id="plus" stroke="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M17.5 11.0714H11.0714V17.5H8.92857V11.0714H2.5V8.92857H8.92857V2.5H11.0714V8.92857H17.5V11.0714Z"></path>
    </symbol>
  </svg>

  <svg width="0" height="0" class="hidden">
    <symbol id="back" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21">
      <path
        d="M7.33333 7.8C13.901 7.20467 18.1253 9.738 20 15.4C16.4217 11.4227 11.9681 10.6905 7.33333 12.8667V16.6667L1 10.3333L7.33333 4V7.8Z"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </symbol>
  </svg>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';

import Commission from '@/classes/Commission';
import CommissionTemplate from '@/classes/CommissionTemplate';
import Drug from '@/classes/Drug';
import DrugRecipe from '@/classes/DrugRecipe';
import Patient from '@/classes/Patient';
// import DrugSelectForm from '@/components/admin/Commissions/DrugSelectForm.vue';
import PatientDiagnosis from '@/classes/PatientDiagnosis';
import DrugSelectForm from '@/components/admin/Commissions/DrugSelectForm.vue';
import NeedingComponent from '@/components/admin/Patients/PatientCommissions/NeedingComponent.vue';
import PersonalityList from '@/components/admin/Patients/PersonalityList.vue';
import Button from '@/services/components/Button.vue';
import CollapseItem from '@/services/components/Collapse/CollapseItem.vue';
import ModalWindow from '@/services/components/ModalWindow.vue';
import CommissionsFiltersLib from '@/libs/filters/CommissionsFiltersLib';
import PatientDiagnosisFiltersLib from '@/libs/filters/PatientDiagnosisFiltersLib';
import CommissionsSortsLib from '@/libs/sorts/CommissionsSortsLib';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import ClassHelper from '@/services/ClassHelper';
import DatePicker from '@/services/components/DatePicker.vue';
import GridContainer from '@/services/components/GridContainer.vue';
import ResearcheContainer from '@/services/components/ResearcheContainer.vue';
import RightTabsContainer from '@/services/components/RightTabsContainer.vue';
import StringItem from '@/services/components/StringItem.vue';
import { Orders } from '@/services/interfaces/Orders';
import Provider from '@/services/Provider/Provider';
export default defineComponent({
  name: 'PatientCommissions',
  components: {
    NeedingComponent,
    RightTabsContainer,
    ResearcheContainer,
    Button,
    DatePicker,
    PersonalityList,
    ModalWindow,
    // DrugSelectForm,
    GridContainer,
    DrugSelectForm,
    CollapseItem,
    StringItem,
  },

  setup() {
    const mounted = ref(false);
    const statuses: string[] = ['Собрана врачебная комиссия', 'Заявка отправлена в Фонд', 'Заявка подтверждена'];
    const status: Ref<string> = ref('');
    const drugs: ComputedRef<Drug[]> = computed(() => Provider.store.getters['drugs/items']);

    const isToggle: Ref<boolean> = ref(false);
    const patient: ComputedRef<Patient> = computed(() => Provider.store.getters['patients/item']);

    const commissionsTemplates: ComputedRef<CommissionTemplate[]> = computed(() => Provider.store.getters['commissionsTemplates/items']);
    const showModalDiagnosis: Ref<boolean> = ref(false);
    const showModalMedicine: Ref<boolean> = ref(false);
    const showModalDoctorList: Ref<boolean> = ref(false);
    const patientsDiagnoses: ComputedRef<PatientDiagnosis[]> = computed(() => Provider.store.getters['patientsDiagnosis/items']);
    const commissions: Ref<Commission[]> = computed(() => Provider.store.getters['commissions/items']);
    const selectedCommission: Ref<Commission> = computed(() => Provider.store.getters['commissions/item']);
    const toggle = async (toggle: boolean) => {
      if (toggle) {
        await Provider.store.dispatch('commissionsTemplates/getAll');
      }
      isToggle.value = toggle;
    };

    const addCommission = async (template: CommissionTemplate): Promise<void> => {
      const item = patient.value.addCommission(template);
      // TODO: проверить наличие хотя бы одного диагноза

      await Provider.store.dispatch('patientsDiagnosis/getAll', FilterQuery.Create([PatientDiagnosisFiltersLib.byPatientId(patient.value.id as string)], []));
      if (!patientsDiagnoses.value.length) {
        ElMessage.warning('Сначала добавьте пациенту диагноз');
      }
      await Provider.store.dispatch('commissions/createAndSetNumber', item);
      Provider.store.commit('commissions/appendToAll', [item]);
      await selectLastCommission();
      isToggle.value = false;
    };

    const updateCommission = async (): Promise<void> => {
      await Provider.store.dispatch('commissions/update', selectedCommission.value);
    };

    const getCommissions = async () => {
      const fq = new FilterQuery();
      fq.setFilterModel(CommissionsFiltersLib.byPatientId(patient.value.id as string));
      fq.setSortModel(CommissionsSortsLib.byNumber(Orders.Asc));
      console.log(fq);
      await Provider.store.dispatch('commissions/getAll', { filterQuery: fq });
    };

    onBeforeMount(async () => {
      await getCommissions();
      await selectLastCommission();
    });

    const selectCommission = async (id?: string): Promise<void> => {
      await Provider.store.dispatch('commissions/get', id);
    };

    const removeCommission = async (): Promise<void> => {
      if (!selectedCommission.value) {
        return;
      }
      ClassHelper.RemoveFromClassById(selectedCommission.value.id, patient.value.commissions, []);
      await Provider.store.dispatch('commissions/remove', selectedCommission.value.id);
      await selectLastCommission();
    };

    const selectLastCommission = async (): Promise<void> => {
      if (patient.value.commissions.length === 0) {
        return;
      }
      await selectCommission(patient.value.commissions[patient.value.commissions.length - 1].id);
    };

    const openModalDiagnosis = () => {
      Provider.store.commit('commissions/set', selectedCommission.value);
      showModalDiagnosis.value = true;
    };
    const openModalMedicine = async () => {
      await Provider.store.dispatch('drugs/getAll');
      Provider.store.commit('commissions/set', selectedCommission.value);
      showModalMedicine.value = true;
    };

    const openModalDoctorList = () => {
      Provider.store.commit('commissions/set', selectedCommission.value);
      showModalDoctorList.value = true;
    };

    const setPatientDiagnosis = async (patientDiagnosis: PatientDiagnosis): Promise<void> => {
      // const findedCommission = c.value.find((com: Commission) => com.id === c.id);
      if (!selectedCommission.value) {
        return;
      }
      selectedCommission.value.setPatientDiagnosis(patientDiagnosis);
      showModalDiagnosis.value = false;
      await updateCommission();
    };

    const selectDrug = async (item: DrugRecipe): Promise<void> => {
      if (!selectedCommission.value) {
        return;
      }
      selectedCommission.value?.setDrugRecipe(item);
      showModalMedicine.value = false;
      await updateCommission();
    };

    const fillCommissionDownload = async (): Promise<void> => {
      await Provider.store.dispatch('commissions/filledApplicationDownload', selectedCommission.value);
    };

    const setDrugRecipe = async (drugRecipe: DrugRecipe, c: Commission): Promise<void> => {
      selectedCommission.value?.setDrugRecipe(drugRecipe);
      showModalMedicine.value = false;
      await updateCommission();
    };

    return {
      commissions,
      setDrugRecipe,
      fillCommissionDownload,
      selectDrug,
      drugs,
      setPatientDiagnosis,
      updateCommission,
      removeCommission,
      status,
      statuses,
      selectCommission,
      selectedCommission,
      commissionsTemplates,
      addCommission,
      isToggle,
      toggle,
      mounted,
      patient,
      openModalDiagnosis,
      showModalDiagnosis,
      openModalMedicine,
      showModalMedicine,
      openModalDoctorList,
      showModalDoctorList,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';
@import '@/assets/styles/elements/base-style.scss';

.hidden {
  display: none;
}

.icon-plus {
  width: 40px;
  height: 40px;
  cursor: pointer;
}

.slider-body {
  width: 180px;
  height: auto;
  border: 1px solid #379fff;
  border-top-left-radius: $normal-border-radius;
  border-bottom-left-radius: $normal-border-radius;
  background: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
  display: grid;
  grid-gap: 6px;
  grid-template-rows: repeat(0 0px);
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  padding: 6px;
}

.slider-body > div {
  object-fit: cover;
}

.slider-item {
  width: 163px;
  height: 40px;
  border: 1px solid #b0a4c0;
  border-radius: $normal-border-radius;
  background: $base-background;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 3px;
  font-size: 14px;
  color: #b0a4c0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.tabs-item-active {
  position: relative;
  width: 106px;
  height: 56px;
  border: 1px solid #379fff;
  border-top-right-radius: $normal-border-radius;
  border-bottom-right-radius: $normal-border-radius;
  border-left: none;
  background: $custom-background;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 3px;
  font-size: 14px;
  font-weight: bold;
  color: #343e5c;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-left: 0;
  margin-top: 5px;
  z-index: 2;
  cursor: default;
}

.tabs-item {
  width: 101px;
  height: 51px;
  border: 1px solid #b0a4c0;
  border-top-right-radius: $normal-border-radius;
  border-bottom-right-radius: $normal-border-radius;
  border-left: #dff2f8;
  background: $base-background;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 3px;
  font-size: 14px;
  color: #b0a4c0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 5px;
  cursor: pointer;
}

:deep(.change-button) {
  width: 100%;
  height: 42px;
  border-radius: 5px;
  background: #ffffff;
  color: #343e5c;
}

.body {
  width: 100%;
  height: 100%;
  border-right: 1px solid #379fff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
  z-index: 5;
  overflow-y: auto;
}

.researche-name {
  min-height: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #343e5c;
  font-size: 14px;
  text-transform: uppercase;
}

.line-item {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.item-name {
  min-height: 42px;
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  color: #343e5c;
  font-size: 16px;
  margin-bottom: 20px;
}

.el-form-item {
  margin: 0;
}

.el-divider {
  margin: 10px 0;
}

:deep(.el-timeline-item) {
  padding-bottom: 8px;
}

.el-select {
  width: 100%;
}

:deep(.el-date-editor.el-input, .el-date-editor.el-input__inner) {
  width: 100%;
}

:deep(.el-form-item) {
  display: block;
  margin-bottom: 16px;
}

:deep(.el-input__inner) {
  height: 40px;
  width: 100%;
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 15px;
  color: $site_dark_gray;
}

:deep(.el-input__inner::placeholder) {
  color: $site_light_pink;
}

:deep(.el-input__icon) {
  color: $site_dark_gray;
}

:deep(.el-form-item__label) {
  color: $site_light_pink;
  padding: 0 !important;
  text-transform: uppercase;
  margin-left: 5px;
  font-size: 14px;
  margin-bottom: 6px;
}

:deep(.el-input-number__increase) {
  border-radius: 0;
}

:deep(.el-input-number__decrease) {
  border-radius: 0;
}

.item-left {
  width: 50%;
  color: #343e5c;
  margin-right: 10px;
}

.item-right {
  width: 50%;
  color: #343e5c;
  margin-left: 10px;
}

:deep(.medical-commission-button) {
  width: 33%;
  height: 40px;
  border-radius: $normal-border-radius;
  color: #b0a4c0;
  margin: 0 10px 0 0;
  background: #ffffff;
}

:deep(.protocol-button) {
  width: 25%;
  height: 62px;
  border-radius: $normal-border-radius;
  color: #b0a4c0;
  background: #ffffff;
  margin: 0 0 0 10px;
}

:deep(.need-button) {
  width: 100%;
  height: 62px;
  border-radius: $normal-border-radius;
  color: #b0a4c0;
  background: #ffffff;
  margin: 10px 0px;
}

.flex-block {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.flex-block-left {
  width: 75%;
  padding: 10px;
  border: $light-pink-border;
  border-radius: $normal-border-radius;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

:deep(.el-timeline-item) {
  padding-bottom: 8px;
}

:deep(.el-timeline) {
  padding: 0 0 0 10px;
}

:deep(.el-timeline-item__node) {
  background: #b0a4c0;
}

@media screen and (max-width: 768px) {
  .tabs-item {
    width: 40px;
    height: 100px;
  }

  .tabs-item:hover {
    width: 44px;
  }

  .tabs-item-active {
    position: relative;
    width: 45px;
    height: 100px;
  }

  .tabs-item-active:hover {
    width: 45px;
  }

  .tab-item-text {
    transform: rotate(90deg);
  }

  .flex-block {
    width: 100%;
    display: block;
    justify-content: space-between;
    align-items: center;
  }

  .flex-block-left {
    width: calc(100% - 20px);
    padding: 10px;
    border: $light-pink-border;
    border-radius: $normal-border-radius;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  :deep(.protocol-button) {
    width: 100%;
    height: 62px;
    border-radius: $normal-border-radius;
    color: #b0a4c0;
    background: #ffffff;
    margin: 10px 0 0 0;
  }

  :deep(.need-button) {
    width: 100%;
    height: 62px;
    border-radius: $normal-border-radius;
    color: #b0a4c0;
    background: #ffffff;
    margin: 10px 0 0 0;
  }
}

@media screen and (max-width: 555px) {
  .flex-block-left {
    width: calc(100% - 20px);
    padding: 10px;
    border: $light-pink-border;
    border-radius: $normal-border-radius;
    border-radius: 5px;
    display: block;
    justify-content: space-between;
    align-items: center;
  }

  :deep(.medical-commission-button) {
    width: 100%;
    height: 40px;
    border-radius: $normal-border-radius;
    color: #b0a4c0;
    margin: 0 10px 10px 0;
    background: #ffffff;
  }

  .line-item {
    display: block;
    justify-content: space-between;
    width: 100%;
  }

  .item-left {
    width: 100%;
    color: #343e5c;
    margin-right: 0px;
  }

  .item-right {
    width: 100%;
    color: #343e5c;
    margin-left: 0px;
  }
}
</style>
