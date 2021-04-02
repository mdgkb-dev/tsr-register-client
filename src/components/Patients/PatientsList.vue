<template>
  <div style="width: 100%">
    <el-button-group>
      <el-button
        type="primary"
        icon="el-icon-document"
        @click="modalCreate = true"
        >Создать пациента</el-button
      >
    </el-button-group>

    <el-table
      :default-sort="{ prop: 'id', order: 'ascending' }"
      :data="patients"
      style="width: 100%"
    >
      <el-table-column prop="id" label="№" width="150" />
      <el-table-column prop="human.name" label="Имя" width="150" />
      <el-table-column prop="human.surname" label="Фамилия" width="150" />
      <el-table-column prop="human.patronymic" label="Отчество" width="150" />
      <el-table-column
        prop="human.dateBirth"
        label="Дата рождения"
        width="150"
      />
      <el-table-column prop="human.gender" label="Пол" width="150" />
      <el-table-column
        prop="human.addressRegistration"
        label="Адрес регистрации"
        width="150"
      />
      <el-table-column
        prop="human.addressResidential"
        label="Адрес проживания"
        width="150"
      />
      <el-table-column prop="human.contact.phone" label="Телефон" width="150" />
      <el-table-column
        prop="human.contact.email"
        label="Эл.почта"
        width="150"
      />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
          <el-button @click="this.edit(scope.row.id)" type="text" size="small"
            >Редактировать</el-button
          >
          <el-button @click="this.delete(scope.row.id)" type="text" size="small"
            >Удалить</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="Создать Пациента" v-model="modalCreate" width="30%">
      <CreateForm v-model="modalCreate" @close="close" />
    </el-dialog>
    <el-dialog title="Отредактировать пациента" v-model="modalEdit" width="30%">
      <EditForm :item="patient" @close="close" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapState, mapActions } from 'vuex';

import IPatient from '../../interfaces/patients/IPatient';

import CreateForm from './CreateForm.vue';
import EditForm from './EditForm.vue';

@Options({
  components: {
    CreateForm,
    EditForm,
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

  patient = {};

  modalCreate = false;

  modalEdit = false;

  async mounted(): Promise<void> {
    await this.getAll();
  }

  edit(id: number): void {
    this.patient = this.$store.getters['patients/getById'](id);
    this.modalEdit = true;
  }

  delete(id: number): void {
    this.$store.dispatch('patients/delete', id);
  }

  close(): void {
    this.modalEdit = false;
    this.modalCreate = false;
  }
}
</script>
