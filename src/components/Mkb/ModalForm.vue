<template>
  <h1>{{ modalTitle }}</h1>
  <el-form ref="form" :model="mkb" label-width="150px">
    <h3>Комментарии</h3>
    <el-form-item label="Комментарий к классу">
      <el-input v-model="mkb.classComment"></el-input>
    </el-form-item>
    <el-form-item label="Комментарий к группе">
      <el-input v-model="mkb.groupComment"></el-input>
    </el-form-item>
    <el-form-item label="Комментарий к подгруппе">
      <el-input v-model="mkb.subGroupComment"></el-input>
    </el-form-item>
    <el-form-item label="Комментарий к подподгруппе">
      <el-input v-model="mkb.subSubGroupComment"></el-input>
    </el-form-item>
    <el-form-item label="Комментарий к диагнозу">
      <el-input v-model="mkb.diagnosisComment"></el-input>
    </el-form-item>
    <el-form-item label="Комментарий к классу">
      <el-input v-model="mkb.subDiagnosisComment"></el-input>
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
import { mapActions, mapGetters } from 'vuex';
import IAnthropometry from '@/interfaces/anthropometry/IAnthropometry';
import IInsuranceCompany from '@/interfaces/insuranceCompanies/IInsuranceCompany';
import IMkb from '@/interfaces/mkb/IMkb';
import IOption from '@/interfaces/shared/IOption';

@Options({
  props: ['mkb-item', 'modalTitle'],
})
export default class ModalForm extends Vue {
  mkbItem!: IMkb;

  mkb = this.mkbItem;

  onSubmit(): void {
    this.$store.dispatch('mkb/edit', this.mkb);
    this.$emit('close');
  }

  close(): void {
    this.$emit('close');
  }

  beforeUpdate(): void {
    this.mkb = this.mkbItem;
  }
}
</script>
