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
import { Document, QuestionFilled } from '@element-plus/icons-vue';
import { computed, defineComponent, Ref, ref } from 'vue';

import DrugArrive from '@/classes/DrugArrive';
import FundContract from '@/classes/FundContract';
import FilterMultipleSelect from '@/components/Filters/FilterMultipleSelect.vue';
import Pagination from '@/components/Pagination.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import SortList from '@/components/SortList.vue';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import FilterResetButton from '@/components/TableFilters/FilterResetButton.vue';
import FiltersList from '@/components/TableFilters/FiltersList.vue';
import SortButton from '@/components/TableFilters/SortButton.vue';
import ISearchObject from '@/interfaces/ISearchObject';
import FilterModel from '@/services/classes/filters/FilterModel';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminDrugArrives',
  components: {
    FilterMultipleSelect,
    RemoteSearch,
    SortButton,
    Pagination,
    TableButtonGroup,
    SortList,
    // FilterDateForm,
    // FilterSet,
    FilterResetButton,
    AdminListWrapper,
    FiltersList,
    QuestionFilled,
    Document,
  },
  setup() {
    const createDrugArrivesOpened: Ref<boolean> = ref(false);
    const expertCommitteeOpened: Ref<boolean> = ref(false);
    const drugArrives: Ref<DrugArrive[]> = computed(() => Provider.store.getters['drugArrives/items']);
    const fundContracts: Ref<DrugArrive[]> = computed(() => Provider.store.getters['fundContracts/items']);
    const fundContract: Ref<DrugArrive[]> = computed(() => Provider.store.getters['fundContracts/item']);
    const filterByRegister: Ref<FilterModel> = ref(new FilterModel());
    // const filteredcommissions: Ref<Patient[]> = computed(() => Provider.store.getters['commissions/filteredcommissions']);
    const filterByStatus: Ref<FilterModel> = ref(new FilterModel());
    const authModalVisible = computed(() => Provider.store.getters['auth/authModalVisible']);
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

    const selectSearch = async (event: ISearchObject): Promise<void> => {
      await Provider.router.push(`/admin/commissions/${event.value}`);
    };

    // const createRegistersOptions = (): IOption[] => {
    //   const ids: IOption[] = [];
    //   registers.value.forEach((r: Register) => ids.push({ value: r.id as string, label: r.name }));
    //   return ids;
    // };

    const openCreateDrugArrives = async (): Promise<void> => {
      createDrugArrivesOpened.value = !createDrugArrivesOpened.value;
      await Provider.store.dispatch('fundContracts/getAll');
    };

    const openExpertCommittee = (): void => {
      expertCommitteeOpened.value = !expertCommitteeOpened.value;
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
