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

      <el-table-column prop="human.addressRegistration" label="Адрес регистрации" width="150" />
      <el-table-column prop="human.contact.phone" label="Телефон" width="150" />
      <el-table-column prop="human.contact.email" label="Эл.почта" width="150" />
      <el-table-column width="150" label="Привязанные дети">
        <template #default="scope">
          <div v-for="rep in scope.row.representativeToPatient">
            <el-tooltip
              class="item"
              effect="dark"
              :content="
                `${rep.patient.human.surname} ${rep.patient.human.name} ${rep.patient.human.patronymic}`
              "
              placement="top-end"
            >
              <el-tag size="small">{{ children(rep) }}</el-tag>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="" width="120">
        <template #default="scope">
          <el-button @click="this.edit(scope.row.id)" type="text" size="small"
            >Редактировать</el-button
          >
          <el-button @click="this.delete(scope.row.id)" type="text" size="small">Удалить</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="modalVisible" width="80%" :close-on-click-modal="false">
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
import IHuman from '@/interfaces/humans/IHuman';
import IPatient from '@/interfaces/patients/IPatient';
import IRepresetnationType from '@/interfaces/representatives/IRepresetnationType';

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
      documentFieldToHuman: [],
      insuranceCompanyToHuman: [],
      documentScans: [],
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
        documentFieldToHuman: [],
        documentScans: [],
        insuranceCompanyToHuman: [],
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

  get fullName() {
    return (human: IHuman) => `${human.surname} ${human.name} ${human.patronymic}`;
  }

  get gender() {
    return (human: IHuman) => (human.gender === 'male' ? 'М' : 'Ж');
  }

  get children() {
    return (representative: IRepresetnationType) =>
      representative.patient!.human.gender === 'male' ? 'Сын' : 'Дочь';
  }
}
</script>
