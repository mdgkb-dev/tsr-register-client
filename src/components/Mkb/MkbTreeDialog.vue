<template>
  <el-button @click="addDiagnosisModal">Добавить диагноз из списка</el-button>
  <el-dialog width="90%" v-if="diagnosisModalVisible" v-model="diagnosisModalVisible">
    <el-row>
      <el-col :span="12">
        <h3>Список диагнозов</h3>
        <MkbTree
          v-model:diagnosisData="diagnosisData"
          :selectable="true"
          @setDiagnosis="setDiagnosis"
          @removeDiagnosis="removeCheckedDiagnosis"
          @setSubDiagnosis="setSubDiagnosis"
          :patientDiagnosis="patientDiagnosis"
        ></MkbTree>
      </el-col>
      <el-col :span="10" :offset="2">
        <h3>Добавленные диагнозы</h3>
        <el-table :data="diagnosisData" style="width: 100%; margin-bottom: 20px">
          <el-table-column type="index" width="50" />
          <el-table-column prop="mkbDiagnosis.name" label="Основной диагноз" width="300"> </el-table-column>
          <el-table-column prop="mkbSubDiagnosis.name" label="Уточнённый диагноз" width="400"> </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelDiagnosisFromModal">Закрыть</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { v4 as uuidv4 } from 'uuid';
import { defineAsyncComponent } from 'vue';
import { Options, Vue } from 'vue-class-component';
import { mapActions, mapGetters } from 'vuex';

import PatientDiagnosis from '@/classes/patients/PatientDiagnosis';
import RegisterDiagnosis from '@/classes/registers/RegisterDiagnosis';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IMkbGroup from '@/interfaces/mkb/IMkbGroup';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';
import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';
import IRegisterDiagnosis from '@/interfaces/registers/IRegisterDiagnosis';
import ISearch from '@/interfaces/shared/ISearch';

const MkbTree = defineAsyncComponent(() => import('@/components/Mkb/MkbTree.vue'));
const AnamnesisForm = defineAsyncComponent(() => import('@/components/Patients/AnamnesisForm.vue'));

@Options({
  components: {
    MkbTree,
    AnamnesisForm,
  },
  props: ['diagnosisData', 'patientDiagnosis'],
  computed: {
    ...mapGetters('mkb', ['mkbDiagnosis', 'mkbGroups', 'mkbSubDiagnosis', 'filteredDiagnosis']),
  },
  methods: {
    ...mapActions({
      searchGroups: 'mkb/searchGroups',
      searchDiagnosis: 'mkb/searchDiagnosis',
      searchSubDiagnosis: 'mkb/searchSubDiagnosis',
      getDiagnosisByGroupId: 'mkb/getDiagnosisByGroupId',
    }),
  },
})
export default class MkbTreeDialog extends Vue {
  // Types.
  mkbDiagnosis!: IMkbDiagnosis[];
  mkbGroups!: IMkbGroup[];
  mkbSubDiagnosis!: IMkbSubDiagnosis[];

  diagnosisData!: Array<IPatientDiagnosis | IRegisterDiagnosis>;
  patientDiagnosis?: boolean;

  diagnosis: ISearch[] = [];

  // Local state.
  diagnosisModalVisible = false;

  addDiagnosisModal(): void {
    this.diagnosisModalVisible = true;
  }

  cancelDiagnosisFromModal(): void {
    this.diagnosisModalVisible = false;
  }

  setDiagnosis(diagnosis: IMkbDiagnosis): void {
    let diagnosisData;
    if (this.patientDiagnosis) {
      diagnosisData = new PatientDiagnosis();
    } else {
      diagnosisData = new RegisterDiagnosis();
    }
    diagnosisData.id = uuidv4();
    diagnosisData.mkbDiagnosis = diagnosis;
    diagnosisData.mkbDiagnosisId = diagnosis.id;
    this.diagnosisData.push(diagnosisData);
    this.$emit('setDiagnosis', diagnosisData);
  }

  setSubDiagnosis(subDiagnosis: IMkbSubDiagnosis, diagnosis: IMkbDiagnosis): void {
    let diagnosisData;
    if (this.patientDiagnosis) {
      diagnosisData = new PatientDiagnosis();
    } else {
      diagnosisData = new RegisterDiagnosis();
    }
    diagnosisData.id = uuidv4();
    diagnosisData.mkbSubDiagnosis = subDiagnosis;
    diagnosisData.mkbSubDiagnosisId = subDiagnosis.id;

    diagnosisData.mkbDiagnosis = diagnosis;
    diagnosisData.mkbDiagnosisId = diagnosis.id;
    this.diagnosisData.push(diagnosisData);
    this.$emit('setDiagnosis', diagnosisData);
  }

  removeCheckedDiagnosis(item: any): void {
    const checkedDiagnosis = this.diagnosisData.filter(
      (diagnosis: IPatientDiagnosis | IRegisterDiagnosis) => diagnosis.mkbDiagnosisId === item.id || diagnosis.mkbSubDiagnosisId === item.id,
    );
    checkedDiagnosis.forEach((d: any) => {
      const index = this.diagnosisData.indexOf(d);
      if (index !== -1) {
        this.diagnosisData.splice(index, 1);
      }
    });
  }
}
</script>
