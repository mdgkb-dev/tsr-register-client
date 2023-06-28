<template>
  <AdminListWrapper v-if="mounted" pagination show-header>
    <RightSliderContainer :menu-width="'300px'" :mobile-width="'1215px'">
      <template #visability> </template>

      <template #filter>
        <GridContainer
          max-width="900px"
          grid-gap="27px 10px"
          grid-template-columns="repeat(auto-fit, minmax(200px, 1fr))"
          margin="0 0 0 10px"
        >
          <template #grid-items>
            <GridContainer
              max-width="500px"
              grid-gap="10px"
              grid-template-columns="repeat(auto-fit, minmax(95px, 1fr))"
              margin="0px"
              background="#F5F6F8"
            >
              <template #grid-items>
                <FiltersButtonsMultiply
                  :filter-model="filterByStatus"
                  :options="createStatusesOptions()"
                  default-label="Статусы"
                  @load="loadDrugApplications"
              /></template>
            </GridContainer>
            <GridContainer
              max-width="100%"
              grid-gap="7px"
              grid-template-columns="repeat(auto-fit, minmax(calc(50% - 7px), 1fr))"
              margin="0px"
            >
              <template #grid-items> </template>
            </GridContainer>
          </template>
        </GridContainer>
      </template>
      <template #download>
        <GridContainer
          max-width="65px"
          grid-gap="27px 10px"
          grid-template-columns="repeat(auto-fit, minmax(65px, 1fr))"
          margin="0 0 0 10px"
        >
          <template #grid-items> </template>
        </GridContainer>
      </template>
    </RightSliderContainer>

    <div class="scroll-block">
      <div class="patient-count">Количество заявок: {{ count }}</div>
      <div v-for="drugApplication in drugApplications" :key="drugApplication.id">
        <CollapseContainer>
          <CollapseItem :is-collaps="true" padding="0 8px">
            <template #inside-title>
              <div class="flex-block" @click.prevent="() => undefined">
                <div class="item-flex">
                  <div class="line-item-left">
                    <InfoItem
                      margin="0 0 0 10px"
                      open-height="auto"
                      width="auto"
                      border-color="#ffffff"
                      :with-icon="false"
                      :with-hover="false"
                    >
                      <template #close-inside-content>
                        <StringItem
                          :string="drugApplication.getNumber()"
                          custom-class="patient-name"
                          @click="drugApplication.editNameMode = true"
                        />
                        <el-select v-model="drugApplication.drugApplicationStatusId" @change="(e) => updateStatus(drugApplication, e)">
                          <el-option v-for="status in drugApplicationsStatuses" :key="status.id" :label="status.name" :value="status.id" />
                        </el-select>
                      </template>
                      <template #open-inside-content>
                        <GridContainer
                          max-width="auto"
                          grid-gap="10px"
                          grid-template-columns="repeat(auto-fit, minmax(100%, 1fr))"
                          margin="0px"
                        >
                          <template #grid-items>
                            <InfoItem
                              title="номер"
                              margin="0"
                              open-height="auto"
                              width="auto"
                              :with-icon="false"
                              :with-open-window="false"
                              :with-hover="false"
                              border-color="#ffffff"
                              padding="0"
                            >
                              <template #close-inside-content>
                                <el-input v-model="drugApplication.number" @click.stop="() => undefined" />
                              </template>
                            </InfoItem>
                            <Button button-class="save-button" text="Сохранить" @click="updateDrugApplication(drugApplication)" />
                          </template>
                        </GridContainer>
                      </template>
                    </InfoItem>
                  </div>

                  <div class="line-item-right">
                    <SmallDatePicker
                      v-model:model-value="drugApplication.date"
                      placeholder="Выбрать"
                      width="100%"
                      height="34px"
                      @change="updateDrugApplication(drugApplication)"
                    />
                  </div>
                </div>
                <div class="item-flex">
                  <GridContainer
                    max-width="1920px"
                    grid-gap="10px"
                    grid-template-columns="repeat(auto-fit, minmax(220px, 1fr))"
                    margin="0px"
                  >
                    <template #grid-items>
                      <GridContainer
                        max-width="auto"
                        grid-gap="10px"
                        grid-template-columns="repeat(auto-fit, minmax(80px, 1fr))"
                        margin="0px"
                      >
                        <template #grid-items> </template>
                      </GridContainer>
                    </template>
                  </GridContainer>
                </div>
              </div>
            </template>

            <template #inside-content>
              <div style="display: flex">
                <div>
                  <div>Комиссии</div>
                  <div v-for="commissionDrugApplication in drugApplication.commissionsDrugApplications" :key="commissionDrugApplication.id">
                    №{{ commissionDrugApplication.commission.number }}
                    <el-button @click="removeCommission(commissionDrugApplication.id, drugApplication)">Удалить</el-button>
                  </div>
                  <el-select
                    v-model="selectCommissionModel"
                    :popper-append-to-body="false"
                    value-key="label"
                    placeholder="Выберите комиссию"
                    @change="(e) => addCommission(e, drugApplication)"
                  >
                    <el-option v-for="item in commissions" :key="item.number" :label="item.number" :value="item" />
                  </el-select>
                </div>
                <div>
                  <div>Файлы</div>
                  <el-button @click="addFile(drugApplication)">Добавить</el-button>
                  <div v-for="drugApplicationFile in drugApplication.drugApplicationFiles" :key="drugApplicationFile.id">
                    <FileUploader :file-info="drugApplicationFile.fileInfo" />
                    <el-input v-model="drugApplicationFile.comment" />
                    <el-button @click="removeFile(drugApplication, drugApplicationFile.id)">Удалить</el-button>
                  </div>
                </div>
                <div>
                  <div>Поставки лекарств</div>
                  <template v-if="!drugApplication.fundContract.id">
                    <el-button @click="initFundContract(drugApplication)">Добавить контракт фонда</el-button>
                  </template>
                  <template v-else>
                    <el-button @click="addDrugArrive(drugApplication)">Добавить</el-button>
                    <div v-for="drugArrive in drugApplication.fundContract.drugArrives" :key="drugArrive.id">
                      {{ drugArrive.stage }}
                      <SmallDatePicker
                        v-model:model-value="drugArrive.date"
                        placeholder="Выбрать"
                        width="100%"
                        height="34px"
                        @change="updateDrugArrive(drugArrive)"
                      />
                      <el-input-number v-model="drugArrive.quantity" @change="updateDrugArrive(drugArrive)" />
                      <el-button @click="removeDrugArrive(drugApplication, drugArrive.id)">Удалить</el-button>
                    </div>
                  </template>
                </div>
              </div>
            </template>
          </CollapseItem>
        </CollapseContainer>
      </div>
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
import DrugArrive from '@/classes/DrugArrive';
import User from '@/classes/User';
import GridContainer from '@/components/admin/Patients/GridContainer.vue';
import StringItem from '@/components/admin/Patients/StringItem.vue';
import Button from '@/components/Base/Button.vue';
import CollapseContainer from '@/components/Base/Collapse/CollapseContainer.vue';
import CollapseItem from '@/components/Base/Collapse/CollapseItem.vue';
import RightSliderContainer from '@/components/Base/RightSliderContainer.vue';
import FileUploader from '@/components/FileUploader.vue';
import InfoItem from '@/components/Lib/InfoItem.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import FiltersButtonsMultiply from '@/components/TableFilters/FiltersButtonsMultiply.vue';
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
    FileUploader,
    CollapseContainer,
    FiltersButtonsMultiply,
    RemoteSearch,

    AdminListWrapper,
    CollapseItem,
    Button,
    StringItem,
    InfoItem,
    GridContainer,
    SmallDatePicker,
    Del,
    RightSliderContainer,
  },
  setup() {
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
        buttons: [
          { text: 'Добавить заявку', type: 'primary', action: addApplication },
          { text: 'Режим редактирования', type: 'warning', action: () => (editMode.value = !editMode.value) },
        ],
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
      await Provider.store.dispatch('commissionsDrugApplications/create', item);
    };

    const removeCommission = async (id: string, drugApplication: DrugApplication): Promise<void> => {
      ClassHelper.RemoveFromClassById(id, drugApplication.commissionsDrugApplications, []);
      return await Provider.store.dispatch('commissionsDrugApplications/remove', id);
    };

    const addFile = async (drugApplication: DrugApplication) => {
      const item = drugApplication.addFile();
      // await Provider.store.dispatch('commissionsDrugApplications/create', item);
    };

    const removeFile = async (drugApplication: DrugApplication, id?: string): Promise<void> => {
      ClassHelper.RemoveFromClassById(id, drugApplication.drugApplicationFiles, []);
      // return await Provider.store.dispatch('commissionsDrugApplications/remove', id);
    };

    const initFundContract = async (drugApplication: DrugApplication) => {
      drugApplication.initFundContract();
      await Provider.store.dispatch('fundContracts/create', drugApplication.fundContract);
    };

    const addDrugArrive = async (drugApplication: DrugApplication) => {
      const item = drugApplication.fundContract?.addDrugArrive();
      await Provider.store.dispatch('drugArrives/create', item);
    };

    const removeDrugArrive = async (drugApplication: DrugApplication, id?: string): Promise<void> => {
      ClassHelper.RemoveFromClassById(id, drugApplication.fundContract.drugArrives, []);
      drugApplication.fundContract.normalizeArrivesStages();
      return await Provider.store.dispatch('drugArrives/remove', id);
    };

    const updateDrugArrive = async (item: DrugArrive) => {
      await Provider.store.dispatch('drugArrives/update', item);
    };

    return {
      selectCommissionModel,
      updateDrugArrive,
      initFundContract,
      addDrugArrive,
      removeDrugArrive,
      addFile,
      removeFile,
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
