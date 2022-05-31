<template>
  <component :is="'AdminListWrapper'" v-if="mounted">
    <template #header>
      <RemoteSearch :key-value="schema.representative.key" @select="selectSearch" />
      <FiltersList default-label="Выберите пол" :models="createSexFilters()" @load="loadRepresentatives" />
      <SortList class="filters-block" :models="createSortList()" :store-mode="true" @load="loadRepresentatives" />
    </template>
    <div class="wrapper" style="height: 100%; overflow: hidden">
      <div class="table-background">
        <el-table
          :data="representatives"
          class="table-shadow"
          header-row-class-name="header-style"
          row-class-name="no-hover"
          height="calc(100vh - 310px)"
          style="width: 100%; margin-bottom: 20px; overflow: auto"
        >
          <el-table-column type="index" width="60" align="center" />
          <el-table-column align="left" min-width="110" resizable>
            <template #header>
              <span class="table-header">
                <span>Фамилия Имя Отчество</span>
              </span>
            </template>
            <template #default="scope">
              {{ scope.row.human.getFullName() }}
            </template>
          </el-table-column>

          <el-table-column width="130" prop="human.isMale" align="center">
            <template #header>
              <span class="table-header">
                <span>Пол</span>
              </span>
            </template>
            <template #default="scope">
              {{ scope.row.human.getGender() }}
            </template>
          </el-table-column>

          <el-table-column prop="human.dateBirth" width="150" align="center">
            <template #header>
              <span class="table-header">
                <span>Дата рождения</span>
              </span>
            </template>
            <template #default="scope">
              {{ formatDate(scope.row.human.dateBirth) }}
            </template>
          </el-table-column>

          <el-table-column prop="human.addressRegistration" label="АДРЕС РЕГИСТРАЦИИ" width="130" />

          <el-table-column width="120" label="ПОДОПЕЧНЫЕ" align="center">
            <template #default="scope">
              <div v-for="rep in scope.row.representativeToPatient" :key="rep">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="`${rep.patient.human.surname} ${rep.patient.human.name} ${rep.patient.human.patronymic}`"
                  placement="top-end"
                >
                  <el-tag class="tag-link" @click="$router.push(`/patients/${rep.patient.id}`)">
                    {{ rep.getRepresentativeChildType() }}
                  </el-tag>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="ТЕЛЕФОН" width="150" align="center">
            <template #default="scope">
              {{ scope.row.human.contact.phone }}
            </template>
          </el-table-column>

          <el-table-column prop="human.contact.email" label="EMAIL" min-width="150" align="center" />

          <el-table-column label="ДОКУМЕНТЫ" width="115" align="center">
            <template #default="scope">
              <div v-for="document in scope.row.human.documents" :key="document">
                <el-tooltip class="item" effect="dark" :content="document.documentType.name" placement="top-end">
                  <el-tag size="small">
                    <i class="el-icon-document" style="margin-right: 3px"></i>
                    <span>{{ document.documentType.getTagName() }}</span>
                  </el-tag>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
          <el-table-column width="40" align="center">
            <template #default="scope">
              <TableButtonGroup
                :show-edit-button="true"
                :show-remove-button="true"
                @edit="crud.edit(scope.row.id)"
                @remove="crud.remove(scope.row.id)"
              />
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <template #footer>
      <Pagination />
    </template>
  </component>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';

import SelectFilter from '@/classes/filters/SelectFilter';
import Human from '@/classes/humans/Human';
import Crud from '@/classes/shared/Crud';
import MainHeader from '@/classes/shared/MainHeader';
import Pagination from '@/components/Pagination.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import SortList from '@/components/SortList.vue';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import FiltersList from '@/components/TableFilters/FiltersList.vue';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import ISelectFilter from '@/interfaces/filters/ISelectFilter';
import ISortModel from '@/interfaces/filters/ISortModel';
import ISearchObject from '@/interfaces/ISearchObject';
import IRepresentative from '@/interfaces/representatives/IRepresentative';
import IRepresetnationType from '@/interfaces/representatives/IRepresentativeToPatient';
import useDateFormat from '@/mixins/useDateFormat';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import RepresentativesFiltersLib from '@/services/Provider/libs/filters/RepresentativesFiltersLib';
import RepresentativesSortsLib from '@/services/Provider/libs/sorts/RepresentativesSortsLib';
import AdminListWrapper from '@/views/Main/AdminListWrapper.vue';
export default defineComponent({
  name: 'RepresentativesList',
  components: {
    RemoteSearch,
    Pagination,
    TableButtonGroup,
    AdminListWrapper,
    FiltersList,
    SortList,
  },
  setup() {
    const representatives: Ref<IRepresentative[]> = computed(() => Provider.store.getters['representatives/representatives']);
    const genderFilter: Ref<ISelectFilter[]> = ref([new SelectFilter({ title: 'Пол', options: Human.GetIsMaleOptions() })]);

    const crud = new Crud('representatives');

    const queryStringsRepresentative: Ref<string> = ref('');

    const { formatDate } = useDateFormat();

    const loadRepresentatives = async () => {
      await Provider.store.dispatch('representatives/getAll', Provider.filterQuery.value);
    };

    const load = async () => {
      Provider.store.commit('filter/setStoreModule', 'representatives');
      Provider.store.commit('main/setMainHeader', new MainHeader({ title: 'Список представителей', create: crud.create }));
      Provider.setSortModels(RepresentativesSortsLib.byFullName());
      await loadRepresentatives();
    };

    Hooks.onBeforeMount(load, {
      pagination: { storeModule: 'representatives', action: 'getAll' },
      sortModels: [],
    });

    const children = (representative: IRepresetnationType) => {
      if (representative.patient) {
        return representative.patient.human.isMale
          ? representative.representativeType?.childMaleType
          : representative.representativeType?.childWomanType;
      }
      return '';
    };

    const selectSearch = async (event: ISearchObject): Promise<void> => {
      await Provider.router.push(`/representatives/${event.id}`);
    };

    const createSexFilters = (): IFilterModel[] => {
      return [RepresentativesFiltersLib.onlyMan(), RepresentativesFiltersLib.onlyWoman()];
    };

    const createSortList = (): ISortModel[] => {
      return [RepresentativesSortsLib.byFullName(), RepresentativesSortsLib.byDateBirth()];
    };

    return {
      loadRepresentatives,
      createSortList,
      createSexFilters,
      selectSearch,
      crud,
      genderFilter,
      formatDate,
      queryStringsRepresentative,
      children,
      representatives,
      mounted: Provider.mounted,
      schema: Provider.schema,
      sortList: Provider.sortList,
    };
  },
});
</script>
