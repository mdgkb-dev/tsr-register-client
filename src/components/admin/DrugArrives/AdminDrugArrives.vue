<template>
  <AdminListWrapper v-if="mounted" pagination show-header>
    <template #header> </template>
    <template #sort>
      <!--      <SortList :max-width="400" @load="loadItems" />-->
    </template>
    <div v-for="drugArrive in drugArrives" :key="drugArrive">
      {{ drugArrive.date }}
    </div>
    <el-button @click="openCreateDrugArrives">Добавить приходы на склад</el-button>
    <div v-if="createDrugArrivesOpened">
      <el-select @select="selectFundContract">
        <el-option v-for="fundContract in fundContracts" :key="fundContract.id" :value="fundContract.id" :label="fundContract.number" />
      </el-select>
    </div>
  </AdminListWrapper>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';

import DrugArrive from '@/classes/DrugArrive';
import FundContract from '@/classes/FundContract';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminDrugArrives',
  components: {
    AdminListWrapper,
  },
  setup() {
    const createDrugArrivesOpened: Ref<boolean> = ref(false);
    const drugArrives: Ref<DrugArrive[]> = computed(() => Provider.store.getters['drugArrives/items']);
    const fundContracts: Ref<DrugArrive[]> = computed(() => Provider.store.getters['fundContracts/items']);
    const fundContract: Ref<DrugArrive[]> = computed(() => Provider.store.getters['fundContracts/item']);
    const selectedFundContract: Ref<FundContract | undefined> = ref(undefined);
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

    return {
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
</style>
