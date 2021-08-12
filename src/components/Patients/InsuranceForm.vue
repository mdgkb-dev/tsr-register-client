<template>
  <div class="table-under-collapse">
    <el-button style="margin-bottom: 20px" @click="addInsurance">Добавить страховку</el-button>

    <el-table :data="insuranceCompanies" style="width: 710px" class="table-shadow" header-row-class-name="header-style">
      <el-table-column type="index" width="60" align="center" />

      <el-table-column label="Компания" width="300" align="center" sortable>
        <template #default="scope">
          <el-form-item
            :prop="'human.insuranceCompanyToHuman.' + scope.$index + '.insuranceCompanyId'"
            :rules="[{ required: true, message: 'Пожалуйста, выберите страховую компанию' }]"
            label-width="0"
            style="margin-bottom: 0"
          >
            <el-select v-model="insuranceCompanies[scope.$index].insuranceCompanyId" placeholder="Выберите компанию">
              <el-option v-for="item in inInsuranceCompaniesOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </el-form-item>
        </template>
      </el-table-column>

      <el-table-column label="Номер страховки" width="300" align="center">
        <template #default="scope">
          <el-form-item
            :prop="'human.insuranceCompanyToHuman.' + scope.$index + '.number'"
            :rules="[{ required: true, message: 'Пожалуйста, заполните номер страховки', trigger: 'blur' }]"
            style="margin-bottom: 0"
            label-width="0"
          >
            <el-input v-model.lazy="insuranceCompanies[scope.$index].number" label="Введите номер страховки"></el-input>
          </el-form-item>
        </template>
      </el-table-column>

      <el-table-column width="40" fixed="right" align="center">
        <template #default="scope">
          <TableButtonGroup :show-remove-button="true" @remove="removeInsurance(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import TableButtonGroup from '@/components/TableButtonGroup.vue';
import IInsuranceCompanyToHuman from '@/interfaces/insuranceCompanies/IInsuranceCompanyToHuman';
import IOption from '@/interfaces/patients/IOption';

@Options({
  name: 'InsuranceForm',
  props: ['inInsuranceCompanyToHuman', 'inInsuranceCompaniesOptions'],
  components: {
    TableButtonGroup,
  },
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
