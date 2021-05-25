<template>
  <div class="form-under-collapse">
    <el-form-item label="Фамилия" prop="human.surname">
      <el-input v-model="editHuman.surname"></el-input>
    </el-form-item>
    <el-form-item label="Имя" prop="human.name">
      <el-input v-model="editHuman.name"></el-input>
    </el-form-item>
    <el-form-item label="Отчество" prop="human.patronymic">
      <el-input v-model="editHuman.patronymic"></el-input>
    </el-form-item>
    <el-form-item label="Пол" prop="human.isMale">
      <el-select v-model="editHuman.isMale" placeholder="Выберите пол">
        <el-option label="Мужчина" :value="true"></el-option>
        <el-option label="Женщина" :value="false"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Дата рождения" prop="human.dateBirth">
      <el-date-picker type="date" format="DD.MM.YYYY" placeholder="Выберите дату" v-model="editHuman.dateBirth"></el-date-picker>
    </el-form-item>
    <el-form-item label="Адрес регистрации" prop="human.addressRegistration">
      <el-input v-model="editHuman.addressRegistration"></el-input>
    </el-form-item>
    <el-form-item label="Адрес проживания" prop="human.addressResidential">
      <el-input v-model="editHuman.addressResidential"></el-input>
    </el-form-item>
    <el-form-item label="Телефон" prop="human.contact.phone">
      <el-input v-model="editHuman.contact.phone" @input="editHuman.contact.formatPhoneNumber()"></el-input>
    </el-form-item>
    <el-form-item label="Email" prop="human.contact.email">
      <el-input v-model="editHuman.contact.email"></el-input>
    </el-form-item>
  </div>
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
