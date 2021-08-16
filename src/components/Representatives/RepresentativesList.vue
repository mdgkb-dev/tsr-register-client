<template>
  <div v-if="mount" class="wrapper" style="height: 100%">
    <PageHead :title="title" :show-add-button="true" @create="create" />

    <el-autocomplete
      v-model="queryStringsRepresentative"
      style="width: 100%; margin-bottom: 20px"
      popper-class="wide-dropdown"
      :fetch-suggestions="findRepresentatives"
      placeholder="Найти представителя"
      @select="handleRepresentativeSelect"
      @input="handleSearchInput"
    />

    <div class="table-background">
      <el-input v-model="search" prefix-icon="el-icon-search" style="border-radius: 90%" placeholder="Поиск" class="table-search" />
      <el-table
        :data="filterTable(representatives)"
        class="table-shadow"
        header-row-class-name="header-style"
        row-class-name="no-hover"
        style="width: 100%; margin-bottom: 20px; max-height: calc(100vh - 310px); overflow: auto"
      >
        <el-table-column type="index" width="60" align="center" />
        <el-table-column width="150" align="left">
          <template #header>
            <el-input v-model="searchFullName" size="mini" placeholder="Поиск по имени..." />
          </template>
          <el-table-column label="ФАМИЛИЯ ИМЯ ОТЧЕСТВО" sortable align="left" min-width="150" resizable>
            <template #default="scope">
              {{ scope.row.human.getFullName() }}
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column>
          <template #header> </template>
          <el-table-column width="75" label="ПОЛ" sortable prop="human.isMale" align="center">
            <template #default="scope">
              {{ scope.row.human.getGender() }}
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column>
          <el-table-column prop="human.dateBirth" label="ДАТА РОЖДЕНИЯ" width="120" align="center" sortable>
            <template #default="scope">
              {{ formatDate(scope.row.human.dateBirth) }}
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column>
          <template #header>
            <el-input v-model="searchAddress" size="mini" placeholder="Поиск по адресу..." />
          </template>
          <el-table-column prop="human.addressRegistration" label="АДРЕС РЕГИСТРАЦИИ" width="130" />
        </el-table-column>

        <el-table-column>
          <el-table-column width="120" label="ПОДОПЕЧНЫЕ" align="center">
            <template #default="scope">
              <div v-for="rep in scope.row.representativeToPatient" :key="rep">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="`${rep.patient.human.surname} ${rep.patient.human.name} ${rep.patient.human.patronymic}`"
                  placement="top-end"
                >
                  <el-tag class="tag-link" @click="$router.push(`/patients/${rep.patient.id}`)">{{ children(rep) }}</el-tag>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column>
          <el-table-column prop="human.contact.phone" label="ТЕЛЕФОН" width="150" align="center" />
        </el-table-column>

        <el-table-column>
          <el-table-column prop="human.contact.email" label="EMAIL" min-width="150" align="center" />
        </el-table-column>

        <el-table-column>
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
        </el-table-column>

        <el-table-column width="40" align="center">
          <template #default="scope">
            <TableButtonGroup
              :show-edit-button="true"
              :show-remove-button="true"
              @edit="edit(scope.row.id)"
              @remove="remove(scope.row.id)"
            />
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 20px; margin-bottom: 20px"
        :current-page="curPage"
        background
        layout="prev, pager, next"
        :page-count="Math.round(count / 25)"
        @current-change="setPage"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { ElLoading } from 'element-plus';
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import PageHead from '@/components/PageHead.vue';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import IFilter from '@/interfaces/filters/IFilter';
import IPatient from '@/interfaces/patients/IPatient';
import IRepresentative from '@/interfaces/representatives/IRepresentative';
import IRepresetnationType from '@/interfaces/representatives/IRepresentativeToPatient';
import ISearch from '@/interfaces/shared/ISearch';
import ISearchRepresentative from '@/interfaces/shared/ISearchRepresentative';
import useDateFormat from '@/mixins/useDateFormat';
export default defineComponent({
  name: 'RepresentativesList',
  components: {
    PageHead,
    TableButtonGroup,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const representatives: Ref<IRepresentative[]> = computed(() => store.getters['representatives/representatives']);
    const filteredRepresentatives: Ref<IPatient[]> = computed(() => store.getters['representatives/filteredRepresentatives']);

    const queryStringsRepresentative: Ref<string> = ref('');

    const { formatDate } = useDateFormat();

    const count: Ref<IRepresentative[]> = computed(() => store.getters['meta/count']);
    const curPage = ref(0);
    const mount: Ref<boolean> = ref(false);
    const title: Ref<string> = ref('Представители');

    const filterName: Ref<IFilter[]> = ref([]);
    const filterDate: Ref<IFilter[]> = ref([]);
    const searchFullName = ref('');
    const searchAddress = ref('');
    const search = ref('');

    onBeforeMount(async () => {
      const loading = ElLoading.service({
        lock: true,
        text: 'Загрузка',
      });
      await store.dispatch('representatives/getAll', 0);
      await store.dispatch('meta/getCount', 'representative');
      filterName.value = representatives.value.map((r: IRepresentative) => ({ text: r.human.getFullName(), value: r.human.getFullName() }));
      filterDate.value = representatives.value.map((r: IRepresentative) => ({ text: r.human.dateBirth, value: r.human.dateBirth }));
      mount.value = true;
      loading.close();
    });

    const setPage = async (pageNum: number): Promise<void> => {
      curPage.value = pageNum;
      const loading = ElLoading.service({
        lock: true,
        text: 'Загрузка',
      });
      await store.dispatch('representatives/getAll', pageNum);
      loading.close();
    };

    const edit = async (id: string): Promise<void> => {
      await router.push(`/representatives/${id}`);
    };

    const create = async (): Promise<void> => {
      await router.push('/representatives/new');
    };

    const remove = async (id: number): Promise<void> => {
      await store.dispatch('representatives/delete', id);
    };

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
      curPage.value = 0;
    };

    const findRepresentatives = async (query: string, resolve: any): Promise<void> => {
      const items: ISearchRepresentative[] = [];
      if (query.length > 2) {
        await store.dispatch('representatives/search', query);
        filteredRepresentatives.value.forEach((i: IRepresentative) => {
          if (i.id) items.push({ value: i.human.getFullName(), id: i.id, representative: i });
        });
      }
      console.log(filteredRepresentatives);
      resolve(items);
    };

    const handleRepresentativeSelect = async (item: ISearch): Promise<void> => {
      await store.dispatch('representatives/getAllById', item.id);
    };

    return {
      findRepresentatives,
      handleRepresentativeSelect,
      handleSearchInput,
      formatDate,
      queryStringsRepresentative,
      count,
      curPage,
      setPage,
      children,
      create,
      remove,
      edit,
      filterTable,
      representatives,
      mount,
      title,
      search,
      searchFullName,
      searchAddress,
    };
  },
});
</script>
