<template>
  <div style="width: 100%" v-if="mount">
    <el-button-group>
      <el-button type="primary" icon="el-icon-document" @click="this.create"
        >Создать пациента</el-button
      >
    </el-button-group>

    <el-table
      :default-sort="{ prop: 'id', order: 'ascending' }"
      :data="patients"
      style="width: 100%"
      @row-dblclick="edit"
    >
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column width="150" label="ФИО">
        <template #default="scope">
          {{ fullName(scope.row.human) }}
        </template>
      </el-table-column>
      <el-table-column width="150" label="Пол">
        <template #default="scope">
          {{ gender(scope.row.human) }}
        </template>
      </el-table-column>
      <el-table-column width="150" label="Вес, Рост">
        <template #default="scope">
          {{ anthropometryTotal(scope.row) }}
        </template>
      </el-table-column>
      <el-table-column prop="human.dateBirth" label="Дата рождения" width="150" />
      <el-table-column width="150" label="Законные представители">
        <template #default="scope">
          <div v-for="rep in scope.row.representativeToPatient">
            <el-tooltip
              class="item"
              effect="dark"
              :content="
                `${rep.representative.human.surname} ${rep.representative.human.name} ${rep.representative.human.patronymic}`
              "
              placement="top-end"
            >
              <el-tag size="small">{{ rep.type }}</el-tag>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="150" label="Диагнозы">
        <template #default="scope">
          <div v-for="mkbToPatient in scope.row.mkbToPatient">
            <el-tooltip
              class="item"
              effect="dark"
              :content="mkbToPatient.mkb ? mkbToPatient.mkb.diagnosisName : ''"
              placement="top-end"
            >
              <el-tag size="small">{{
                mkbToPatient.mkb ? mkbToPatient.mkb.diagnosisName.slice(0, 3) : ''
              }}</el-tag>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="human.addressRegistration" label="Адрес регистрации" width="150" />
      <el-table-column prop="human.contact.phone" label="Телефон" width="150" />
      <el-table-column prop="human.contact.email" label="Эл.почта" width="150" />

      <el-table-column fixed="right" label="" width="120">
        <template #default="scope">
          <el-button @click="edit(scope.row)" type="text" size="small">Редактировать</el-button>
          <el-button @click="this.delete(scope.row.id)" type="text" size="small">Удалить</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapState, mapActions } from 'vuex';

import IFilter from '@/interfaces/filters/IFilter';
import IMkbToPatient from '@/interfaces/mkb/IMkbToPatient';
import IAnthropometry from '@/interfaces/anthropometry/IAnthropometry';
import IHuman from '@/interfaces/humans/IHuman';
import IPatient from '@/interfaces/patients/IPatient';

@Options({
  computed: {
    ...mapState('patients', ['patients']),
    ...mapState('anthropometry', ['anthropometry']),
  },
  methods: {
    ...mapActions({
      getAll: 'patients/getAll',
      getAllAnthropometry: 'anthropometry/getAll',
    }),
  },
})
export default class PatientsList extends Vue {
  $message!: {
    error: any;
  };

  getAll!: () => Promise<void>;

  getAllAnthropometry!: () => Promise<void>;

  patients!: IPatient[];

  anthropometry!: IAnthropometry[];

  mount = false;

  filters!: IFilter[];

  async mounted(): Promise<void> {
    try {
      await this.getAllAnthropometry();
      await this.getAll();
    } catch (e) {
      this.$message.error(e.toString());
      return;
    }
    this.filters = [];
    for (const patient of this.patients) {
      this.filters.push({
        text: patient.human.name,
        value: patient.human.name,
      });
    }
    this.mount = true;
  }

  edit(row: any): void {
    this.$router.push(`/patients/${row.id}`);
  }

  create(): void {
    this.$router.push('/patients/new');
  }

  delete(id: number): void {
    this.$store.dispatch('patients/delete', id);
  }

  filterHandler(value: string, row: any, column: any) {
    const property = column['property'];
    return row[property] === value;
  }

  get fullName() {
    return (human: IHuman) => `${human.surname} ${human.name} ${human.patronymic}`;
  }

  get gender() {
    return (human: IHuman) => (human.gender === 'male' ? 'М' : 'Ж');
  }

  get anthropometryTotal() {
    return (patient: IPatient) => {
      let total = '';
      for (const antro of patient.anthropometryData) {
        for (const item of this.anthropometry) {
          if (antro.anthropometryId === item.id) {
            total = `${total} ${item.name}: ${antro.value} ${item.measure}. \n`;
          }
        }
      }
      return total;
    };
  }
}
</script>
