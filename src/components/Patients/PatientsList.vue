<template>
  <div v-if="mount">
    <ListHead :title="title" @create="create" />
    <div class="table-background">
      <el-input prefix-icon="el-icon-search" style="border-radius: 90%" v-model="search" placeholder="Поиск" class="table-search" />
      <el-table border :default-sort="{ prop: 'id', order: 'ascending' }" :data="filterTable(patients)" class="table-shadow" header-row-class-name="header-style">
        <el-table-column type="index" width="50" />
        <el-table-column width="150" align="center">
          <template #header>
            <el-input v-model="searchFullName" size="mini" placeholder="Поиск по имени..." />
          </template>
          <el-table-column label="ФИО" sortable prop="human.surname" align="left" resizable>
            <template #default="scope">
              {{ scope.row.human.getFullName() }}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column>
          <template #header> </template>
          <el-table-column width="120" label="Пол" sortable prop="human.isMale">
            <template #default="scope">
              {{ scope.row.human.getGender() }}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column>
          <el-table-column width="160" label="Вес, Рост">
            <template #default="scope">
              <span v-html="scope.row.getAnthropometryDataFull()"></span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column>
          <el-table-column prop="human.dateBirth" label="Дата рождения" width="160" sortable>
            <template #default="scope">
              {{ fillDateFormat(scope.row.human.dateBirth) }}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column>
          <el-table-column width="190" label="Законные представители">
            <template #default="scope">
              <div v-for="rep in scope.row.representativeToPatient" :key="rep">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="`${rep.representative.human.surname} ${rep.representative.human.name} ${rep.representative.human.patronymic}`"
                  placement="top-end"
                >
                  <el-tag size="small">{{ rep.type }}</el-tag>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column>
          <el-table-column width="150" label="Диагнозы">
            <template #default="scope">
              <div v-for="diagnosis in scope.row.patientDiagnosis" :key="diagnosis">
                <el-tooltip class="item" effect="dark" :content="diagnosis.mkbDiagnosis.name" placement="top-end">
                  <el-tag size="small">{{ diagnosis.mkbDiagnosis.code }}</el-tag>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column width="210">
          <template #header>
            <el-input v-model="searchAddress" size="mini" placeholder="Поиск по адресу..." />
          </template>
          <el-table-column prop="human.addressRegistration" label="Адрес регистрации" />
        </el-table-column>
        <el-table-column>
          <el-table-column prop="human.contact.phone" label="Телефон" width="155" />
        </el-table-column>
        <el-table-column>
          <el-table-column prop="human.contact.email" label="Эл.почта" width="150" />
        </el-table-column>
        <el-table-column fixed="right" label="" width="140">
          <template #default="scope">
            <el-button @click="edit(scope.row.id)" type="text" size="small">Редактировать</el-button>
            <el-button @click="remove(scope.row.id)" type="text" size="small">Удалить</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapState, mapActions } from 'vuex';

import IPatient from '@/interfaces/patients/IPatient';
import ListHead from '@/components/ListHead.vue';

@Options({
  components: {
    ListHead,
  },
  computed: {
    ...mapState('patients', ['patients']),
  },
  methods: {
    ...mapActions({
      getAll: 'patients/getAll',
    }),
  },
})
export default class PatientsList extends Vue {
  $message!: {
    error: any;
  };

  getAll!: () => Promise<void>;
  patients!: IPatient[];

  mount = false;
  search = '';
  searchFullName = '';
  searchAddress = '';

  title = 'Пациенты';

  async mounted(): Promise<void> {
    try {
      await this.getAll();
    } catch (e) {
      this.$message.error(e.toString());
      return;
    }

    this.mount = true;
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
