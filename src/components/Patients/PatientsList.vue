<template>
  <div v-if="mount" style="height: 100%; overflow: hidden">
    <PageHead :title="'Список пациентов'" @create="create" :showAddButton="true" />
    <div class="table-background">
      <el-autocomplete
        style="width: 100%;margin-bottom: 20px"
        popper-class="wide-dropdown"
        @select="handlePatientSelect"
        :fetch-suggestions="findPatients"
        @input="handleSearchInput"
        v-model="queryStringsPatient"
        placeholder="Найти пациента"
      >
      </el-autocomplete>
      <el-input prefix-icon="el-icon-search" style="border-radius: 90%" v-model="search" placeholder="Отфильтровать текущий список" class="table-search" />
      <el-table
        ref="table"
        :default-sort="{ prop: 'id', order: 'ascending' }"
        :data="filterTable(patients)"
        class="table-shadow"
        header-row-class-name="header-style"
        row-class-name="no-hover"
        style="width: 100%;margin-bottom: 20px; max-height: calc(100vh - 310px); overflow: auto;"
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
              {{ fillDateFormat(scope.row.human.dateBirth) }}
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
                  <el-tag class="tag-link" size="small" @click="this.$router.push(`/representatives/${rep.representative.id}`)">{{ rep.representativeType.name }}</el-tag>
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
                  <span class="underline-label" v-if="diagnosis.mkbSubDiagnosis" v-html="diagnosis.mkbDiagnosis.code + '.' + diagnosis.mkbSubDiagnosis.subCode"></span>
                  <el-tooltip class="item" effect="dark" v-if="diagnosis.mkbSubDiagnosis" :content="diagnosis.mkbSubDiagnosis.name" placement="top-end">
                    <i class="el-icon-question" style="font-size: 17px; margin-left: 5px"></i>
                  </el-tooltip>
                </div>
                <div v-else>
                  <span class="underline-label" v-if="diagnosis.mkbDiagnosis" v-html="diagnosis.mkbDiagnosis.code"></span>
                  <el-tooltip class="item" effect="dark" v-if="diagnosis.mkbDiagnosis" :content="diagnosis.mkbDiagnosis.name" placement="top-end">
                    <i class="el-icon-question" style="font-size: 17px; margin-left: 5px"></i>
                  </el-tooltip>
                </div>
              </div>
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
          <template #header> </template>
          <el-table-column label="РЕГИСТРЫ" width="100" align="center">
            <template #default="scope">
              <div v-for="registerToPatient in scope.row.registerToPatient" :key="registerToPatient.id">
                <el-tooltip class="item" effect="dark" :content="registerToPatient.register.name" placement="top-end">
                  <el-tag
                    class="tag-link"
                    size="small"
                    @click="this.$router.push(`/registers/patients/${registerToPatient.registerId}/${registerToPatient.patientId}`)"
                    >{{ registerToPatient.register.name }}</el-tag
                  >
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column>
          <el-table-column label="ИНВАЛИДНОСТЬ" width="140" align="center">
            <template #default="scope">
              <el-space direction="vertical" v-if="scope.row.getActuallyDisability()">
                <span>До {{ $dateFormatRu(scope.row.getActuallyDisability().period.dateEnd) }}</span>
                <div v-if="scope.row.getActuallyDisability().getActuallyEdv()" class="disability-circles">
                  <el-button size="small" disabled :type="scope.row.getActuallyDisability().getActuallyEdv().parameter1 ? 'primary' : undefined" circle>A</el-button>
                  <el-button size="small" disabled :type="scope.row.getActuallyDisability().getActuallyEdv().parameter2 ? 'primary' : undefined" circle>B</el-button>
                  <el-button size="small" disabled :type="scope.row.getActuallyDisability().getActuallyEdv().parameter3 ? 'primary' : undefined" circle>C</el-button>
                </div>
                <div v-else>
                  Нет справок ЕДВ
                </div>
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

        <el-table-column width="40" fixed="right" align="center">
          <template #default="scope">
            <TableButtonGroup @edit="edit(scope.row.id)" @remove="remove(scope.row.id)" :showEditButton="true" :showRemoveButton="true" />
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: center; width: 100%">
        <el-pagination style="margin-top: 20px; margin-bottom: 20px" :current-page="curPage" background layout="prev, pager, next" :total="240" @current-change="setPage">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { mapActions, mapState } from 'vuex';

import PageHead from '@/components/PageHead.vue';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import IPatient from '@/interfaces/patients/IPatient';
import ISearch from '@/interfaces/shared/ISearch';
import ISearchPatient from '@/interfaces/shared/ISearchPatient';

@Options({
  name: 'PatientsList',
  components: {
    PageHead,
    TableButtonGroup,
  },
  computed: {
    ...mapState('patients', ['patients', 'filteredPatients']),
  },
  methods: {
    ...mapActions({
      getAll: 'patients/getAll',
      searchPatients: 'patients/searchPatients',
      getAllById: 'patients/getAllById',
    }),
  },
})
export default class PatientsList extends Vue {
  // Types.
  $message!: {
    error: any;
  };
  $loading: any;
  patients!: IPatient[];
  filteredPatients!: IPatient[];

  getAll!: (pageNum: number) => Promise<void>;
  searchPatients!: (query: string) => Promise<void>;
  getAllById!: (id: string) => Promise<void>;

  // Local state.
  loading = false;
  mount = false;
  search = '';
  searchFullName = '';
  searchAddress = '';
  title = 'Пациенты';
  queryStringsPatient = '';
  curPage = 0;

  // Lifecycle methods.
  async mounted(): Promise<void> {
    const loading = this.$loading({
      lock: true,
      text: 'Загрузка',
    });
    try {
      await this.getAll(0);
    } catch (e) {
      this.$message.error(e.toString());
      return;
    }

    this.mount = true;
    loading.close();
  }

  // Methods.
  async setPage(pageNum: number) {
    this.curPage = pageNum;
    this.loading = true;
    await this.getAll(pageNum - 1);
    this.loading = false;
  }
  async handleSearchInput(value: string): Promise<void> {
    if (value.length === 0) {
      await this.getAll(0);
    }
    this.curPage = 0;
  }
  async findPatients(query: string, resolve: any) {
    const patients: ISearchPatient[] = [];
    if (query.length > 2) {
      await this.searchPatients(query);
      this.filteredPatients.forEach((p: IPatient) => {
        if (p.id) patients.push({ value: p.human.getFullName(), id: p.id, patient: p });
      });
    }

    resolve(patients);
  }

  async handlePatientSelect(item: ISearch) {
    await this.getAllById(item.id);
  }

  edit(id: string): void {
    this.$router.push(`/patients/${id}`);
  }

  create(): void {
    this.$router.push('/patients/new');
  }

  remove(id: string): void {
    this.$store.dispatch('patients/delete', id);
  }

  filterTable = (patients: IPatient[]) => {
    let filteredPatients = patients;

    const search = this.search.toLowerCase();
    const searchFullName = this.searchFullName.toLowerCase();
    const searchAddress = this.searchAddress.toLowerCase();

    filteredPatients = filteredPatients.filter((patient: IPatient) => {
      const address = patient.human.addressRegistration.toLowerCase();
      return !this.searchAddress || address.includes(searchAddress);
    });

    filteredPatients = filteredPatients.filter((patient: IPatient) => {
      const name = patient.human.getFullName().toLowerCase();
      return !this.searchFullName || name.includes(searchFullName);
    });

    filteredPatients = filteredPatients.filter((patient: IPatient) => {
      const name = patient.human.getFullName().toLowerCase();
      const date = patient.human.dateBirth;
      return !this.search || name.includes(search) || date.includes(search);
    });

    return filteredPatients;
  };

  fillDateFormat = (date: Date) => (date ? Intl.DateTimeFormat('ru-RU').format(new Date(date)) : '');
}
</script>
