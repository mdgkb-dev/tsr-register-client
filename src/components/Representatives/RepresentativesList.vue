<template>
  <div>
    <el-button-group>
      <el-button
        type="primary"
        icon="el-icon-document"
        @click="modalCreate = true"
        >Создать представителя</el-button
      >
    </el-button-group>

    <el-table :data="representatives" style="width: 100%">
      <el-table-column type="expand">
        <template #default="props">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>Представляет</span>
              </div>
            </template>
            <div
              v-for="item in props.row.representativeToPatient"
              :key="item.patient.human"
              class="text item"
            >
              {{ item.patient.human }}
            </div>
          </el-card>
        </template>
      </el-table-column>
       <el-table-column prop="human.surname" label="Фамилия" width="150" />
      <el-table-column prop="human.name" label="Имя" width="150" />
      <el-table-column prop="human.patronymic" label="Отчество" width="150" />
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
      <el-table-column prop="contact.phone" label="Телефон" width="150" />
      <el-table-column prop="contact.email" label="Эл.почта" width="150" />
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

    <el-dialog title="Создать представителя" v-model="modalCreate" width="30%">
      <CreateForm v-model="modalCreate" @close="close" />
    </el-dialog>
    <el-dialog title="Отредактировать пациента" v-model="modalEdit" width="30%">
      <EditForm :item="item" @close="close" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapState, mapActions } from 'vuex';

import IItem from '../../interfaces/representatives/IItem';

import CreateForm from './CreateForm.vue';
import EditForm from './EditForm.vue';

@Options({
  components: {
    CreateForm,
    EditForm,
  },
  computed: {
    ...mapState('representatives', ['representatives']),
  },
  methods: {
    ...mapActions({
      getAll: 'representatives/getAll',
    }),
  },
})
export default class RepresentativesList extends Vue {
  representatives!: [];

  getAll!: () => Promise<void>;

  item: IItem = {
    patient: {
      id: '',
      name: '',
      surname: '',
      dateBirth: '',
      patronymic: '',
      gender: '',
      addressRegistration: '',
      addressResidential: '',
      contact: {
        phone: '',
        email: '',
      },
    },
  };

  modalCreate = false;

  modalEdit = false;

  async mounted(): Promise<void> {
    await this.getAll();
  }

  edit(id: number): void {
    this.item = this.$store.getters['representatives/getById'](id);
    this.modalEdit = true;
  }

  delete(id: number): void {
    this.$store.dispatch('representatives/delete', id);
  }

  close(): void {
    this.modalEdit = false;
    this.modalCreate = false;
  }
}
</script>
