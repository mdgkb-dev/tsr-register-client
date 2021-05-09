<template>
  <div style="width: 100%" v-if="mount">
    <el-button-group>
      <el-button type="primary" icon="el-icon-document" @click="this.create">Создать пациента</el-button>
    </el-button-group>

    <el-table :default-sort="{ prop: 'id', order: 'ascending' }" :data="filterTable(patients)" style="width: 100%" @row-dblclick="edit">
      <el-table-column type="index" width="50" />
      <el-table-column width="150" label="ФИО" sortable prop="human.surname" :filters="filterName" :filter-method="filter.filterNameMethod">
        <template #default="scope">
          {{ scope.row.human.getFullName() }}
        </template>
      </el-table-column>
      <el-table-column width="150" label="Пол" sortable prop="human.gender">
        <template #default="scope">
          {{ scope.row.human.getGender() }}
        </template>
      </el-table-column>
      <el-table-column width="150" label="Вес, Рост">
        <template #default="scope">
          {{ scope.row.getAnthropometryDataFull() }}
        </template>
      </el-table-column>
      <el-table-column prop="human.dateBirth" label="Дата рождения" width="150" sortable :filters="filterDate" :filter-method="filter.filterDateMethod" />
      <el-table-column width="150" label="Законные представители">
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
      <el-table-column width="150" label="Диагнозы">
        <template #default="scope">
          <div v-for="mkbToPatient in scope.row.mkbToPatient" :key="mkbToPatient">
            <el-tooltip class="item" effect="dark" :content="mkbToPatient.mkb ? mkbToPatient.mkb.diagnosisName : ''" placement="top-end">
              <el-tag size="small">{{ mkbToPatient.mkb ? mkbToPatient.mkb.diagnosisName.slice(0, 3) : '' }}</el-tag>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="human.addressRegistration" label="Адрес регистрации" width="150" />
      <el-table-column prop="human.contact.phone" label="Телефон" width="150" />
      <el-table-column prop="human.contact.email" label="Эл.почта" width="150" />
      <el-table-column fixed="right" label="" width="140">
        <template #header>
          <el-input v-model="search" size="mini" placeholder="Поиск" />
        </template>
        <template #default="scope">
          <el-button @click="edit(scope.row.id)" type="text" size="small">Редактировать</el-button>
          <el-button @click="remove(scope.row.id)" type="text" size="small">Удалить</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapState, mapActions } from 'vuex';

import IFilter from '@/interfaces/filters/IFilter';
import IPatient from '@/interfaces/patients/IPatient';

import Filter from '@/classes/filters/Filter';

@Options({
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

  filterName: IFilter[] = [];
  filterDate: IFilter[] = [];
  filter = new Filter();

  async mounted(): Promise<void> {
    try {
      await this.getAll();
    } catch (e) {
      this.$message.error(e.toString());
      return;
    }
    this.filterName = this.patients.map((patient: IPatient) => ({ text: patient.human.getFullName(), value: patient.human.getFullName() }));
    this.filterDate = this.patients.map((patient: IPatient) => ({ text: patient.human.dateBirth, value: patient.human.dateBirth }));

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
    const search = this.search.toLowerCase();
    return patients.filter((patient: IPatient) => {
      const name = patient.human.getFullName().toLowerCase();
      const date = patient.human.dateBirth;
      return !this.search || name.includes(search) || date.includes(search);
    });
  };
}
</script>
