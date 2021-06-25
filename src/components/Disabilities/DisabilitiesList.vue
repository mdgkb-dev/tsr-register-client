<template>
  <div v-if="mount" style="height: 100%">
    <ListHead :title="title" :hideButton="true" />
    <div class="table-background">
      <el-input prefix-icon="el-icon-search" style="border-radius: 90%" v-model="search" placeholder="Поиск" class="table-search" />
      <el-table border :default-sort="{ prop: 'id', order: 'ascending' }" :data="filterTable(patients)" class="table-shadow" header-row-class-name="header-style">
        <el-table-column type="index" width="50" />
        <el-table-column min-width="150" align="center">
          <template #header>
            <el-input v-model="searchFullName" size="mini" placeholder="Поиск по имени..." />
          </template>
          <el-table-column label="ФИО" sortable prop="human.surname" align="left" resizable min-width="160">
            <template #default="scope">
              {{ scope.row.human.getFullName() }}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column>
          <el-table-column prop="human.dateBirth" label="Дата постановки" min-width="160" sortable>
            <template #default="scope">
              {{ $dateFormatRu(scope.row.getActuallyDisability().period.dateStart) }}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column>
          <el-table-column prop="human.dateBirth" label="Дата завершения" min-width="160" sortable>
            <template #default="scope">
              {{ $dateFormatRu(scope.row.getActuallyDisability().period.dateEnd) }}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column>
          <el-table-column label="Справка ЕДВ" min-width="160" sortable>
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
          <el-table-column label="Инвалидность" min-width="180" sortable>
            <template #default="scope">
              <div v-if="scope.row.getActuallyDisability().getActuallyEdv()">
                <el-button :type="scope.row.getActuallyDisability().getActuallyEdv().parameter1 ? 'primary' : undefined" circle>A</el-button>
                <el-button :type="scope.row.getActuallyDisability().getActuallyEdv().parameter2 ? 'primary' : undefined" circle>B</el-button>
                <el-button :type="scope.row.getActuallyDisability().getActuallyEdv().parameter3 ? 'primary' : undefined" circle>C</el-button>
              </div>
              <div v-else>
                Нет справок ЕДВ
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
