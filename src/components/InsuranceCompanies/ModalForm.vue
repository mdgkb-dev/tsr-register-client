<template>
  <el-form ref="form" :model="editInsuranceCompany" @submit.prevent="submitForm">
    <h1>{{ modalTitle }}</h1>
    <el-form-item label="Название компании" label-width="20vw">
      <el-input
        v-model="v$.editInsuranceCompany.name.$model"
        :class="{ 'wrong-input': v$.editInsuranceCompany.name.$errors.length > 0 }"
      ></el-input>
      <div
        :class="['error-message']"
        v-for="(error, insuranceIndex) of v$.editInsuranceCompany.name.$errors"
        :key="insuranceIndex"
      >
        {{ error.$message }}
      </div>
    </el-form-item>
    <div class="center-align">
      <el-button
        type="primary"
        :disabled="
          (isCreateForm && (!v$.$dirty || (v$.$dirty && v$.$errors.length > 0))) ||
          (!isCreateForm && v$.$errors.length > 0)
        "
        >Сохранить</el-button
      >
      <el-button @click="close">Отмена</el-button>
    </div>
  </el-form>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

import IInsuranceCompany from '@/interfaces/insuranceCompanies/IInsuranceCompany';

@Options({
  props: ['insurance', 'is-create-form', 'modal-title'],
  validations: {
    editInsuranceCompany: {
      name: {
        required: helpers.withMessage('Пожалуйста, введине название компании.', required),
      },
    },
  },
})
export default class ModalForm extends Vue {
  insurance!: IInsuranceCompany;

  isCreateForm!: boolean;

  editInsuranceCompany = this.insurance;

  v$ = useVuelidate();

  submitForm(): void {
    if (this.isCreateForm) {
      this.$store.dispatch('insuranceCompanies/create', this.editInsuranceCompany);
    } else {
      this.$store.dispatch('insuranceCompanies/edit', this.editInsuranceCompany);
    }
    this.$emit('close');
  }

  close(): void {
    this.$emit('close');
  }

  beforeUpdate(): void {
    this.editInsuranceCompany = this.insurance;
  }
}
</script>
