<template>
  <div v-if="mount" style="height: 100%">
    <ListHead :title="title" :hideButton="true" />
    <div class="table-background">
      <el-input prefix-icon="el-icon-search" style="border-radius: 90%" v-model="search" placeholder="Поиск" class="table-search" />
      <el-table
        :cell-style="{ height: '70px' }"
        :default-sort="{ prop: 'id', order: 'ascending' }"
        :data="filterTable(patients)"
        class="table-shadow"
        header-row-class-name="header-style"
        row-class-name="no-hover"
      >
        <el-table-column type="index" width="60" align="center" />

        <el-table-column min-width="150" align="center">
          <template #header>
            <el-input v-model="searchFullName" size="mini" placeholder="Поиск по имени..." />
          </template>
          <el-table-column label="ФАМИЛИЯ ИМЯ ОТЧЕСТВО" sortable prop="human.surname" align="left" resizable min-width="160">
            <template #default="scope">
              {{ scope.row.human.getFullName() }}
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column>
          <el-table-column prop="human.dateBirth" label="Дата постановки" min-width="160" align="center" sortable>
            <template #default="scope">
              {{ $dateFormatRu(scope.row.getActuallyDisability().period.dateStart) }}
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column>
          <el-table-column prop="human.dateBirth" label="Дата завершения" min-width="160" align="center" sortable>
            <template #default="scope">
              {{ $dateFormatRu(scope.row.getActuallyDisability().period.dateEnd) }}
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column>
          <el-table-column label="Справка ЕДВ" min-width="160" align="center" sortable>
            <template #default="scope">
              <div v-if="scope.row.getActuallyDisability().getActuallyEdv()">
                {{ $dateFormatRu(scope.row.getActuallyDisability().getActuallyEdv().period.dateStart) }} -
                {{ $dateFormatRu(scope.row.getActuallyDisability().getActuallyEdv().period.dateEnd) }}
              </div>
              <div v-else>
                Нет справок ЕДВ
              </div>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column>
          <el-table-column label="Инвалидность" min-width="180" align="center" sortable>
            <template #default="scope">
              <div v-if="scope.row.getActuallyDisability().getActuallyEdv()" class="disabityli-circles">
                <el-button size="small" disabled :type="scope.row.getActuallyDisability().getActuallyEdv().parameter1 ? 'primary' : undefined" circle>A</el-button>
                <el-button size="small" disabled :type="scope.row.getActuallyDisability().getActuallyEdv().parameter2 ? 'primary' : undefined" circle>B</el-button>
                <el-button size="small" disabled :type="scope.row.getActuallyDisability().getActuallyEdv().parameter3 ? 'primary' : undefined" circle>C</el-button>
              </div>
              <div v-else>
                Нет справок ЕДВ
              </div>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column>
          <el-table-column label="ДОКУМЕНТЫ" width="130" align="center">
            <template #default="scope">
              <div v-for="document in scope.row.human.documents" :key="document">
                <el-tag size="small">
                  <i class="el-icon-document" style="margin-right: 3px"></i>
                  <span>{{ document.documentType.name }}</span>
                </el-tag>
              </div>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { mapActions, mapState } from 'vuex';

import ListHead from '@/components/ListHead.vue';
import IPatient from '@/interfaces/patients/IPatient';

@Options({
  name: 'PatientsList',
  components: {
    ListHead,
  },
  computed: {
    ...mapState('patients', ['patients']),
  },
  methods: {
    ...mapActions({
      getAllWithDisabilities: 'patients/getAllWithDisabilities',
    }),
  },
})
export default class PatientsList extends Vue {
  $message!: {
    error: any;
  };

  getAllWithDisabilities!: () => Promise<void>;
  patients!: IPatient[];

  mount = false;
  search = '';
  searchFullName = '';

  title = 'Инвалидность';

  async mounted(): Promise<void> {
    try {
      await this.getAllWithDisabilities();
    } catch (e) {
      this.$message.error(e.toString());
      return;
    }

    this.mount = true;
  }

  filterTable = (patients: IPatient[]) => {
    let filteredPatients = patients;

    const search = this.search.toLowerCase();
    const searchFullName = this.searchFullName.toLowerCase();

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

<style>
.disabityli-circles .el-button.is-disabled {
  cursor: initial;
}
.disabityli-circles .el-button--primary {
  color: black;
  background-color: initial;
  border-color: initial;
}

.disabityli-circles .el-button--primary:hover {
  color: initial;
  background-color: initial;
  border-color: initial;
}
</style>
