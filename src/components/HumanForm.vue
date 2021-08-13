<template>
  <div class="form-under-collapse">
    <el-form-item label="Фамилия" prop="human.surname">
      <el-input v-model="human.surname" :readonly="readonly"></el-input>
    </el-form-item>
    <el-form-item label="Имя" prop="human.name">
      <el-input v-model="human.name" :readonly="readonly"></el-input>
    </el-form-item>
    <el-form-item label="Отчество" prop="human.patronymic">
      <el-input v-model="human.patronymic" :readonly="readonly"></el-input>
    </el-form-item>
    <el-form-item label="Пол" prop="human.isMale">
      <el-select v-model="human.isMale" :disabled="readonly" placeholder="Выберите пол">
        <el-option label="Мужчина" :value="true"></el-option>
        <el-option label="Женщина" :value="false"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Дата рождения" prop="human.dateBirth">
      <el-date-picker
        v-model="human.dateBirth"
        :readonly="readonly"
        type="date"
        format="DD.MM.YYYY"
        placeholder="Выберите дату"
      ></el-date-picker>
    </el-form-item>
    <el-form-item label="Адрес регистрации" prop="human.addressRegistration">
      <el-input v-model="human.addressRegistration" :readonly="readonly"></el-input>
    </el-form-item>
    <el-form-item label="Адрес проживания" prop="human.addressResidential">
      <el-input v-model="human.addressResidential" :readonly="readonly"></el-input>
    </el-form-item>
    <el-form-item label="Телефон" prop="human.contact.phone">
      <el-input v-model="human.contact.phone" :readonly="readonly" @input="human.contact.formatPhoneNumber()"></el-input>
    </el-form-item>
    <el-form-item label="Email" prop="human.contact.email">
      <el-input v-model="human.contact.email" :readonly="readonly"></el-input>
    </el-form-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import IHuman from '@/interfaces/humans/IHuman';

export default defineComponent({
  name: 'HumanForm',
  props: {
    human: {
      type: Object as PropType<IHuman>,
      required: true,
    },
    readonly: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  },
});
</script>
