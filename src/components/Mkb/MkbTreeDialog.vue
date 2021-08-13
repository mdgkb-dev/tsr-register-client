<template>
  <el-button @click="addDiagnosisModal">Добавить диагноз из списка</el-button>
  <el-dialog v-if="diagnosisModalVisible" v-model="diagnosisModalVisible" width="90%">
    <el-row>
      <el-col :span="12">
        <h3>Список диагнозов</h3>
        <MkbTree
          v-model:checkedDiagnosis="diagnosisData"
          :selectable="true"
          :patient-diagnosis="patientDiagnosis"
          @setDiagnosis="setDiagnosis"
          @removeDiagnosis="removeCheckedDiagnosis"
          @setSubDiagnosis="setSubDiagnosis"
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
import { computed, ComputedRef, defineAsyncComponent, defineComponent, PropType, Ref, ref, toRefs } from 'vue';
import { useStore } from 'vuex';

import PatientDiagnosis from '@/classes/patients/PatientDiagnosis';
import RegisterDiagnosis from '@/classes/registers/RegisterDiagnosis';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';
import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';
import IRegisterDiagnosis from '@/interfaces/registers/IRegisterDiagnosis';

const MkbTree = defineAsyncComponent(() => import('@/components/Mkb/MkbTree.vue'));
// TODO: Лишний импорт?
// const AnamnesisForm = defineAsyncComponent(() => import('@/components/Patients/AnamnesisForm.vue'));

export default defineComponent({
  name: 'MkbTreeDialog',
  components: {
    MkbTree,
    // AnamnesisForm, // TODO: Не используемый компонент?
  },
  props: {
    diagnosisData: {
      type: Array as PropType<(IPatientDiagnosis | IRegisterDiagnosis)[]>,
      default: () => [],
    },
    patientDiagnosis: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  emits: ['setDiagnosis'],
  setup(props, { emit }) {
    const store = useStore();
    const { diagnosisData, patientDiagnosis } = toRefs(props);

    const diagnosisModalVisible: Ref<boolean> = ref(false);

    const mkbDiagnosis: ComputedRef = computed(() => store.getters['mkb/mkbDiagnosis']);
    const mkbSubDiagnosis: ComputedRef = computed(() => store.getters['mkb/mkbSubDiagnosis']);

    const addDiagnosisModal = (): void => {
      diagnosisModalVisible.value = true;
    };

    const cancelDiagnosisFromModal = (): void => {
      diagnosisModalVisible.value = false;
    };

    const setDiagnosis = (diagnosis: IMkbDiagnosis): void => {
      let newDiagnosisData: IPatientDiagnosis | IRegisterDiagnosis;

      if (patientDiagnosis.value) {
        newDiagnosisData = new PatientDiagnosis();
      } else {
        newDiagnosisData = new RegisterDiagnosis();
      }

      newDiagnosisData.id = uuidv4();
      newDiagnosisData.mkbDiagnosis = diagnosis;
      newDiagnosisData.mkbDiagnosisId = diagnosis.id;
      diagnosisData.value.push(newDiagnosisData);
      emit('setDiagnosis', newDiagnosisData);
    };

    const setSubDiagnosis = (subDiagnosis: IMkbSubDiagnosis, diagnosis: IMkbDiagnosis): void => {
      let newDiagnosisData: IPatientDiagnosis | IRegisterDiagnosis;

      if (patientDiagnosis.value) {
        newDiagnosisData = new PatientDiagnosis();
      } else {
        newDiagnosisData = new RegisterDiagnosis();
      }

      newDiagnosisData.id = uuidv4();
      newDiagnosisData.mkbSubDiagnosis = subDiagnosis;
      newDiagnosisData.mkbSubDiagnosisId = subDiagnosis.id;

      newDiagnosisData.mkbDiagnosis = diagnosis;
      newDiagnosisData.mkbDiagnosisId = diagnosis.id;
      diagnosisData.value.push(newDiagnosisData);
      emit('setDiagnosis', newDiagnosisData);
    };

    const removeCheckedDiagnosis = (item: any): void => {
      const checkedDiagnosis = diagnosisData.value.filter(
        (diagnosis: IPatientDiagnosis | IRegisterDiagnosis) =>
          diagnosis.mkbDiagnosisId === item.id || diagnosis.mkbSubDiagnosisId === item.id
      );
      checkedDiagnosis.forEach((d: any) => {
        const index = diagnosisData.value.indexOf(d);
        if (index !== -1) {
          diagnosisData.value.splice(index, 1);
        }
      });
    };

    return {
      diagnosisModalVisible,
      mkbDiagnosis,
      mkbSubDiagnosis,
      addDiagnosisModal,
      cancelDiagnosisFromModal,
      removeCheckedDiagnosis,
      setDiagnosis,
      setSubDiagnosis,
    };
  },
});
</script>
