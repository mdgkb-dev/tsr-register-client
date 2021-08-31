<template>
  <el-button @click="diagnosisModalVisible = true">Добавить диагноз из списка</el-button>
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
        <el-button @click="diagnosisModalVisible = false">Закрыть</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { computed, ComputedRef, defineAsyncComponent, defineComponent, PropType, Ref, ref, toRefs } from 'vue';
import { useStore } from 'vuex';

import MkbDiagnosis from '@/classes/mkb/MkbDiagnosis';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';
import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';
import IRegisterDiagnosis from '@/interfaces/registers/IRegisterDiagnosis';

const MkbTree = defineAsyncComponent(() => import('@/components/Mkb/MkbTree.vue'));

export default defineComponent({
  name: 'MkbTreeDialog',
  components: {
    MkbTree,
  },
  props: {
    storeModule: {
      type: String as PropType<string>,
      default: '',
    },
  },
  setup(props) {
    const store = useStore();
    const { storeModule } = toRefs(props);
    const patientDiagnosis: boolean = storeModule.value === 'patients';
    const diagnosisData: ComputedRef<(IPatientDiagnosis | IRegisterDiagnosis)[]> = computed(
      () => store.getters[`${storeModule.value}/diagnosis`]
    );

    const diagnosisModalVisible: Ref<boolean> = ref(false);

    const mkbDiagnosis: ComputedRef<IMkbDiagnosis[]> = computed(() => store.getters['mkb/mkbDiagnosis']);
    const mkbSubDiagnosis: ComputedRef<IMkbSubDiagnosis[]> = computed(() => store.getters['mkb/mkbSubDiagnosis']);

    const setDiagnosis = (diagnosis: IMkbDiagnosis): void =>
      store.commit(`${storeModule}/addDiagnosis`, MkbDiagnosis.CreateRelationDiagnosis(patientDiagnosis, diagnosis));

    const setSubDiagnosis = (subDiagnosis: IMkbSubDiagnosis, diagnosis: IMkbDiagnosis): void =>
      store.commit(`${storeModule}/addDiagnosis`, MkbDiagnosis.CreateRelationDiagnosis(patientDiagnosis, diagnosis, subDiagnosis));

    const removeCheckedDiagnosis = (i: IMkbDiagnosis | IMkbSubDiagnosis): void =>
      store.commit(`${storeModule}/removeDiagnosisByDiagnosisOrSubDiagnosisId`, i.id);

    return {
      patientDiagnosis,
      diagnosisData,
      diagnosisModalVisible,
      mkbDiagnosis,
      mkbSubDiagnosis,
      removeCheckedDiagnosis,
      setDiagnosis,
      setSubDiagnosis,
    };
  },
});
</script>
