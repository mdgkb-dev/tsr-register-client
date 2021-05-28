<template>
  <div class="table-under-collapse">
    <el-button @click="addDiagnosis">Добавить диагноз</el-button>
    <el-button @click="addDiagnosisModal">Добавить диагноз из списка</el-button>

    <el-dialog v-if="diagnosisModalVisible" v-model="diagnosisModalVisible" width="80%">
      <el-row>
        <el-col :span="10">
          <h3>Список диагнозов</h3>
          <MkbTree
            :checkedDiagnosis="checkedDiagnosis"
            :selectable="true"
            @setDiagnosis="setDiagnosis"
            @removeDiagnosis="removeCheckedDiagnosis"
            @setSubDiagnosis="setSubDiagnosis"
          ></MkbTree>
        </el-col>
        <el-col :span="10">
          <h3>Добавленные диагнозы</h3>
          <el-table :data="checkedDiagnosis" style="width: 100%; margin-bottom: 20px">
            <el-table-column type="index" width="50" />
            <el-table-column prop="mkbDiagnosis.name" label="Основной диагноз" width="300"> </el-table-column>
            <el-table-column prop="mkbSubDiagnosis.name" label="Name" width="400"> </el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelDiagnosisFromModal">Отменить</el-button>
          <el-button type="primary" @click="addDiagnosisFromModal">Добавить диагноз</el-button>
        </span>
      </template>
    </el-dialog>

    <el-table :data="patientDiagnosis">
      <el-table-column type="index" width="50" />
      <el-table-column label="Основной диагноз" width="450" sortable>
        <template #default="scope">
          <div>{{ scope.row.mkbDiagnosis.code }} {{ scope.row.mkbDiagnosis.name }}</div>
          <!--          <el-autocomplete-->
          <!--            popper-class="wide-dropdown"-->
          <!--            :fetch-suggestions="findDiagnosis"-->
          <!--            v-model="queryStrings[scope.$index]"-->
          <!--            placeholder="Выберите диагноз"-->
          <!--            @select="handleSelect($event, scope.$index)"-->
          <!--          >-->
          <!--            <template #default="{ item }">-->
          <!--              <div class="value">{{ item.value }}</div>-->
          <!--            </template>-->
          <!--          </el-autocomplete>-->
        </template>
      </el-table-column>
      <el-table-column prop="height" label="Уточнённый диагноз" width="450">
        <template #default="scope">
          <div v-if="scope.row.mkbSubDiagnosis">{{ scope.row.mkbDiagnosis.code }}.{{ scope.row.mkbSubDiagnosis.subCode }} {{ scope.row.mkbSubDiagnosis.name }}</div>

          <!--          <el-select v-model="scope.row.mkbSubDiagnosisId" v-if="scope.row.mkbDiagnosisId" placeholder="Выберите диагноз">-->
          <!--            <el-option v-for="i in mkbSubDiagnosisOption" :key="i.value" :label="i.label" :value="i.value" />-->
          <!--          </el-select>-->
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="Первичный" width="120">
        <template #default="scope">
          <el-checkbox v-model="scope.row.primary" />
        </template>
      </el-table-column>
      <el-table-column width="120">
        <template #default="scope">
          <el-button @click="removeDiagnosis(scope.row)" type="text" size="small">Удалить</el-button>
        </template>
      </el-table-column>
    </el-table>
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
import { defineAsyncComponent } from 'vue';

const MkbTree = defineAsyncComponent(() => import('@/components/MkbTree.vue'));

@Options({
  components: {
    MkbTree,
  },
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
  diagnosisModalVisible = false;
  checkedDiagnosis: IPatientDiagnosis[] = this.inPatientDiagnosis;

  cancelDiagnosisFromModal(): void {
    this.diagnosisModalVisible = false;
  }

  addDiagnosis(): void {
    this.patientDiagnosis.push(new PatientDiagnosis());
    this.queryStrings.push();
  }

  addDiagnosisModal(): void {
    this.diagnosisModalVisible = true;
  }

  addDiagnosisFromModal(): void {
    this.diagnosisModalVisible = false;
    this.checkedDiagnosis.forEach((patientDiagnosis: IPatientDiagnosis) => {
      this.patientDiagnosis.push(patientDiagnosis);
    });
  }

  setDiagnosis(diagnosis: IMkbDiagnosis): void {
    const patientDiagnosis = new PatientDiagnosis();
    patientDiagnosis.mkbDiagnosis = diagnosis;
    patientDiagnosis.mkbDiagnosisId = diagnosis.id;
    this.checkedDiagnosis.push(patientDiagnosis);
  }

  setSubDiagnosis(subDiagnosis: IMkbSubDiagnosis, diagnosis: IMkbDiagnosis): void {
    const patientDiagnosis = new PatientDiagnosis();
    patientDiagnosis.mkbSubDiagnosis = subDiagnosis;
    patientDiagnosis.mkbSubDiagnosisId = subDiagnosis.id;

    patientDiagnosis.mkbDiagnosis = diagnosis;
    patientDiagnosis.mkbDiagnosisId = diagnosis.id;
    this.checkedDiagnosis.push(patientDiagnosis);
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
    await this.findSubDiagnosis(item.id);
  }

  removeCheckedDiagnosis(item: any): void {
    const checkedDiagnosis = this.checkedDiagnosis.filter((diagnosis: IPatientDiagnosis) => diagnosis.mkbDiagnosisId === item.id || diagnosis.mkbSubDiagnosisId === item.id);
    checkedDiagnosis.forEach((d: any) => {
      const index = this.checkedDiagnosis.indexOf(d);
      if (index !== -1) {
        this.patientDiagnosis.splice(index, 1);
        this.queryStrings.splice(index, 1);
      }
    });
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
