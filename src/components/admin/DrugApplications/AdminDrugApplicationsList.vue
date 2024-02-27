<template>
  <AdminListWrapper v-if="mounted" pagination show-header>
    <AdminDrugApplicationsListFilters @load="loadDrugApplications" />
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
                  <div class="line-item1">
                    <InfoItem :close="infoItemToggle" title="номер заявки" min-width="200px" width="100%">
                      <StringItem :string="drugApplication.number" custom-class="patient-name" />
                      <template #open-inside-content>
                        <el-input v-model="drugApplication.number" @blur="updateApplicationNumber(drugApplication)" />
                      </template>
                    </InfoItem>
                  </div>
                  <div class="line-item-right">
                    <SelectStatusForm :status-id="drugApplication.statusId" @select="(e) => updateStatus(drugApplication, e)" />
                  </div>
                </div>
                <div class="item-flex">
                  <GridContainer max-width="1920px" grid-gap="10px" grid-template-columns="repeat(auto-fit, minmax(220px, 1fr))" margin="0px">
                    <InfoItem title="дата заявки" margin="0" open-height="auto" :with-open-window="false" width="100%">
                      <DateInput
                        v-model:model-value="drugApplication.date"
                        placeholder="Выбрать"
                        @change="updateDrugApplication(drugApplication)"
                        @beforeChange="(date) => drugApplication.setDate(date)"
                      />
                    </InfoItem>

                    <ToggleCommissionsForm :drug-application="drugApplication" />
                    <div class="line-item1">
                      <Button text="Поставки лекарств" button-class="medical-commission-button" color="#006bb4" @click="openDrugArrivesModal(drugApplication)" />
                      <Button text="Файлы" button-class="medical-commission-button" color="#006bb4" @click="openDrugApplicationFilesModal(drugApplication)" />
                    </div>
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
import Status from '@/classes/Status';
import AdminDrugApplicationsListFilters from '@/components/admin/DrugApplications/AdminDrugApplicationsListFilters.vue';
import DrugApplicationFilesList from '@/components/admin/DrugApplications/DrugApplicationFilesList.vue';
import DrugArrivesList from '@/components/admin/DrugApplications/DrugArrivesList.vue';
import ToggleCommissionsForm from '@/components/admin/DrugApplications/ToggleCommissionsForm.vue';
import SelectStatusForm from '@/components/admin/SelectStatusForm.vue';
import Button from '@/services/components/Button.vue';
import CollapseContainer from '@/services/components/Collapse/CollapseContainer.vue';
import CollapseItem from '@/services/components/Collapse/CollapseItem.vue';
import ModalWindow from '@/services/components/ModalWindow.vue';
// import FilterDateForm from '@/components/TableFilters/FilterDateForm.vue';
import DrugApplicationsFiltersLib from '@/libs/filters/DrugApplicationsFiltersLib';
import StatusesFiltersLib from '@/libs/filters/StatusesFiltersLib';
import DrugApplicationsSortsLib from '@/libs/sorts/DrugApplicationsSortsLib';
import FilterModel from '@/services/classes/filters/FilterModel';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import ClassHelper from '@/services/ClassHelper';
import DateInput from '@/services/components/DateInput.vue';
import GridContainer from '@/services/components/GridContainer.vue';
import InfoItem from '@/services/components/InfoItem.vue';
import StringItem from '@/services/components/StringItem.vue';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminDrugApplicationsList',
  components: {
    SelectStatusForm,
    DrugArrivesList,
    ModalWindow,
    CollapseContainer,
    AdminListWrapper,
    CollapseItem,
    Button,
    StringItem,
    InfoItem,
    GridContainer,
    Del,
    DrugApplicationFilesList,
    ToggleCommissionsForm,
    AdminDrugApplicationsListFilters,
    DateInput,
  },
  setup() {
    const filterQuery = new FilterQuery();
    filterQuery.setFilterModel(StatusesFiltersLib.byModel('drugApplication'));

    const infoItemToggle: Ref<boolean> = ref(false);
    const showDrugArrives: Ref<boolean> = ref(false);
    const showDrugApplicationFilesList: Ref<boolean> = ref(false);
    const openModalCommissions: Ref<boolean> = ref(false);

    const selectedDrugApplication: Ref<DrugApplication> = computed(() => Provider.store.getters['drugApplications/item']);
    const drugApplications: Ref<DrugApplication[]> = computed(() => Provider.store.getters['drugApplications/items']);
    const commissions: Ref<Commission[]> = computed(() => Provider.store.getters['commissions/items']);

    const count: Ref<number> = computed(() => Provider.store.getters['drugApplications/count']);
    const filterByStatus: Ref<FilterModel> = ref(new FilterModel());

    const updateStatus = async (drugApplication: DrugApplication, status: Status): Promise<void> => {
      drugApplication.status = status;
      drugApplication.statusId = status.id;
      await updateDrugApplication(drugApplication);
    };
    const selectCommissionModel = ref('');
    const authModalVisible = computed(() => Provider.store.getters['auth/authModalVisible']);
    const loadDrugApplications = async () => {
      await Provider.loadItems();
    };

    const load = async () => {
      await Provider.store.dispatch('statuses/getAll', { filterQuery });
      await Provider.store.dispatch('commissions/getAll');
      await loadDrugApplications();
      filterByStatus.value = DrugApplicationsFiltersLib.byStatus();
      // filterByRegister.value = PatientsFiltersLib.byRegisters([]);
    };

    const addApplication = async (): Promise<void> => {
      const drugApplication = new DrugApplication();
      await Provider.store.dispatch('drugApplications/create', drugApplication);
      Provider.store.commit('drugApplications/unshiftToAll', drugApplication);
    };

    Hooks.onBeforeMount(load, {
      adminHeader: {
        title: 'Заявки в ДЗМ/Круг Добра',
        buttons: [{ text: 'Добавить заявку', type: 'normal-button', action: addApplication }],
      },
      sortsLib: DrugApplicationsSortsLib,
      getAction: 'getAll',
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

:deep(.edit-icon) {
  width: 28px;
  height: 28px;
  color: #006bb4;
}

.item-flex-number {
  display: flex;
  width: calc(100% - 20px);
  justify-content: space-between;
  align-items: center;
  margin: 10px 10px 0 0;
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
  width: 100%;
  padding: 0;
}

.line-item1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 10px 0 0;
}

.line-item-right {
  display: flex;
  justify-content: right;
  align-items: center;
  width: auto;
  padding: 0;
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
  height: 37px;
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 14px;
  color: $site_dark_gray;
  padding-left: 0;
  padding-right: 0;
  border: none;
  width: 100%;
}

:deep(.medical-commission-button) {
  width: 100%;
  height: 40px;
  border-radius: 5px;
  color: #006bb4;
  background: #dff2f8;
}

:deep(.medical-commission-button):last-child {
  margin-left: 10px;
}

.el-select {
  width: 100%;
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
    margin: 10px 10px 0 0;
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
    margin: 10px 0;
  }
}
</style>
