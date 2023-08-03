<template>
  <AdminListWrapper v-if="mounted" pagination show-header>
    <ModalWindow :show="showDrugArrives" title="Поставки лекарств" @close="showDrugArrives = false">
      <DrugArrivesList />
    </ModalWindow>

    <ModalWindow :show="showDrugApplicationFilesList" title="Файлы" @close="showDrugApplicationFilesList = false">
      <DrugApplicationFilesList />
    </ModalWindow>

    <div class="scroll-block">
      <div class="patient-count">Количество заявок: {{ count }}</div>

      <CollapseContainer>
        <template #default="scope">
          <CollapseItem
            v-for="(drugApplication, i) in drugApplications"
            :key="drugApplication.id"
            :tab-id="i + 1"
            :active-id="scope.activeId"
            padding="0 8px"
            :is-collaps="false"
            @changeActiveId="scope.changeActiveId"
          >
            <template #inside-title>
              <div class="flex-block" @click.prevent="() => undefined">
                <div class="item-flex">
                  <InfoItem :close="infoItemToggle" title="Номер заявки" min-width="200px">
                    <StringItem :string="drugApplication.number" custom-class="patient-name" />
                    <template #open-inside-content>
                      <el-input v-model="drugApplication.number" @blur="updateApplicationNumber(drugApplication)" />
                    </template>
                  </InfoItem>
                  <div class="line-item-left">
                    <Button
                      button-class="edit-button"
                      icon="outlined"
                      icon-class="edit-icon"
                      @click="openDrugArrivesModal(drugApplication)"
                    />
                    <Button
                      button-class="edit-button"
                      color="#006bb4"
                      icon="outlined"
                      icon-class="edit-icon"
                      @click="openDrugApplicationFilesModal(drugApplication)"
                    />
                  </div>
                  <div class="line-item-right">
                    <InfoItem :close="infoItemToggle" margin="0" width="100%" :with-open-window="false" title="статус" padding="0">
                      <el-select v-model="drugApplication.drugApplicationStatusId" @change="(e) => updateStatus(drugApplication, e)">
                        <el-option v-for="status in drugApplicationsStatuses" :key="status.id" :label="status.name" :value="status.id" />
                      </el-select>
                    </InfoItem>
                  </div>
                </div>
                <div class="item-flex">
                  <GridContainer
                    max-width="1920px"
                    grid-gap="10px"
                    grid-template-columns="repeat(auto-fit, minmax(220px, 1fr))"
                    margin="0px"
                  >
                    <InfoItem title="дата заявки" margin="0" open-height="auto" :with-open-window="false" width="100%">
                      <SmallDatePicker
                        v-model:model-value="drugApplication.date"
                        placeholder="Выбрать"
                        width="100%"
                        height="34px"
                        @change="updateDrugApplication(drugApplication)"
                      />
                    </InfoItem>
                    <ToggleCommissionsForm :drug-application="drugApplication" />
                  </GridContainer>
                </div>
              </div>
            </template>
          </CollapseItem>
        </template>
      </CollapseContainer>
    </div>
  </AdminListWrapper>
  <Del />
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, defineComponent, Ref, ref } from 'vue';

import Del from '@/assets/svg/Del.svg';
import Commission from '@/classes/Commission';
import DrugApplication from '@/classes/DrugApplication';
import DrugApplicationStatus from '@/classes/DrugApplicationStatus';
import User from '@/classes/User';
import DrugApplicationFilesList from '@/components/admin/DrugApplications/DrugApplicationFilesList.vue';
import DrugArrivesList from '@/components/admin/DrugApplications/DrugArrivesList.vue';
import ToggleCommissionsForm from '@/components/admin/DrugApplications/ToggleCommissionsForm.vue';
import GridContainer from '@/components/admin/Patients/GridContainer.vue';
import StringItem from '@/components/admin/Patients/StringItem.vue';
import Button from '@/components/Base/Button.vue';
import CollapseContainer from '@/components/Base/Collapse/CollapseContainer.vue';
import CollapseItem from '@/components/Base/Collapse/CollapseItem.vue';
import ModalWindow from '@/components/Base/ModalWindow.vue';
import InfoItem from '@/components/Lib/InfoItem.vue';
// import FilterDateForm from '@/components/TableFilters/FilterDateForm.vue';
import IOption from '@/interfaces/shared/IOption';
import DrugApplicationsFiltersLib from '@/libs/filters/DrugApplicationsFiltersLib';
import FilterModel from '@/services/classes/filters/FilterModel';
import ClassHelper from '@/services/ClassHelper';
import SmallDatePicker from '@/services/components/SmallDatePicker.vue';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';
// import PatientsFiltersLib from '@/services/Provider/Provider/libs/filters/PatientsFiltersLib';
// import PatientsSortsLib from '@/services/Provider/libs/sorts/PatientsSortsLib';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminPatientsList',
  components: {
    DrugArrivesList,
    ModalWindow,
    CollapseContainer,
    AdminListWrapper,
    CollapseItem,
    Button,
    StringItem,
    InfoItem,
    GridContainer,
    SmallDatePicker,
    Del,
    DrugApplicationFilesList,
    ToggleCommissionsForm,
  },
  setup() {
    const infoItemToggle: Ref<boolean> = ref(false);
    const showDrugArrives: Ref<boolean> = ref(false);
    const showDrugApplicationFilesList: Ref<boolean> = ref(false);
    const openModalCommissions: Ref<boolean> = ref(false);

    const selectedDrugApplication: Ref<DrugApplication> = computed(() => Provider.store.getters['drugApplications/item']);
    const drugApplications: Ref<DrugApplication[]> = computed(() => Provider.store.getters['drugApplications/items']);
    const commissions: Ref<Commission[]> = computed(() => Provider.store.getters['commissions/items']);
    const drugApplicationsStatuses: Ref<DrugApplicationStatus[]> = computed(() => Provider.store.getters['drugApplicationsStatuses/items']);
    const count: Ref<number> = computed(() => Provider.store.getters['drugApplications/count']);
    const filterByStatus: Ref<FilterModel> = ref(new FilterModel());
    const createStatusesOptions = (): IOption[] => {
      const ids: IOption[] = [];
      drugApplicationsStatuses.value.forEach((r: DrugApplicationStatus) => ids.push({ value: r.id as string, label: r.name }));
      return ids;
    };

    const updateStatus = async (drugApplication: DrugApplication, statusId: string): Promise<void> => {
      const status = drugApplicationsStatuses.value.find((s: DrugApplicationStatus) => s.id === statusId);
      if (!status) {
        return;
      }
      drugApplication.drugApplicationStatus = status;
      drugApplication.drugApplicationStatusId = status.id;
      await updateDrugApplication(drugApplication);
    };
    const selectCommissionModel = ref('');
    const editMode: Ref<boolean> = ref(false);
    const authModalVisible = computed(() => Provider.store.getters['auth/authModalVisible']);
    const user: Ref<User> = computed(() => Provider.store.getters['auth/user']);
    const loadDrugApplications = async () => {
      await Provider.loadItems();
    };

    const load = async () => {
      await Provider.store.dispatch('commissions/getAll');
      await Provider.store.dispatch('drugApplicationsStatuses/getAll');
      await loadDrugApplications();
      filterByStatus.value = DrugApplicationsFiltersLib.byStatus();
      // filterByRegister.value = PatientsFiltersLib.byRegisters([]);
    };

    const addApplication = async (): Promise<void> => {
      const drugApplication = new DrugApplication();
      await Provider.store.dispatch('drugApplications/createWithoutReset', drugApplication);
      Provider.store.commit('drugApplications/unshiftToAll', drugApplication);
    };

    Hooks.onBeforeMount(load, {
      adminHeader: {
        title: 'Заявки в ДЗМ/Круг Добра',
        buttons: [{ text: 'Добавить заявку', type: 'normal-button', action: addApplication }],
      },
      // sortsLib: PatientsSortsLib,
      getAction: 'getAllWithCount',
    });

    const updateDrugApplication = async (drugApplication: DrugApplication): Promise<void> => {
      await Provider.withHeadLoader(async () => {
        await Provider.store.dispatch('drugApplications/update', drugApplication);
      });
    };

    const addCommission = async (commission: Commission, drugApplication: DrugApplication) => {
      if (drugApplication.commissionExists(commission.id)) {
        return ElMessage.warning('Выбранная заявка уже добавлена');
      }
      const item = drugApplication.addCommission(commission);
      infoItemToggle.value = !infoItemToggle.value;
      await Provider.store.dispatch('commissionsDrugApplications/create', item);
    };

    const removeCommission = async (id: string, drugApplication: DrugApplication): Promise<void> => {
      ClassHelper.RemoveFromClassById(id, drugApplication.commissionsDrugApplications, []);
      return await Provider.store.dispatch('commissionsDrugApplications/remove', id);
    };

    const initFundContract = async (drugApplication: DrugApplication) => {
      drugApplication.initFundContract();
      await Provider.store.dispatch('fundContracts/create', drugApplication.fundContract);
    };

    const updateApplicationNumber = async (item: DrugApplication) => {
      infoItemToggle.value = !infoItemToggle.value;
      await updateDrugApplication(item);
    };

    const selectDrugApplication = (c: DrugApplication): void => {
      Provider.store.commit('drugApplications/set', c);
    };

    const openDrugArrivesModal = (i: DrugApplication) => {
      selectDrugApplication(i);
      showDrugArrives.value = true;
    };

    const openDrugApplicationFilesModal = (i: DrugApplication) => {
      selectDrugApplication(i);
      showDrugApplicationFilesList.value = true;
    };

    return {
      openDrugApplicationFilesModal,
      showDrugApplicationFilesList,
      openDrugArrivesModal,
      openModalCommissions,
      selectedDrugApplication,
      showDrugArrives,
      updateApplicationNumber,
      infoItemToggle,
      selectCommissionModel,
      initFundContract,
      loadDrugApplications,
      drugApplicationsStatuses,
      filterByStatus,
      createStatusesOptions,
      updateStatus,
      removeCommission,
      commissions,
      updateDrugApplication,
      count,
      authModalVisible,
      drugApplications,
      addApplication,
      addCommission,
      ...Provider.getAdminLib(),
    };
  },
});
</script>
<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

.plus-button {
  width: 100%;
  height: 34px;
  border-radius: 5px;
  color: #00bea5;
  background: #c1efeb;
}
.save-picker-button {
  width: 100%;
  height: 34px;
  border-radius: 5px;
  color: #006bb4;
  background: #dff2f8;
}
.gender-button {
  width: 42px;
  border-radius: 5px;
  height: 42px;
  color: #006bb4;
  background: #dff2f8;
  margin: 2px 10px 0 0;
  font-size: 18px;
}

.save-button {
  width: 100%;
  border-radius: 5px;
  height: 42px;
  color: #006bb4;
  background: #dff2f8;
  margin: 2px 10px 0 0;
  font-size: 14px;
}

:deep(.edit-button) {
  width: 40px;
  height: 40px;
  border-radius: 5px;
  color: #006bb4;
  background: #dff2f8;
}

:deep(.files-buttons) {
  width: auto;
  height: 34px;
  border-radius: 5px;
  color: #006bb4;
  background: #dff2f8;
  font-size: 12px;
  &:hover {
    background: #dff2f8;
  }
}

.edv {
  font-size: 14px;
  padding: 0;
  margin: 0 5px 0 0;
  &-active {
    color: #b0a4c0;
  }
}

.patient-name {
  color: #006bb4;
  font-size: 17px;
  min-width: 240px;
  width: 100%;
  padding: 0px;
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

:deep(.edit-icon) {
  width: 28px;
  height: 28px;
  color: #006bb4;
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
  padding: 0px;
}

.line-item-right {
  display: flex;
  justify-content: right;
  align-items: center;
  width: auto;
  padding: 0px;
}

:deep(.icon-plus) {
  fill: #00b5a4;
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.icon-filter {
  width: 24px;
  height: 24px;
  cursor: pointer;
  stroke: #006bb4;
  fill: none;
}

.icon-del {
  width: 10px;
  height: 10px;
  cursor: pointer;
}

.patient-count {
  margin-top: 10px;
  color: $site_light_pink;
  font-size: 14px;
}

:deep(.el-form-item) {
  margin: 8px 0 0 0;
}

:deep(.el-input__inner) {
  border: none;
  height: 37px;
  color: $site_dark_gray;
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
    padding: 0px;
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
