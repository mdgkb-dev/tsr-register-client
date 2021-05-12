<template>
  <div class="form-under-collapse">
    <el-form-item>
      <el-button @click="addInsurance">Добавить страховку</el-button>
    </el-form-item>
    <el-form-item v-for="(item, index) in insuranceCompanies" :key="index" v-model="insuranceCompanies" label="Компания / Номер">
      <el-form-item>
        <el-row>
          <el-col :span="8" style="margin-right: 10px">
            <el-select placeholder="Выберите компанию" v-model="insuranceCompanies[index].insuranceCompanyId">
              <el-option v-for="item in inInsuranceCompaniesOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </el-col>
          <el-col :span="12">
            <el-input label="Введите номер страховки" v-model="insuranceCompanies[index].number"></el-input>
          </el-col>
          <el-col :span="3" style="margin-left: 10px">
            <el-button @click.prevent="removeInsurance(item)" round>Удалить страховку</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form-item>
  </div>
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
