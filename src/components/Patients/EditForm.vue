<template>
  <el-form ref="form" :model="edit" label-width="120px">
    <el-form-item label="Activity name">
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
      <el-input v-model="edit.human.contactEmail"></el-input>
      <el-input v-model="edit.human.contactPhone"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button @click="close">Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

@Options({
  props: ['item'],
})
export default class EditForm extends Vue {
  item!: string;

  edit = this.item;

  onSubmit(): void {
    this.$store.dispatch('patients/edit', this.edit);
  }

  close(): void {
    this.$emit('close');
  }
}
</script>
