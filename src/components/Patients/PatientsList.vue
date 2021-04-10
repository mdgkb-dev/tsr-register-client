<template>
  <div style="width: 100%">
    <el-button-group>
      <el-button type="primary" icon="el-icon-document" @click="this.create"
        >Создать пациента</el-button
      >
    </el-button-group>

    <el-table
      :default-sort="{ prop: 'id', order: 'ascending' }"
      :data="patients"
      style="width: 100%"
    >
      <el-table-column prop="id" label="№" width="150" />
      <el-table-column
        prop="human.name"
        label="Имя"
        width="150"
        :filters="filters"
        :filter-method="filterHandler"
      />
      <el-table-column prop="human.surname" label="Фамилия" width="150" />
      <el-table-column prop="human.patronymic" label="Отчество" width="150" />
      <el-table-column prop="human.dateBirth" label="Дата рождения" width="150" />
      <el-table-column prop="human.gender" label="Пол" width="150" />
      <el-table-column prop="human.addressRegistration" label="Адрес регистрации" width="150" />
      <el-table-column prop="human.addressResidential" label="Адрес проживания" width="150" />
      <el-table-column prop="human.contact.phone" label="Телефон" width="150" />
      <el-table-column prop="human.contact.email" label="Эл.почта" width="150" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
          <el-button @click="this.edit(scope.row.id)" type="text" size="small"
            >Редактировать</el-button
          >
          <el-button @click="this.delete(scope.row.id)" type="text" size="small">Удалить</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="modalVisible" width="50%" :close-on-click-modal="false">
      <ModalForm
        :patient="patient"
        :modalTitle="modalTitle"
        :is-create-form="isCreateForm"
        @close="close"
      />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapState, mapActions } from 'vuex';

import IFilter from '@/interfaces/filters/IFilter';
import IPatient from '../../interfaces/patients/IPatient';

import ModalForm from './ModalForm.vue';

@Options({
  components: {
    ModalForm,
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
  getAll!: () => Promise<void>;

  patients!: IPatient[];

  patient: IPatient = {
    human: {
      id: undefined,
      name: '',
      surname: '',
      patronymic: '',
      gender: '',
      dateBirth: '',
      addressRegistration: '',
      addressResidential: '',
      contact: {
        email: '',
        phone: '',
      },
      insuranceCompanyToHuman: [],
    },
    anthropometryData: [],
    mkbToPatient: [],
  };

  filters!: IFilter[];

  modalVisible = false;

  modalTitle = '';

  isCreateForm = false;

  async mounted(): Promise<void> {
    await this.getAll();
    this.filters = [];
    for (const patient of this.patients) {
      this.filters.push({
        text: patient.human.name,
        value: patient.human.name,
      });
    }
    console.log(this.filters);
  }

  edit(id: number): void {
    this.patient = this.$store.getters['patients/getById'](id);
    console.log(this.patients);
    this.isCreateForm = false;
    this.modalTitle = 'Редактировать пациента';

    this.modalVisible = true;
  }

  create(): void {
    this.patient = {
      human: {
        id: undefined,
        name: '',
        surname: '',
        patronymic: '',
        gender: '',
        dateBirth: '',
        addressRegistration: '',
        addressResidential: '',
        contact: {
          email: '',
          phone: '',
        },
        insuranceCompanyToHuman: [],
      },
      anthropometryData: [],
      mkbToPatient: [],
    };
    this.isCreateForm = true;
    this.modalTitle = 'Создать пациента';

    this.modalVisible = true;
  }

  delete(id: number): void {
    this.$store.dispatch('patients/delete', id);
  }

  filterHandler(value: string, row: any, column: any) {
    const property = column['property'];
    console.log(row[property]);
    return row[property] === value;
  }

  close(): void {
    this.modalVisible = false;
  }

  // // Declared as computed property getter
  // get fullName() {
  //   return this.firstName + ' ' + this.lastName;
  // }
  //
  // // Declared as computed property setter
  // set name(value: IPatient) {
  //   retuvalue.human.name = this.lastName = splitted[1] || '';
  // }
}
</script>
