<template>
  <div v-if="mount" style="height: 100%; overflow: hidden">
    <div class="table-background">
      <el-autocomplete
        v-model="queryStringsPatient"
        style="width: 100%; margin-bottom: 20px; margin-right: 10px"
        popper-class="wide-dropdown"
        :fetch-suggestions="findPatients"
        placeholder="Найти пациента"
        @select="handlePatientSelect"
        @input="handleSearchInput"
      >
      </el-autocomplete>
      <el-input
        v-model="search"
        prefix-icon="el-icon-search"
        style="border-radius: 90%"
        placeholder="Отфильтровать текущий список"
        class="table-search"
      />
      <el-table
        ref="table"
        :default-sort="{ prop: 'id', order: 'ascending' }"
        :data="filterTable(patients)"
        class="table-shadow"
        header-row-class-name="header-style"
        row-class-name="no-hover"
        style="width: 100%; margin-bottom: 20px; overflow: auto"
        height="calc(100vh - 310px)"
      >
        <el-table-column width="60" align="center" />

        <el-table-column prop="human.surname" align="left" min-width="130" resizable>
          <template #header>
            <span class="table-header">
              <span>Фамилия Имя Отчество</span>
              <FilterTextForm :table="schema.humanSchema.tableName" :col="schema.humanSchema.fullName" />
              <SortButton :table="schema.humanSchema.tableName" :col="schema.humanSchema.fullName" />
            </span>
          </template>
          <template #default="scope">
            <div class="patient-link" @click="$router.push(`/patients/${scope.row.id}/view`)">
              {{ scope.row.human.getFullName() }}
            </div>
          </template>
        </el-table-column>
        <el-table-column v-for="documentType in documentTypes" :key="documentType.id">
          <template #header>
            <span class="table-header">
              <span>{{ documentType.name }}</span>
            </span>
          </template>
          <template #default="scope">
            {{ scope.row.human.haveDocument(documentType.id) ? 'Есть' : 'Нет' }}
          </template>
        </el-table-column>
      </el-table>
      <Pagination />
    </div>
  </div>
</template>

<script lang="ts">
import { ElLoading } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import Crud from '@/classes/shared/Crud';
import MainHeader from '@/classes/shared/MainHeader';
import Pagination from '@/components/Pagination.vue';
import FilterTextForm from '@/components/TableFilters/FilterTextForm.vue';
import SortButton from '@/components/TableFilters/SortButton.vue';
import IDocumentType from '@/interfaces/documents/IDocumentType';
import IPatient from '@/interfaces/patients/IPatient';
import ISchema from '@/interfaces/schema/ISchema';
import ISearch from '@/interfaces/shared/ISearch';
import ISearchPatient from '@/interfaces/shared/ISearchPatient';
export default defineComponent({
  name: 'PatientsList',
  components: {
    SortButton,
    Pagination,
    FilterTextForm,
  },
  setup() {
    const store = useStore();
    const patients: Ref<IPatient[]> = computed(() => store.getters['patients/patients']);
    const filteredPatients: Ref<IPatient[]> = computed(() => store.getters['patients/filteredPatients']);
    const schema: Ref<ISchema> = computed(() => store.getters['meta/schema']);
    const documentTypes: ComputedRef<IDocumentType[]> = computed(() => store.getters['documentTypes/documentTypes']);

    const crud = new Crud('patients');

    const mount: Ref<boolean> = ref(false);
    const queryStringsPatient: Ref<string> = ref('');

    const searchFullName = ref('');
    const searchAddress = ref('');
    const search = ref('');

    onBeforeMount(async () => {
      store.commit('filter/resetId');
      const loading = ElLoading.service({
        lock: true,
        text: 'Загрузка',
      });
      store.commit('pagination/setCurPage', 1);
      store.commit('main/setMainHeader', new MainHeader({ title: 'Список пациентов', create: crud.create }));
      store.commit('filter/setStoreModule', 'patients');
      await store.dispatch('patients/getAll', store.getters['filter/filterQuery']);
      await store.dispatch('registers/getAll');
      await store.dispatch('documentTypes/getAll');
      mount.value = true;
      loading.close();
    });

    const handleSearchInput = async (value: string): Promise<void> => {
      if (value.length === 0) {
        await store.dispatch('patients/getAll', 0);
      }
      store.commit('pagination/setCurPage', 0);
    };

    const findPatients = async (query: string, resolve: CallableFunction): Promise<void> => {
      const patients: ISearchPatient[] = [];
      if (query.length > 2) {
        await store.dispatch('patients/searchPatients', query);
        filteredPatients.value.forEach((p: IPatient) => {
          if (p.id) patients.push({ value: p.human.getFullName(), id: p.id, patient: p });
        });
      }
      resolve(patients);
    };

    const handlePatientSelect = async (item: ISearch): Promise<void> => {
      await store.dispatch('patients/getAllById', item.id);
    };

    const filterTable = (patients: IPatient[]) => {
      let filteredPatients = patients;

      const searchLocal = search.value.toLowerCase();
      const searchFullNameLocal = searchFullName.value.toLowerCase();
      const searchAddressLocal = searchAddress.value.toLowerCase();

      filteredPatients = filteredPatients.filter((patient: IPatient) => {
        const address = patient.human.addressRegistration.toLowerCase();
        return !searchAddress.value || address.includes(searchAddressLocal);
      });

      filteredPatients = filteredPatients.filter((patient: IPatient) => {
        const name = patient.human.getFullName().toLowerCase();
        return !searchFullName.value || name.includes(searchFullNameLocal);
      });

      filteredPatients = filteredPatients.filter((patient: IPatient) => {
        const name = patient.human.getFullName().toLowerCase();
        const date = patient.human.dateBirth;
        return !search.value || name.includes(searchLocal) || date.includes(searchLocal);
      });

      return filteredPatients;
    };

    return {
      documentTypes,
      crud,
      schema,
      queryStringsPatient,
      filteredPatients,
      filterTable,
      findPatients,
      handlePatientSelect,
      handleSearchInput,
      mount,
      patients,
      search,
      searchAddress,
      searchFullName,
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
</style>
