<template>
  <el-button @click="addDiagnosis">Добавить диагноз</el-button>
  <div class="form-under-collapse">
    <el-row style="font-weight: bold">
      <el-col :span="6"><el-form-item>Основной диагноз</el-form-item></el-col>
      <el-col :span="6"><el-form-item>Уточнённый диагноз</el-form-item></el-col>
      <el-col :span="6"><el-form-item>Первичность</el-form-item></el-col>
      <el-col :span="6"><el-form-item></el-form-item></el-col>
    </el-row>
    <div v-for="(item, index) in patientDiagnosis" :key="index">
      <el-row>
        <el-col :span="6">
          <el-form-item>
            <el-autocomplete :fetch-suggestions="findDiagnosis" v-model="queryStrings[index]" placeholder="Выберите диагноз" @select="handleSelect($event, index)" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-select v-if="patientDiagnosis[index].mkbDiagnosisId" v-model="patientDiagnosis[index].mkbSubDiagnosisId" placeholder="Select">
              <el-option v-for="i in mkbSubDiagnosisOption" :key="i.value" :label="i.label" :value="i.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-checkbox v-model="patientDiagnosis[index].primary">Первичный</el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button @click.prevent="removeDiagnosis(item)">Удалить диагноз</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

import { mapActions, mapGetters } from 'vuex';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import ISearch from '@/interfaces/shared/ISearch';
import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';
import PatientDiagnosis from '@/classes/patients/PatientDiagnosis';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';
import IOption from '@/interfaces/shared/IOption';

@Options({
  props: ['in-patient-diagnosis'],
  computed: {
    ...mapGetters('mkb', ['mkbDiagnosis', 'mkbSubDiagnosis']),
  },
  methods: {
    ...mapActions({
      searchDiagnosis: 'mkb/searchDiagnosis',
      searchSubDiagnosis: 'mkb/searchSubDiagnosis',
    }),
  },
})
export default class MkbForm extends Vue {
  // Types.
  queryStrings = [];
  mkbDiagnosis!: IMkbDiagnosis[];
  mkbSubDiagnosis!: IMkbSubDiagnosis[];
  inPatientDiagnosis!: IPatientDiagnosis[];

  searchDiagnosis!: (query: string) => Promise<void>;
  searchSubDiagnosis!: (diagnosisId: string) => Promise<void>;

  diagnosis: ISearch[] = [];
  mkbSubDiagnosisOption: IOption[] = [];
  // Local state.
  patientDiagnosis = this.inPatientDiagnosis;

  addDiagnosis(): void {
    this.patientDiagnosis.push(new PatientDiagnosis());
    this.queryStrings.push();
  }

  async findDiagnosis(query: string, resolve: any) {
    if (query.length > 2) {
      await this.searchDiagnosis(query);
      this.diagnosis = [];
      this.mkbDiagnosis.forEach((d: IMkbDiagnosis) => {
        if (d.id) {
          this.diagnosis.push({ value: d.getFullName(), id: d.id });
        }
      });
      resolve(this.diagnosis);
    }
  }

  async findSubDiagnosis(diagnosisId: string) {
    await this.searchSubDiagnosis(diagnosisId);
    this.mkbSubDiagnosisOption = [];
    this.mkbSubDiagnosis.forEach((d: IMkbSubDiagnosis) => {
      if (d.id) {
        this.mkbSubDiagnosisOption.push({ label: d.getFullName(), value: d.id });
      }
    });
  }

  async handleSelect(item: ISearch, index: number) {
    this.patientDiagnosis[index].mkbDiagnosisId = item.id;
    console.log('item.id', item.id);
    await this.findSubDiagnosis(item.id);
  }

  removeDiagnosis(item: any): void {
    const index = this.patientDiagnosis.indexOf(item);
    if (index !== -1) {
      this.patientDiagnosis.splice(index, 1);
      this.queryStrings.splice(index, 1);
    }
  }
}
</script>
