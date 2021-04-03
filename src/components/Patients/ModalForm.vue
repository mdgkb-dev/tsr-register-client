<template>
  <el-form ref="form" :model="editPatient" label-width="120px">
    <h1>{{ modalTitle }}</h1>
    <el-form-item label="Activity name">
      <el-input v-model="editPatient.human.name"></el-input>
      <el-input v-model="editPatient.human.surname"></el-input>
      <el-input v-model="editPatient.human.patronymic"></el-input>
    </el-form-item>
    <el-form-item label="Activity zone">
      <el-select v-model="editPatient.human.gender" placeholder="please select your zone">
        <el-option label="Мужчина" value="male"></el-option>
        <el-option label="Женщина" value="female"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Activity time">
      <el-col :span="11">
        <el-date-picker
          type="date"
          placeholder="Pick a date"
          v-model="editPatient.human.dateBirth"
          style="width: 100%"
        ></el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="Адреса">
      <el-input v-model="editPatient.human.addressRegistration"></el-input>
      <el-input v-model="editPatient.human.addressResidential"></el-input>
    </el-form-item>
    <el-form-item label="Контакты">
      <el-input v-model="editPatient.human.contact.email"></el-input>
      <el-input v-model="editPatient.human.contact.phone"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Сохранить</el-button>
      <el-button @click="close">Отмена</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import IPatient from '@/interfaces/patients/IPatient';

@Options({
  props: ['patient', 'is-create-form', 'modalTitle'],
})
export default class ModalForm extends Vue {
  patient!: IPatient;

  isCreateForm!: boolean;

  editPatient = this.patient;

  onSubmit(): void {
    if (this.isCreateForm) {
      this.$store.dispatch('patients/create', this.editPatient);
    } else {
      this.$store.dispatch('patients/edit', this.editPatient);
    }
    this.$emit('close');
  }

  close(): void {
    this.$emit('close');
  }

  beforeUpdate(): void {
    this.editPatient = this.patient;
  }
}
</script>
