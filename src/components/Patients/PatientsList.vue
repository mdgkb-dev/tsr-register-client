<template>
  <div style="width: 100%; height: 100%" v-if="mount">
    <ListHead :title="title" @create="create" />
    <div class="table-background">
      <el-input prefix-icon="el-icon-search" style="border-radius: 90%" v-model="search" placeholder="Поиск" class="table-search" />
      <el-table
        :default-sort="{ prop: 'id', order: 'ascending' }"
        :data="filterTable(patients)"
        class="table-patients"
        :header-cell-style="{ color: '#a1a7bd', 'font-size': '12px', background: '#eff1f7', 'font-family': 'Open Sans' }"
      >
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
        <el-table-column prop="human.dateBirth" label="Дата рождения" width="160" sortable :filters="filterDate" :filter-method="filter.filterDateMethod">
          <template #default="scope">
            {{ fillDateFormat(scope.row.human.dateBirth) }}
          </template>
        </el-table-column>
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
        <el-table-column width="150" label="Диагнозы">
          <template #default="scope">
            <div v-for="mkbToPatient in scope.row.mkbToPatient" :key="mkbToPatient">
              <el-tooltip class="item" effect="dark" :content="mkbToPatient.mkb ? mkbToPatient.mkb.diagnosisName : ''" placement="top-end">
                <el-tag size="small">{{ mkbToPatient.mkb ? mkbToPatient.mkb.diagnosisName.slice(0, 3) : '' }}</el-tag>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="human.addressRegistration" label="Адрес регистрации" width="190" />
        <el-table-column prop="human.contact.phone" label="Телефон" width="155" />
        <el-table-column prop="human.contact.email" label="Эл.почта" width="150" />
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

import IFilter from '@/interfaces/filters/IFilter';
import IPatient from '@/interfaces/patients/IPatient';

import Filter from '@/classes/filters/Filter';
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

  filterName: IFilter[] = [];
  filterDate: IFilter[] = [];
  filter = new Filter();
  title = 'Пациенты';

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

  fillDateFormat = (date: Date) => (date ? Intl.DateTimeFormat('ru-RU').format(new Date(date)) : '');
}
</script>
