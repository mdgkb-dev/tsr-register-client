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
      <el-input v-model="editHuman.contact.phone" @input="formatPhoneNumber()"></el-input>
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

  formatPhoneNumber = (): void => {
    let value = this.editHuman.contact.phone;
    if (!value) {
      this.editHuman.contact.phone = value;
    } else {
      if ((value[0] === '7' || value[0] === '8') && value.length !== 1) value = value.slice(1);
      const phoneNumber = value.replace(/\+7|[^\d]/g, '');
      const phoneNumberLength = phoneNumber.length;
      switch (true) {
        case phoneNumberLength === 0:
          this.editHuman.contact.phone = '';
          break;
        case phoneNumberLength === 1 && value.length === 1 && phoneNumber === '7':
        case phoneNumberLength === 1 && value.length === 1 && phoneNumber === '8':
          this.editHuman.contact.phone = '+7 (';
          break;
        case phoneNumberLength < 4:
          this.editHuman.contact.phone = `+7 (${phoneNumber}`;
          break;
        case phoneNumberLength < 7:
          this.editHuman.contact.phone = `+7 (${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
          break;
        case phoneNumberLength < 9:
          this.editHuman.contact.phone = `+7 (${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 8)}`;
          break;
        default:
          this.editHuman.contact.phone = `+7 (${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 8)}-${phoneNumber.slice(8, 10)}`;
          break;
      }
    }
  };
}
</script>
