<template>
  <ModalWindow :show="showModalDecreases" title="Список врачей" @close="showModalDecreases = false">
    <DrugArriveDecreases :drug-arrive="selectedDrugArrive" />
  </ModalWindow>
  <AdminListWrapper v-if="mounted" pagination show-header>
    <div class="scroll-block">
      <div class="patient-count">Количество поставок: {{ count }}</div>
      <div v-for="drugArrive in drugArrives" :key="drugArrive.id">
        <CollapseItem :is-collaps="false" padding="0 8px">
          <template #inside-title>
            <div class="flex-block" @click.prevent="() => undefined">
              <div class="item-flex">
                <div class="line-item-left">
                  <InfoItem title="дата" margin="0" :with-open-window="false" :with-hover="false">
                    <SmallDatePicker v-model:model-value="drugArrive.date" placeholder="Выбрать" :readonly="true" @change="updateDrugArrive(drugArrive)" />
                  </InfoItem>
                  <DrugArriveInputNumber :drug-arrive="drugArrive" />
                </div>
                <div class="line-item-right">
                  <Button :text="'Расходы:' + drugArrive.quantity" @click="openDrugArriveDecreases(drugArrive)" />
                </div>
              </div>
              <div class="item-flex">
                <GridContainer max-width="1920px" custom-class="grid" grid-template-columns="repeat(auto-fit, minmax(220px, 1fr))">
                  <GridContainer custom-class="grid" grid-template-columns="repeat(auto-fit, minmax(80px, 1fr))"> </GridContainer>
                </GridContainer>
              </div>
            </div>
          </template>
        </CollapseItem>
      </div>
    </div>
  </AdminListWrapper>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, defineComponent, Ref, ref } from 'vue';

import DrugArrive from '@/classes/DrugArrive';
import DrugDecrease from '@/classes/DrugDecrease';
import FundContract from '@/classes/FundContract';
import Patient from '@/classes/Patient';
import DrugArriveDecreases from '@/components/admin/DrugArrives/DrugArriveDecreases.vue';
import DrugArriveInputNumber from '@/components/admin/DrugArrives/DrugArriveInputNumber.vue';
import ISearchObject from '@/interfaces/ISearchObject';
import StatusesFiltersLib from '@/libs/filters/StatusesFiltersLib';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import Button from '@/services/components/Button.vue';
import CollapseItem from '@/services/components/Collapse/CollapseItem.vue';
import GridContainer from '@/services/components/GridContainer.vue';
import InfoItem from '@/services/components/InfoItem.vue';
import ModalWindow from '@/services/components/ModalWindow.vue';
import SmallDatePicker from '@/services/components/SmallDatePicker.vue';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminDrugArrivesList',
  components: {
    DrugArriveDecreases,
    ModalWindow,
    AdminListWrapper,
    CollapseItem,
    Button,
    InfoItem,
    GridContainer,
    SmallDatePicker,
    DrugArriveInputNumber,
  },
  setup() {
    const filterQuery = new FilterQuery();
    filterQuery.setFilterModel(StatusesFiltersLib.byModel('drugApplication'));
    const showModalDecreases: Ref<boolean> = ref(false);
    const selectedDrugArrive: Ref<DrugArrive> = computed(() => Provider.store.getters['drugArrives/item']);
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

    const createDrugArrive = async () => {
      const item = DrugArrive.Create();
      await Provider.store.dispatch('drugArrives/create', item);
      Provider.store.commit('drugArrives/unshiftToAll', item);
    };

    Hooks.onBeforeMount(load, {
      adminHeader: {
        title: 'Склад лекарств',
        buttons: [{ text: 'Добавить', type: 'normal-button', action: createDrugArrive }],
      },
      // sortsLib: commissionsSortsLib,
      getAction: 'getAll',
    });

    const openDrugArriveDecreases = async (item: DrugArrive): Promise<void> => {
      Provider.store.commit('drugArrives/set', item);
      showModalDecreases.value = true;
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
      // ClassHelper.RemoveFromClassById(item.id, drugArrive.drugDecreases, []);
      await Provider.store.dispatch('drugDecreases/remove', item.id);
    };

    const updateDrugDecreaseQuantity = async (cur: number, prev: number, drugArrive: DrugArrive, drugDecrease: DrugDecrease): Promise<void> => {
      const succeedMove = drugArrive.drugMove(cur, prev, drugDecrease);
      if (succeedMove) {
        return await updateDrugDecrease(drugDecrease);
      }
      ElMessage.warning('Перерасход');
    };

    const setPatientToDecrease = async (event: ISearchObject, drugDecrease: DrugDecrease) => {
      await Provider.store.dispatch('patients/get', event.value);
      drugDecrease.setPatient(patient.value);
      await updateDrugDecrease(drugDecrease);
    };

    return {
      showModalDecreases,
      selectedDrugArrive,
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
      openDrugArriveDecreases,
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

.button {
  width: auto;
  height: 34px;
  border-radius: 5px;
  color: #006bb4;
  font-size: 12px;

  &-filter {
    background: #ffffff;
  }

  &-download {
    background: #dff2f8;
  }
}

:deep(.button-register) {
  width: auto;
  height: 34px;
  border-radius: 5px;
  color: #006bb4;
  background: #ffffff;
  font-size: 12px;
}

:deep(.name-item) {
  margin: 0;
  width: auto;
  border-color: #ffffff;
  padding: 0;
}

.grid {
  max-width: auto;
  grid-gap: 10px;
  margin: 0;
}

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
  min-width: 40px;
  max-width: 40px;
  height: 40px;
  border-radius: 5px;
  color: #006bb4;
  background: #dff2f8;
  margin-right: 10px;
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
  min-width: 150px;
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
  margin-right: 10px;
  padding: 0;
}

.line-item-right {
  display: flex;
  justify-content: right;
  align-items: center;
  width: 100%;
  min-width: 210px;
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
