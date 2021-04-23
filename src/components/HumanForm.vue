<template>
  <h3>Личная информация</h3>
  <el-form-item label="Фамилия" label-width="20vw" prop="human.surname">
    <el-input v-model="editHuman.surname"></el-input>
  </el-form-item>
  <el-form-item label="Имя" label-width="20vw">
    <el-input v-model="editHuman.name"></el-input>
  </el-form-item>
  <el-form-item label="Отчество" label-width="20vw">
    <el-input v-model="editHuman.patronymic"></el-input>
  </el-form-item>
  <el-form-item label="Пол" label-width="20vw">
    <el-select v-model="editHuman.gender" placeholder="Выберите пол">
      <el-option label="Мужчина" value="male"></el-option>
      <el-option label="Женщина" value="female"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="Дата рождения" label-width="20vw">
    <el-date-picker
      type="date"
      placeholder="Выберете дату"
      v-model="editHuman.dateBirth"
    ></el-date-picker>
  </el-form-item>
  <el-form-item label="Адрес регистрации" label-width="20vw">
    <el-input v-model="editHuman.addressRegistration"></el-input>
  </el-form-item>
  <el-form-item label="Адрес проживания" label-width="20vw">
    <el-input v-model="editHuman.addressResidential"></el-input>
  </el-form-item>
  <el-form-item label="Телефон" label-width="20vw">
    <el-input v-model="editHuman.contact.phone"></el-input>
  </el-form-item>
  <el-form-item label="Email" label-width="20vw">
    <el-input v-model="editHuman.contact.email"></el-input>
  </el-form-item>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

import IHuman from '@/interfaces/humans/IHuman';

@Options({
  props: ['human'],
})
export default class HumanForm extends Vue {
  // Types.
  human!: IHuman;

  // Local state.
  editHuman = this.human;
}
</script>
