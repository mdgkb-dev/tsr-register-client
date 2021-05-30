<template>
  <div class="form-under-collapse">
    <el-button @click="addInsurance" style="margin-bottom: 20px">Добавить страховку</el-button>

    <el-table :data="insuranceCompanies" style="width: 100%">
      <el-table-column type="index" width="50" />
      <el-table-column label="Компания" width="250" sortable>
        <template #default="scope">
          <el-form-item
            :prop="'human.insuranceCompanyToHuman.' + scope.$index + '.insuranceCompanyId'"
            :rules="[{ required: true, message: 'Пожалуйста, выберете страховую компанию' }]"
            label-width="0"
            style="margin-bottom: 0"
          >
            <el-select placeholder="Выберите компанию" v-model="insuranceCompanies[scope.$index].insuranceCompanyId">
              <el-option v-for="item in inInsuranceCompaniesOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="Номер страховки">
        <template #default="scope">
          <el-form-item
            :prop="'human.insuranceCompanyToHuman.' + scope.$index + '.number'"
            :rules="[{ required: true, message: 'Пожалуйста, заполните номер страховки', trigger: 'blur' }]"
            style="margin-bottom: 0"
            label-width="0"
          >
            <el-input label="Введите номер страховки" v-model.lazy="insuranceCompanies[scope.$index].number"></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column>
        <template #default="scope">
          <el-button @click.prevent="removeInsurance(scope.row)" round>Удалить страховку</el-button>
        </template>
      </el-table-column>
    </el-table>
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
      insuranceCompanyId: '',
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
<style>
.el-form-item__content {
  margin-left: 0;
}
</style>
