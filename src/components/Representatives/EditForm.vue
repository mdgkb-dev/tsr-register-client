<template>
  <el-form ref="form" :model="edit" label-width="120px">
    <el-form-item label="Activity name">
      <el-input v-model="edit.human.id"></el-input>
      <el-input v-model="edit.human.name"></el-input>
      <el-input v-model="edit.human.surname"></el-input>
      <el-input v-model="edit.human.patronymic"></el-input>
    </el-form-item>
    <el-form-item label="Activity zone">
      <el-select
        v-model="edit.human.gender"
        placeholder="please select your zone"
      >
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
      <el-input v-model="edit.contact.phone"></el-input>
      <el-input v-model="edit.contact.email"></el-input>
    </el-form-item>
    <el-form-item>
      <el-form-item
        v-for="item in edit.representativeToPatient"
        :key="item.patient.id"
        v-model="edit.representativeToPatient"
      >
        <el-cascader
          placeholder="Выберите пациента"
          :options="options"
          filterable
          v-model="item.patient.id"
        ></el-cascader>
        <el-cascader
          placeholder="Выберите роль представителя"
          :options="types"
          v-model="item.type"
        ></el-cascader>
        ><el-button @click.prevent="remove(item)">Удалить пациента</el-button>
      </el-form-item>

      <el-form-item>
        <el-button @click="add">Добавить пациента</el-button>
      </el-form-item>

      <el-button type="primary" @click="onSubmit"
        >Сохранить изменения</el-button
      >
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
  props: ['item'],
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
export default class EditForm extends Vue {
  item!: IRepresentetive;

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

      item.human = {
        id: '',
        name: '',
        surname: '',
        patronymic: '',
        gender: '',
        dateBirth: '',
        addressRegistration: '',
        addressResidential: '',
        contact: {
          phone: '',
          email: '',
        },
        documentFields: [],
      };
    }
  }

  onSubmit(): void {
    for (const item of this.edit.representativeToPatient) {
      item.patient.id = item.patient.id as any;
      item.type = item.type as any;
    }

    this.$store.dispatch('patients/edit', this.edit);
    this.$emit('close');
  }

  close(): void {
    this.$emit('close');
  }

  add(): void {
    this.edit.representativeToPatient.push({
      id: '',
      type: '',
      patient: { id: '' },
    });
  }
}
</script>
