<template>
  <div v-if="mount" class="wrapper" style="height: 100%; overflow: hidden">
    <div class="table-background">
      <el-autocomplete
        v-model="queryStringsRepresentative"
        style="width: 100%; margin-bottom: 20px"
        popper-class="wide-dropdown"
        :fetch-suggestions="findRepresentatives"
        placeholder="Найти представителя"
        @select="handleRepresentativeSelect"
        @input="handleSearchInput"
      />

      <el-input v-model="search" prefix-icon="el-icon-search" style="border-radius: 90%" placeholder="Поиск" class="table-search" />
      <el-table
        :data="filterTable(representatives)"
        class="table-shadow"
        header-row-class-name="header-style"
        row-class-name="no-hover"
        style="width: 100%; margin-bottom: 20px; max-height: calc(100vh - 310px); overflow: auto"
      >
        <el-table-column type="index" width="60" align="center" />
        <el-table-column align="left" min-width="110" resizable>
          <template #header>
            <span class="table-header">
              <span>Фамилия Имя Отчество</span>
              <FilterTextForm :table="schema.humanSchema.tableName" :col="schema.humanSchema.fullName" />
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
              <FilterSelectForm :select-list="genderFilter" :table="schema.humanSchema.tableName" :col="schema.humanSchema.isMale" />
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
              <FilterDateForm :table="schema.humanSchema.tableName" :col="schema.humanSchema.dateBirth" />
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

        <el-table-column prop="human.contact.phone" label="ТЕЛЕФОН" width="150" align="center" />

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
          <template #header>
            <FilterResetButton />
          </template>
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
      <Pagination />
    </div>
  </div>
</template>

<script lang="ts">
import { ElLoading } from 'element-plus/lib/components';
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import SelectFilter from '@/classes/filters/SelectFilter';
import Human from '@/classes/humans/Human';
import Crud from '@/classes/shared/Crud';
import MainHeader from '@/classes/shared/MainHeader';
import Pagination from '@/components/Pagination.vue';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import FilterDateForm from '@/components/TableFilters/FilterDateForm.vue';
import FilterResetButton from '@/components/TableFilters/FilterResetButton.vue';
import FilterSelectForm from '@/components/TableFilters/FilterSelectForm.vue';
import FilterTextForm from '@/components/TableFilters/FilterTextForm.vue';
import ISelectFilter from '@/interfaces/filters/ISelectFilter';
import IPatient from '@/interfaces/patients/IPatient';
import IRepresentative from '@/interfaces/representatives/IRepresentative';
import IRepresetnationType from '@/interfaces/representatives/IRepresentativeToPatient';
import ISchema from '@/interfaces/schema/ISchema';
import ISearch from '@/interfaces/shared/ISearch';
import ISearchRepresentative from '@/interfaces/shared/ISearchRepresentative';
import useDateFormat from '@/mixins/useDateFormat';
export default defineComponent({
  name: 'RepresentativesList',
  components: {
    Pagination,
    TableButtonGroup,
    FilterTextForm,
    FilterSelectForm,
    FilterDateForm,
    FilterResetButton,
  },
  setup() {
    const store = useStore();
    const representatives: Ref<IRepresentative[]> = computed(() => store.getters['representatives/representatives']);
    const filteredRepresentatives: Ref<IPatient[]> = computed(() => store.getters['representatives/filteredRepresentatives']);
    const schema: Ref<ISchema> = computed(() => store.getters['meta/schema']);
    const genderFilter: Ref<ISelectFilter[]> = ref([new SelectFilter({ title: 'Пол', options: Human.GetIsMaleOptions() })]);

    const crud = new Crud('representatives');

    const queryStringsRepresentative: Ref<string> = ref('');

    const { formatDate } = useDateFormat();

    const mount: Ref<boolean> = ref(false);

    const searchFullName = ref('');
    const searchAddress = ref('');
    const search = ref('');

    onBeforeMount(async () => {
      store.commit('filter/resetId');
      const loading = ElLoading.service({
        lock: true,
        text: 'Загрузка',
      });
      store.commit('filter/setStoreModule', 'representatives');
      store.commit('main/setMainHeader', new MainHeader({ title: 'Список представителей', create: crud.create }));
      await store.dispatch('representatives/getAll', store.getters['filter/filterQuery']);
      mount.value = true;
      loading.close();
    });

    const children = (representative: IRepresetnationType) => {
      if (representative.patient) {
        return representative.patient.human.isMale
          ? representative.representativeType?.childMaleType
          : representative.representativeType?.childWomanType;
      }
      return '';
    };

    const filterTable = (representatives: IRepresentative[]) => {
      let filteredRepresentatives = representatives;

      const searchLocal = search.value.toLowerCase();
      searchFullName.value = searchFullName.value.toLowerCase();
      searchAddress.value = searchAddress.value.toLowerCase();

      filteredRepresentatives = filteredRepresentatives.filter((representative: IRepresentative) => {
        const address = representative.human.addressRegistration.toLowerCase();
        return !searchAddress.value || address.includes(searchAddress.value);
      });

      filteredRepresentatives = filteredRepresentatives.filter((representative: IRepresentative) => {
        const name = representative.human.getFullName().toLowerCase();
        return !searchFullName.value || name.includes(searchFullName.value);
      });

      filteredRepresentatives = filteredRepresentatives.filter((representative: IRepresentative) => {
        const name = representative.human.getFullName().toLowerCase();
        const date = representative.human.dateBirth;
        return !search.value || name.includes(searchLocal) || date.includes(searchLocal);
      });

      return filteredRepresentatives;
    };

    const handleSearchInput = async (value: string): Promise<void> => {
      if (value.length === 0) {
        await store.dispatch('representatives/getAll', 0);
      }
      store.commit('pagination/setCurPage', 0);
    };

    const findRepresentatives = async (query: string, resolve: CallableFunction): Promise<void> => {
      const items: ISearchRepresentative[] = [];
      if (query.length > 2) {
        await store.dispatch('representatives/search', query);
        filteredRepresentatives.value.forEach((i: IRepresentative) => {
          if (i.id) items.push({ value: i.human.getFullName(), id: i.id, representative: i });
        });
      }
      resolve(items);
    };

    const handleRepresentativeSelect = async (item: ISearch): Promise<void> => {
      await store.dispatch('representatives/getAllById', item.id);
    };

    return {
      crud,
      genderFilter,
      schema,
      findRepresentatives,
      handleRepresentativeSelect,
      handleSearchInput,
      formatDate,
      queryStringsRepresentative,
      children,
      filterTable,
      representatives,
      mount,
      search,
      searchFullName,
      searchAddress,
    };
  },
});
</script>
