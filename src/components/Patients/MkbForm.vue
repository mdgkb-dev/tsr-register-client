<template>
  <div class="table-under-collapse">
    <el-button @click="addDiagnosis">Добавить диагноз</el-button>
    <el-button @click="addDiagnosisModal">Добавить диагноз из списка</el-button>

    <el-dialog v-model="diagnosisModalVisible" width="80%">
      <MkbTree :selectable="true" @setDiagnosis="setDiagnosis" @setSubDiagnosis="setSubDiagnosis"></MkbTree>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelDiagnosisFromModal">Отменить</el-button>
          <el-button type="primary" @click="addDiagnosisFromModal">Добавить диагноз</el-button>
        </span>
      </template>
    </el-dialog>

    <el-table :data="patientDiagnosis">
      <el-table-column type="index" width="50" />
      <el-table-column prop="human.dateBirth" label="Основной диагноз" width="350" sortable>
        <template #default="scope">
          <el-autocomplete
            popper-class="wide-dropdown"
            :fetch-suggestions="findDiagnosis"
            v-model="queryStrings[scope.$index]"
            placeholder="Выберите диагноз"
            @select="handleSelect($event, scope.$index)"
          >
            <template #default="{ item }">
              <div class="value">{{ item.value }}</div>
            </template>
          </el-autocomplete>
        </template>
      </el-table-column>
      <el-table-column prop="height" label="Уточнённый диагноз" width="250">
        <template #default="scope">
          <el-select v-model="scope.row.mkbSubDiagnosisId" v-if="scope.row.mkbDiagnosisId" placeholder="Выберите диагноз">
            <el-option v-for="i in mkbSubDiagnosisOption" :key="i.value" :label="i.label" :value="i.value" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="Первичный" width="100">
        <template #default="scope">
          <el-checkbox v-model="scope.row.primary" />
        </template>
      </el-table-column>
      <el-table-column width="120">
        <template #default="scope">
          <el-button @click="removeDiagnosis(scope.$index)" type="text" size="small">Удалить</el-button>
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
  checkedDiagnosis?: IMkbDiagnosis = undefined;
  checkedSubDiagnosis?: IMkbSubDiagnosis = undefined;

  cancelDiagnosisFromModal(): void {
    this.checkedDiagnosis = undefined;
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
    const diagnosis = new PatientDiagnosis();
    if (this.checkedDiagnosis) {
      diagnosis.mkbDiagnosisId = this.checkedDiagnosis.id;
      this.patientDiagnosis.push(diagnosis);
    }
  }

  setDiagnosis(diagnosis: IMkbDiagnosis): void {
    this.checkedDiagnosis = diagnosis;
  }

  setSubDiagnosis(subDiagnosis: IMkbSubDiagnosis): void {
    this.checkedSubDiagnosis = subDiagnosis;
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

  removeDiagnosis(item: any): void {
    const index = this.patientDiagnosis.indexOf(item);
    if (index !== -1) {
      this.patientDiagnosis.splice(index, 1);
      this.queryStrings.splice(index, 1);
    }
  }
}
</script>
