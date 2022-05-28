<template>
  <div v-if="mounted" style="height: 100%; overflow: hidden">
    <div class="table-background">
      <RemoteSearch :key-value="schema.patient.key" @select="selectSearch" />
      <el-table
        ref="table"
        :data="patients"
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
import { computed, ComputedRef, defineComponent, Ref } from 'vue';

import Crud from '@/classes/shared/Crud';
import Pagination from '@/components/Pagination.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import IDocumentType from '@/interfaces/documents/IDocumentType';
import ISearchObject from '@/interfaces/ISearchObject';
import IPatient from '@/interfaces/patients/IPatient';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import PatientsSortsLib from '@/services/Provider/libs/sorts/PatientsSortsLib';

export default defineComponent({
  name: 'PatientsList',
  components: {
    RemoteSearch,
    Pagination,
  },
  setup() {
    const patients: Ref<IPatient[]> = computed(() => Provider.store.getters['patients/patients']);
    const documentTypes: ComputedRef<IDocumentType[]> = computed(() => Provider.store.getters['documentTypes/documentTypes']);

    const crud = new Crud('patients');

    const load = async () => {
      Provider.store.commit('filter/setStoreModule', 'patients');
      Provider.setSortModels(PatientsSortsLib.byFullName());
      await Provider.store.dispatch('patients/getAll', Provider.store.getters['filter/filterQuery']);
      await Provider.store.dispatch('registers/getAll');
      await Provider.store.dispatch('documentTypes/getAll');
    };

    Hooks.onBeforeMount(load, {
      pagination: { storeModule: 'patients', action: 'getAll' },
      sortModels: [],
    });

    const selectSearch = async (event: ISearchObject): Promise<void> => {
      await Provider.router.push(`/patients/${event.id}`);
    };
    return {
      documentTypes,
      crud,
      patients,
      selectSearch,
      mounted: Provider.mounted,
      schema: Provider.schema,
      sortList: Provider.sortList,
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
