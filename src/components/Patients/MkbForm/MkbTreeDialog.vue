<template>
  <el-button @click="addDiagnosisModal">Добавить диагноз из списка</el-button>
  <el-dialog width="90%" v-if="diagnosisModalVisible" v-model="diagnosisModalVisible">
    <el-row>
      <el-col :span="12">
        <h3>Список диагнозов</h3>
        <MkbTree
          v-model:patientDiagnosis="patientDiagnosis"
          :selectable="true"
          @setDiagnosis="setDiagnosis"
          @removeDiagnosis="removeCheckedDiagnosis"
          @setSubDiagnosis="setSubDiagnosis"
        ></MkbTree>
      </el-col>
      <el-col :span="10" :offset="2">
        <h3>Добавленные диагнозы</h3>
        <el-table :data="patientDiagnosis" style="width: 100%; margin-bottom: 20px">
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
import { Vue, Options } from 'vue-class-component';

import { mapActions, mapGetters } from 'vuex';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import ISearch from '@/interfaces/shared/ISearch';
import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';
import PatientDiagnosis from '@/classes/patients/PatientDiagnosis';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';
import { defineAsyncComponent } from 'vue';
import IMkbGroup from '@/interfaces/mkb/IMkbGroup';
import { v4 as uuidv4 } from 'uuid';

const MkbTree = defineAsyncComponent(() => import('@/components/MkbTree.vue'));
const AnamnesisForm = defineAsyncComponent(() => import('@/components/Patients/AnamnesisForm.vue'));

@Options({
  components: {
    MkbTree,
    AnamnesisForm,
  },
  props: ['patientDiagnosis'],
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

  patientDiagnosis!: IPatientDiagnosis[];

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
    const patientDiagnosis = new PatientDiagnosis();
    patientDiagnosis.id = uuidv4();
    patientDiagnosis.mkbDiagnosis = diagnosis;
    patientDiagnosis.mkbDiagnosisId = diagnosis.id;
    this.patientDiagnosis.push(patientDiagnosis);
    this.$emit('setDiagnosis', patientDiagnosis);
  }

  setSubDiagnosis(subDiagnosis: IMkbSubDiagnosis, diagnosis: IMkbDiagnosis): void {
    const patientDiagnosis = new PatientDiagnosis();
    patientDiagnosis.id = uuidv4();
    patientDiagnosis.mkbSubDiagnosis = subDiagnosis;
    patientDiagnosis.mkbSubDiagnosisId = subDiagnosis.id;

    patientDiagnosis.mkbDiagnosis = diagnosis;
    patientDiagnosis.mkbDiagnosisId = diagnosis.id;
    this.patientDiagnosis.push(patientDiagnosis);
    this.$emit('setDiagnosis', patientDiagnosis);
  }

  removeCheckedDiagnosis(item: any): void {
    const checkedDiagnosis = this.patientDiagnosis.filter(
      (diagnosis: IPatientDiagnosis) => diagnosis.mkbDiagnosisId === item.id || diagnosis.mkbSubDiagnosisId === item.id,
    );
    checkedDiagnosis.forEach((d: any) => {
      const index = this.patientDiagnosis.indexOf(d);
      if (index !== -1) {
        this.patientDiagnosis.splice(index, 1);
      }
    });
  }
}
</script>
