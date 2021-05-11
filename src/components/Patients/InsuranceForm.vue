<template>
  <el-form-item label-width="20vw">
    <el-button @click="addInsurance">Добавить страховку</el-button>
  </el-form-item>
  {{ insuranceCompanies }}
  <el-form-item v-for="(item, index) in insuranceCompanies" :key="index" v-model="insuranceCompanies">
    <el-form-item label="Компания" label-width="12vw">
      <el-select placeholder="Выберите компанию" v-model="insuranceCompanies[index].insuranceCompanyId">
        <el-option v-for="item in inInsuranceCompaniesOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Номер" label-width="12vw">
      <el-input label="Введите номер страховки" v-model="insuranceCompanies[index].number"></el-input>
    </el-form-item>

    <el-form-item label-width="12vw">
      <el-button @click.prevent="removeInsurance(item)">Удалить страховку</el-button>
    </el-form-item>
  </el-form-item>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

import IInsuranceCompanyToHuman from '@/interfaces/insuranceCompanies/IInsuranceCompanyToHuman';
import IOption from '@/interfaces/patients/IOption';

@Options({
  props: ['in-insurance-company-to-human', 'in-insurance-companies-options'],
})
export default class InsuranceForm extends Vue {
  // Types.
  inInsuranceCompanyToHuman!: IInsuranceCompanyToHuman[];

  inInsuranceCompaniesOptions!: IOption[];

  // Local state.
  insuranceCompanies = this.inInsuranceCompanyToHuman;

  addInsurance(): void {
    this.insuranceCompanies.push({
      number: '',
      insuranceCompanyId: undefined,
      humanId: undefined,
    });
  }

  removeInsurance(item: any): void {
    const index = this.insuranceCompanies.indexOf(item);
    if (index !== -1) {
      this.insuranceCompanies.splice(index, 1);
    }
  }
}
</script>
