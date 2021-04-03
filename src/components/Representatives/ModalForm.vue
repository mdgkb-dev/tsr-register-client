<template>
  <el-form ref="form" :model="edit" label-width="120px">
    <h1>{{ modalTitle }}</h1>
    <el-form-item label="Activity name">
      <el-input v-model="edit.human.name"></el-input>
      <el-input v-model="edit.human.surname"></el-input>
      <el-input v-model="edit.human.patronymic"></el-input>
    </el-form-item>
    <el-form-item label="Activity zone">
      <el-select v-model="edit.human.gender" placeholder="please select your zone">
        <el-option label="Мужчина" value="male"></el-option>
        <el-option label="Женщина" value="female"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Activity time">
      <el-col :span="11">
        <el-date-picker
          type="date"
          placeholder="Pick a date"
          v-model="edit.human.dateBirth"
          style="width: 100%"
        ></el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="Адреса">
      <el-input v-model="edit.human.addressRegistration"></el-input>
      <el-input v-model="edit.human.addressResidential"></el-input>
    </el-form-item>
    <el-form-item label="Контакты">
      <el-input v-model="edit.human.contact.phone"></el-input>
      <el-input v-model="edit.human.contact.email"></el-input>
    </el-form-item>
    <el-form-item>
      <el-form-item
        v-for="(item, index) in edit.representativeToPatient"
        :key="index"
        v-model="edit.representativeToPatient"
      >
        <el-select
          placeholder="Выберите пациента"
          v-model="edit.representativeToPatient[index].patientId"
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
          v-model="edit.representativeToPatient[index].type"
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
  </el-form>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapGetters, mapActions } from 'vuex';

import IPatient from '../../interfaces/patients/IPatient';
import IRepresentetive from '../../interfaces/representatives/IRepresentative';

@Options({
  props: ['item', 'is-create-form', 'modal-title'],
  computed: {
    ...mapGetters('patients', ['patients']),
  },
  methods: {
    ...mapActions({
      patientsGetAll: 'patients/getAll',
      patientsCreate: 'patients/create',
    }),
  },
})
export default class ModalForm extends Vue {
  item!: IRepresentetive;

  isCreateForm!: boolean;

  patients!: IPatient[];

  patientsGetAll!: () => Promise<void>;

  edit = this.item;

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
  }

  onSubmit(): void {
    for (const item of this.edit.representativeToPatient) {
      item.patient = undefined;
    }
    if (this.isCreateForm) {
      this.$store.dispatch('representatives/create', this.edit);
    } else {
      this.$store.dispatch('representatives/edit', this.edit);
    }

    this.$emit('close');
  }

  beforeUpdate(): void {
    this.edit = this.item;
  }

  close(): void {
    this.$emit('close');
  }

  add(): void {
    this.edit.representativeToPatient.push({
      id: undefined,
      type: '',
      patientId: undefined,
    });
  }

  remove(item: any): void {
    const index = this.edit.representativeToPatient.indexOf(item);
    if (index !== -1) {
      this.edit.representativeToPatient.splice(index, 1);
    }
  }
}
</script>
