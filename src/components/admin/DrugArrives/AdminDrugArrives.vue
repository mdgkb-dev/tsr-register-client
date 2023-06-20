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
          <template #grid-items> </template>
        </GridContainer>
      </template>
    </RightSliderContainer>

    <div class="scroll-block">
      <div class="patient-count">Количество заявок: {{ count }}</div>
      <div v-for="drugArrive in drugArrives" :key="drugArrive.id">
        <CollapseContainer>
          <CollapseItem :is-collaps="true" padding="0 8px">
            <template #inside-title>
              <div class="flex-block" @click.prevent="() => undefined">
                <div class="item-flex">
                  <div class="line-item-left">
                    <Button button-class="edit-button" color="#006bb4" icon="edit" icon-class="edit-icon" @click="edit(drugArrive.id)" />
                    <div>Всего: {{ drugArrive.quantity }}</div>
                    <div>Осталось: {{ drugArrive.getRemain() }}</div>
                    <el-input-number
                      :model-value="drugArrive.quantity"
                      @change="(cur, prev) => setDrugArriveQuantity(cur, prev, drugArrive)"
                    />
                    <el-date-picker v-model="drugArrive.date" />
                  </div>
                </div>
              </div>
            </template>

            <template #inside-content>
              <div class="background-container">
                <div>Расходы</div>
                <el-button @click="addDrugDecrease(drugArrive)">Добавить расход лекарств</el-button>
                <div v-for="drugDecrease in drugArrive.drugDecreases" :key="drugDecrease.id">
                  <hr />
                  <el-input-number
                    :model-value="drugDecrease.quantity"
                    @change="(cur, prev) => updateDrugDecreaseQuantity(cur, prev, drugArrive, drugDecrease)"
                  />
                  <el-input v-model="drugDecrease.comment" @blur="updateDrugDecrease(drugDecrease)" />
                  <el-date-picker v-model="drugDecrease.date" @change="updateDrugDecrease(drugDecrease)" />
                  <RemoteSearch
                    :must-be-translated="true"
                    key-value="patient"
                    placeholder="Введите имя пациента"
                    @click.stop="() => undefined"
                    @select="(e) => setPatientToDecrease(e, drugDecrease)"
                  />
                  <el-button @click="removeDrugDecrease(drugArrive, drugDecrease)" />
                </div>
                <!--                <div v-for="drugDecrease in drugArrive.drugDecreases" :key="drugDecrease.id">-->
                <!--                </div>-->
              </div>
            </template>
          </CollapseItem>
        </CollapseContainer>
      </div>
    </div>
  </AdminListWrapper>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, defineComponent, Ref, ref } from 'vue';

import Del from '@/assets/svg/Del.svg';
import DrugArrive from '@/classes/DrugArrive';
import DrugDecrease from '@/classes/DrugDecrease';
import FundContract from '@/classes/FundContract';
import Patient from '@/classes/Patient';
import GridContainer from '@/components/admin/Patients/GridContainer.vue';
import InfoItem from '@/components/admin/Patients/InfoItem.vue';
import StringItem from '@/components/admin/Patients/StringItem.vue';
import Button from '@/components/Base/Button.vue';
import CollapseContainer from '@/components/Base/Collapse/CollapseContainer.vue';
import CollapseItem from '@/components/Base/Collapse/CollapseItem.vue';
import RightSliderContainer from '@/components/Base/RightSliderContainer.vue';
import FileUploader from '@/components/FileUploader.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import FiltersButtonsMultiply from '@/components/TableFilters/FiltersButtonsMultiply.vue';
import ISearchObject from '@/interfaces/ISearchObject';
import ClassHelper from '@/services/ClassHelper';
import SmallDatePicker from '@/services/components/SmallDatePicker.vue';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminDrugArrives',
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
    const count: Ref<number> = computed(() => Provider.store.getters['drugArrives/count']);
    const createDrugArrivesOpened: Ref<boolean> = ref(false);
    const drugArrives: Ref<DrugArrive[]> = computed(() => Provider.store.getters['drugArrives/items']);
    const fundContracts: Ref<DrugArrive[]> = computed(() => Provider.store.getters['fundContracts/items']);
    const fundContract: Ref<DrugArrive[]> = computed(() => Provider.store.getters['fundContracts/item']);
    const selectedFundContract: Ref<FundContract | undefined> = ref(undefined);
    const patient: Ref<Patient> = computed(() => Provider.store.getters['patients/item']);
    const loadCommissions = async () => {
      await Provider.store.dispatch('drugArrives/getAll');
    };

    const load = async () => {
      await loadCommissions();
    };

    Hooks.onBeforeMount(load, {
      adminHeader: {
        title: 'Склад лекарств',
        buttons: [],
      },
      // sortsLib: commissionsSortsLib,
      getAction: 'getAllWithCount',
    });

    const openCreateDrugArrives = async (): Promise<void> => {
      createDrugArrivesOpened.value = !createDrugArrivesOpened.value;
      await Provider.store.dispatch('fundContracts/getAll');
    };

    const createDrugArrive = async (fundContract: FundContract) => {
      const item = DrugArrive.Create(fundContract);
      await Provider.store.dispatch('drugArrives/create', item);
    };

    const selectFundContract = async (contract: FundContract): Promise<void> => {
      selectedFundContract.value = contract;
    };
    const addDrugDecrease = async (drugArrive: DrugArrive): Promise<void> => {
      const item = drugArrive.addDrugDecrease();
      await Provider.store.dispatch('drugDecreases/create', item);
    };

    const updateDrugDecrease = async (item: DrugDecrease): Promise<void> => {
      await Provider.store.dispatch('drugDecreases/update', item);
    };

    const updateDrugArrive = async (item: DrugArrive): Promise<void> => {
      await Provider.store.dispatch('drugArrives/update', item);
    };

    const removeDrugDecrease = async (drugArrive: DrugArrive, item: DrugDecrease): Promise<void> => {
      ClassHelper.RemoveFromClassById(item.id, drugArrive.drugDecreases, []);
      await Provider.store.dispatch('drugDecreases/remove', item.id);
    };

    const updateDrugDecreaseQuantity = async (
      cur: number,
      prev: number,
      drugArrive: DrugArrive,
      drugDecrease: DrugDecrease
    ): Promise<void> => {
      if (cur > prev) {
        if (drugArrive.canSpend()) {
          drugDecrease.quantity++;
          await updateDrugDecrease(drugDecrease);
          return;
        } else {
          ElMessage.warning('Перерасход');
          return;
        }
      }
      if (drugDecrease.quantity > 1) {
        drugDecrease.quantity--;
        await updateDrugDecrease(drugDecrease);
      }
    };

    const setPatientToDecrease = async (event: ISearchObject, drugDecrease: DrugDecrease) => {
      await Provider.store.dispatch('patients/get', event.value);
      drugDecrease.setPatient(patient.value);
      await updateDrugDecrease(drugDecrease);
    };

    const setDrugArriveQuantity = async (cur: number, prev: number, drugArrive: DrugArrive): Promise<void> => {
      const set = drugArrive.setQuantity(cur, prev);
      if (!set) {
        ElMessage.warning('Перерасход');
        return;
      }
      await updateDrugArrive(drugArrive);
    };

    return {
      setDrugArriveQuantity,
      updateDrugArrive,
      updateDrugDecreaseQuantity,
      setPatientToDecrease,
      updateDrugDecrease,
      removeDrugDecrease,
      addDrugDecrease,
      count,
      selectedFundContract,
      selectFundContract,
      fundContract,
      fundContracts,
      openCreateDrugArrives,
      createDrugArrivesOpened,
      createDrugArrive,
      drugArrives,
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
