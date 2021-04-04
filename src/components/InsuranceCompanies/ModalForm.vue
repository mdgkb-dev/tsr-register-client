<template>
  <el-form ref="form" :model="editInsuranceCompany" label-width="120px">
    <h1>{{ modalTitle }}</h1>
    <el-form-item label="Название документа">
      <el-input v-model="editInsuranceCompany.name"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">Создать</el-button>
      <el-button @click="close">Отмена</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

import IInsuranceCompany from '@/interfaces/insuranceCompanies/IInsuranceCompany';

@Options({
  props: ['insuranceCompany', 'is-create-form', 'modal-title'],
})
export default class ModalForm extends Vue {
  insuranceCompany!: IInsuranceCompany;

  isCreateForm!: boolean;

  editInsuranceCompany = this.insuranceCompany;

  onSubmit(): void {
    if (this.isCreateForm) {
      this.$store.dispatch('insuranceCompanies/create', this.editInsuranceCompany);
    } else {
      this.$store.dispatch('insuranceCompanies/edit', this.editInsuranceCompany);
    }
    this.$emit('close');
  }

  beforeUpdate(): void {
    this.editInsuranceCompany = this.insuranceCompany;
  }
}
</script>
