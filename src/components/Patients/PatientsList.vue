<template>
  <div v-if="mount" style="height: 100%; overflow: hidden">
    <PageHead :title="'Список пациентов'" :show-add-button="true" @create="create" />
    <div class="table-background">
      <div style="display: flex; align-items: flex-start">
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
        <PatientsFilters />
      </div>
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
        style="width: 100%; margin-bottom: 20px; max-height: calc(100vh - 310px); overflow: auto"
      >
        <el-table-column width="60" align="center" />

        <el-table-column>
          <template #header>
            <el-input v-model="searchFullName" size="mini" placeholder="Поиск по имени..." />
          </template>
          <el-table-column label="ФАМИЛИЯ ИМЯ ОТЧЕСТВО" sortable prop="human.surname" align="left" min-width="130" resizable>
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
          <el-table-column width="130" label="ЗАКОННЫЕ ПРЕДСТАВИТЕЛИ" align="center">
            <template #default="scope">
              <div v-for="rep in scope.row.representativeToPatient" :key="rep">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="`${rep.representative.human.surname} ${rep.representative.human.name} ${rep.representative.human.patronymic}`"
                  placement="top-end"
                >
                  <el-tag class="tag-link" size="small" @click="$router.push(`/representatives/${rep.representative.id}`)">{{
                    rep.representativeType.name
                  }}</el-tag>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column>
          <el-table-column width="75" label="ВЕС РОСТ" align="center">
            <template #default="scope">
              <span v-html="scope.row.getAnthropometryShortData()"></span>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column>
          <el-table-column width="95" label="ДИАГНОЗЫ" align="center">
            <template #default="scope">
              <div v-for="diagnosis in scope.row.patientDiagnosis" :key="diagnosis">
                <div v-if="diagnosis.mkbSubDiagnosis">
                  <span
                    v-if="diagnosis.mkbSubDiagnosis"
                    class="underline-label"
                    v-html="diagnosis.mkbDiagnosis.code + '.' + diagnosis.mkbSubDiagnosis.subCode"
                  ></span>
                  <el-tooltip
                    v-if="diagnosis.mkbSubDiagnosis"
                    class="item"
                    effect="dark"
                    :content="diagnosis.mkbSubDiagnosis.name"
                    placement="top-end"
                  >
                    <i class="el-icon-question" style="font-size: 17px; margin-left: 5px"></i>
                  </el-tooltip>
                </div>
                <div v-else>
                  <span v-if="diagnosis.mkbDiagnosis" class="underline-label" v-html="diagnosis.mkbDiagnosis.code"></span>
                  <el-tooltip
                    v-if="diagnosis.mkbDiagnosis"
                    class="item"
                    effect="dark"
                    :content="diagnosis.mkbDiagnosis.name"
                    placement="top-end"
                  >
                    <i class="el-icon-question" style="font-size: 17px; margin-left: 5px"></i>
                  </el-tooltip>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column>
          <el-table-column label="ИНВАЛИДНОСТЬ" width="200" align="center">
            <template #default="scope">
              <el-space v-if="scope.row.getActuallyDisability()" direction="vertical">
                <span>До {{ formatDate(scope.row.getActuallyDisability().period.dateEnd) }}</span>
                <div v-if="scope.row.getActuallyDisability().getActuallyEdv()" class="disability-circles">
                  <el-button
                    size="mini"
                    disabled
                    :type="scope.row.getActuallyDisability().getActuallyEdv().parameter1 ? 'primary' : undefined"
                    circle
                  >
                    A
                  </el-button>
                  <el-button
                    size="mini"
                    disabled
                    :type="scope.row.getActuallyDisability().getActuallyEdv().parameter2 ? 'primary' : undefined"
                    circle
                    >B</el-button
                  >
                  <el-button
                    size="mini"
                    disabled
                    :type="scope.row.getActuallyDisability().getActuallyEdv().parameter3 ? 'primary' : undefined"
                    circle
                    >C</el-button
                  >
                </div>
                <div v-else>Нет справок ЕДВ</div>
              </el-space>
            </template>
          </el-table-column>
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
      <div style="text-align: center; width: 100%">
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
  </div>
</template>

<script lang="ts">
import { ElLoading } from 'element-plus';
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import PageHead from '@/components/PageHead.vue';
import PatientsFilters from '@/components/Patients/PatientsFilters.vue';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import IPatient from '@/interfaces/patients/IPatient';
import IRepresentative from '@/interfaces/representatives/IRepresentative';
import IRepresetnationType from '@/interfaces/representatives/IRepresentativeToPatient';
import ISearch from '@/interfaces/shared/ISearch';
import ISearchPatient from '@/interfaces/shared/ISearchPatient';
import useDateFormat from '@/mixins/useDateFormat';

export default defineComponent({
  name: 'RepresentativesList',
  components: {
    PageHead,
    TableButtonGroup,
    PatientsFilters,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const patients: Ref<IPatient[]> = computed(() => store.getters['patients/patients']);
    const filteredPatients: Ref<IPatient[]> = computed(() => store.getters['patients/filteredPatients']);
    const count: Ref<IRepresentative[]> = computed(() => store.getters['meta/count']);
    const { formatDate } = useDateFormat();

    const mount: Ref<boolean> = ref(false);
    const title: Ref<string> = ref('Пациенты');
    const queryStringsPatient: Ref<string> = ref('');

    const searchFullName = ref('');
    const searchAddress = ref('');
    const search = ref('');
    const curPage = ref(0);
    const loading = ref(false);

    onBeforeMount(async () => {
      const loading = ElLoading.service({
        lock: true,
        text: 'Загрузка',
      });

      await store.dispatch('patients/getAll', 0);
      await store.dispatch('meta/getCount', 'patient');
      mount.value = true;
      loading.close();
    });

    const setPage = async (pageNum: number): Promise<void> => {
      curPage.value = pageNum;
      loading.value = true;
      await store.dispatch('patients/getAll', pageNum - 1);
      loading.value = false;
    };

    const handleSearchInput = async (value: string): Promise<void> => {
      if (value.length === 0) {
        await store.dispatch('patients/getAll', 0);
      }
      curPage.value = 0;
    };

    const findPatients = async (query: string, resolve: any): Promise<void> => {
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

    const edit = async (id: string): Promise<void> => {
      await router.push(`/patients/${id}`);
    };

    const create = async (): Promise<void> => {
      await router.push('/patients/new');
    };

    const remove = async (id: number): Promise<void> => {
      await store.dispatch('patients/delete', id);
    };

    const children = (representative: IRepresetnationType) => {
      if (representative.patient) {
        return representative.patient.human.isMale
          ? representative.representativeType?.childMaleType
          : representative.representativeType?.childWomanType;
      }
      return '';
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
      queryStringsPatient,
      count,
      formatDate,
      children,
      create,
      curPage,
      edit,
      filteredPatients,
      filterTable,
      findPatients,
      handlePatientSelect,
      handleSearchInput,
      mount,
      patients,
      remove,
      search,
      searchAddress,
      searchFullName,
      setPage,
      title,
    };
  },
});
</script>
