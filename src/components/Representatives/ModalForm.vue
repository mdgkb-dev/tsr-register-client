<template>
  <el-form ref="form" :model="editRepresentative" label-width="120px">
    <h1>{{ modalTitle }}</h1>
    <el-form-item label="Activity name">
      <el-input v-model="editRepresentative.human.name"></el-input>
      <el-input v-model="editRepresentative.human.surname"></el-input>
      <el-input v-model="editRepresentative.human.patronymic"></el-input>
    </el-form-item>
    <el-form-item label="Activity zone">
      <el-select v-model="editRepresentative.human.gender" placeholder="please select your zone">
        <el-option label="Мужчина" value="male"></el-option>
        <el-option label="Женщина" value="female"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Activity time">
      <el-col :span="11">
        <el-date-picker
          type="date"
          placeholder="Pick a date"
          v-model="editRepresentative.human.dateBirth"
          style="width: 100%"
        ></el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="Адреса">
      <el-input v-model="editRepresentative.human.addressRegistration"></el-input>
      <el-input v-model="editRepresentative.human.addressResidential"></el-input>
    </el-form-item>
    <el-form-item label="Контакты">
      <el-input v-model="editRepresentative.human.contact.phone"></el-input>
      <el-input v-model="editRepresentative.human.contact.email"></el-input>
    </el-form-item>
    <el-form-item>
      <el-form-item
        v-for="(item, index) in editRepresentative.representativeToPatient"
        :key="index"
        v-model="editRepresentative.representativeToPatient"
      >
        <el-select
          placeholder="Выберите пациента"
          v-model="editRepresentative.representativeToPatient[index].patientId"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="Number(item.value)"
          >
          </el-option>
        </el-select>
        <el-select
          placeholder="Выберите роль представителя"
          v-model="editRepresentative.representativeToPatient[index].type"
        >
          <el-option
            v-for="item in types"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button @click.prevent="remove(item)">Удалить пациента</el-button>
      </el-form-item>

      <el-form-item>
        <el-button @click="add">Добавить пациента</el-button>
      </el-form-item>

      <el-button type="primary" @click="onSubmit">Сохранить</el-button>
      <el-button @click="close">Отмена</el-button>
    </el-form-item>

    <el-form-item
      v-for="document in documents"
      :key="document"
      v-model="editRepresentative.representativeToPatient"
    >
      <h3>{{ document.name }}</h3>

      <el-form-item v-for="field in document.documentFields" :key="field">
        <span>{{ field.name }}</span>
        <div v-if="field.type === `string`">
          <el-input
            label="field.name"
            v-model="editRepresentative.human.documentFieldToHuman[0].valueString"
          ></el-input>
        </div>
        <div v-else-if="field.type === `number`">
          <el-input-number
            label="field.name"
            v-model="editRepresentative.human.documentFieldToHuman[0].valueNumber"
          ></el-input-number>
        </div>
      </el-form-item>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapGetters, mapActions } from 'vuex';

import IDocument from '@/interfaces/documents/IDocument';
import IPatient from '../../interfaces/patients/IPatient';
import IRepresentetive from '../../interfaces/representatives/IRepresentative';

@Options({
  props: ['representative', 'is-create-form', 'modal-title'],
  computed: {
    ...mapGetters('patients', ['patients']),
    ...mapGetters('documents', ['documents']),
  },
  methods: {
    ...mapActions({
      patientsGetAll: 'patients/getAll',
      patientsCreate: 'patients/create',
      documentsGetAll: 'documents/getAll',
    }),
  },
})
export default class ModalForm extends Vue {
  representative!: IRepresentetive;

  isCreateForm!: boolean;

  patients!: IPatient[];

  documents!: IDocument[];

  patientsGetAll!: () => Promise<void>;

  documentsGetAll!: () => Promise<void>;

  editRepresentative = this.representative;

  options = [{}];

  types = [
    { label: 'Отец', value: 'отец' },
    { label: 'Мать', value: 'мать' },
  ];

  async mounted(): Promise<void> {
    await this.patientsGetAll();
    this.options.splice(0, 1);
    for (const item of this.patients) {
      this.options.push({
        label: `${item.human.surname} ${item.human.name} ${item.human.patronymic}`,
        value: item.id,
        human: item.human,
      });
    }

    await this.documentsGetAll();
    for (const document of this.documents) {
      for (const field of document.documentFields!) {
        this.representative.human.documentFieldToHuman!.push({
          documentFieldId: field.id!,
          valueString: '',
          valueNumber: undefined,
        });
      }
    }
  }

  onSubmit(): void {
    for (const item of this.editRepresentative.representativeToPatient) {
      item.patient = undefined;
    }
    if (this.isCreateForm) {
      this.$store.dispatch('representatives/create', this.editRepresentative);
    } else {
      this.$store.dispatch('representatives/edit', this.editRepresentative);
    }

    this.$emit('close');
  }

  beforeUpdate(): void {
    this.editRepresentative = this.representative;
  }

  close(): void {
    this.$emit('close');
  }

  add(): void {
    this.editRepresentative.representativeToPatient.push({
      id: undefined,
      type: '',
      patientId: undefined,
    });
  }

  remove(item: any): void {
    const index = this.editRepresentative.representativeToPatient.indexOf(item);
    if (index !== -1) {
      this.editRepresentative.representativeToPatient.splice(index, 1);
    }
  }
}
</script>
