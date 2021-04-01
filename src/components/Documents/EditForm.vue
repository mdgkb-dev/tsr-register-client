<template>
  <el-form ref="form" :model="edit" label-width="120px">
    <el-form-item label="Activity name">
      <el-input v-model="edit.name"></el-input>
      <el-input v-model="edit.surname"></el-input>
      <el-input v-model="edit.patronymic"></el-input>
    </el-form-item>
    <el-form-item label="Activity zone">
      <el-select v-model="edit.gender" placeholder="please select your zone">
        <el-option label="Мужчина" value="male"></el-option>
        <el-option label="Женщина" value="female"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Activity time">
      <el-col :span="11">
        <el-date-picker
          type="date"
          placeholder="Pick a date"
          v-model="edit.dateBirth"
          style="width: 100%"
        ></el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="Адреса">
      <el-input v-model="edit.addressRegistration"></el-input>
      <el-input v-model="edit.addressResidential"></el-input>
    </el-form-item>
    <el-form-item label="Контакты">
      <el-input v-model="edit.contactEmail"></el-input>
      <el-input v-model="edit.contactPhone"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button @click="close">Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

import IHuman from '../../interfaces/humans/IHuman';

@Options({
  props: ['item'],
})
export default class EditForm extends Vue {
  item!: IHuman;

  edit: IHuman = this.item;

  onSubmit(): void {
    this.$store.dispatch('humans/edit', this.edit);
  }

  close(): void {
    this.$emit('close');
  }
}
</script>
