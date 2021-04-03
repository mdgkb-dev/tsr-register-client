<template>
  <div style="width: 100%">
    <el-button-group>
      <el-button type="primary" icon="el-icon-document" @click="this.create"
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
      <el-table-column prop="human.addressRegistration" label="Адрес регистрации" width="150" />
      <el-table-column prop="human.addressResidential" label="Адрес проживания" width="150" />
      <el-table-column prop="contact.phone" label="Телефон" width="150" />
      <el-table-column prop="contact.email" label="Эл.почта" width="150" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
          <el-button @click="this.edit(scope.row.id)" type="text" size="small"
            >Редактировать</el-button
          >
          <el-button @click="this.delete(scope.row.id)" type="text" size="small">Удалить</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="modalVisible" width="50%">
      <ModalForm
        :representative="representative"
        :is-create-form="isCreateForm"
        :modal-title="modalTitle"
        @close="close"
      />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapState, mapActions } from 'vuex';

import IRepresentative from '@/interfaces/representatives/IRepresentative';
import ModalForm from './ModalForm.vue';

@Options({
  components: {
    ModalForm,
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

  representative: IRepresentative = {
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
    },
    representativeToPatient: [],
  };

  isCreateForm = false;

  modalVisible = false;

  modalTitle = '';

  async mounted(): Promise<void> {
    await this.getAll();
  }

  edit(id: number): void {
    this.representative = this.$store.getters['representatives/getById'](id);
    this.isCreateForm = false;
    this.modalTitle = 'Редактировать представителя';
    this.modalVisible = true;
  }

  create(): void {
    this.representative = {
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
      },
      representativeToPatient: [],
    };
    this.isCreateForm = true;
    this.modalVisible = true;
    this.modalTitle = 'Создать представителя';
  }

  delete(id: number): void {
    this.$store.dispatch('representatives/delete', id);
  }

  close(): void {
    this.modalVisible = false;
  }
}
</script>
