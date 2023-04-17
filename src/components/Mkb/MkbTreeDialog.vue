<template>
  <el-button @click="diagnosisModalVisible = true">Добавить диагноз из списка</el-button>
  <!--  <el-dialog v-if="diagnosisModalVisible" v-model="diagnosisModalVisible" fullscreen>-->
  <!--    <el-row>-->
  <!--      <el-col :span="12">-->
  <!--        <h3>Список диагнозов</h3>-->
  <!--        <MkbTree-->
  <!--          v-model:checkedDiagnosis="diagnosisData"-->
  <!--          :selectable="true"-->
  <!--          :patient-diagnosis="patientDiagnosis"-->
  <!--          @setDiagnosis="setDiagnosis"-->
  <!--          @removeDiagnosis="removeCheckedDiagnosis"-->
  <!--          @setSubDiagnosis="setSubDiagnosis"-->
  <!--          @setConcreteDiagnosis="setConcreteDiagnosis"-->
  <!--        ></MkbTree>-->
  <!--      </el-col>-->
  <!--      <el-col :span="10" :offset="2">-->
  <!--        <h3>Добавленные диагнозы</h3>-->
  <!--        <el-table :data="diagnosisData" style="width: 100%; margin-bottom: 20px">-->
  <!--          <el-table-column type="index" width="50" />-->
  <!--          <el-table-column prop="mkbDiagnosis.name" label="Основной диагноз" width="300">-->
  <!--            <template #default="scope">-->
  <!--              {{ scope.row.mkbDiagnosis.getFullName() }}-->
  <!--            </template>-->
  <!--          </el-table-column>-->
  <!--          <el-table-column prop="mkbSubDiagnosis.name" label="Уточнённый диагноз" width="400">-->
  <!--            <template #default="scope">-->
  <!--              {{ scope.row.getFullName() }}-->
  <!--            </template></el-table-column-->
  <!--          >-->
  <!--          <el-table-column prop="mkbConcreteDiagnosis.name" label="Болезнь" width="400">-->
  <!--            <template #default="scope">-->
  <!--              {{ scope.row.getFullName() }}-->
  <!--            </template></el-table-column-->
  <!--          >-->
  <!--        </el-table>-->
  <!--      </el-col>-->
  <!--    </el-row>-->

  <!--    <template #footer>-->
  <!--      <span class="dialog-footer">-->
  <!--        <el-button @click="diagnosisModalVisible = false">Закрыть</el-button>-->
  <!--      </span>-->
  <!--    </template>-->
  <!--  </el-dialog>-->
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, PropType } from 'vue';

const MkbTree = defineAsyncComponent(() => import('@/components/Mkb/MkbTree.vue'));

export default defineComponent({
  name: 'MkbTreeDialog',
  components: {
    // MkbTree,
  },
  props: {
    withMkbItem: {
      type: String as PropType<string>,
      default: '',
    },
  },
  setup(props) {
    // const store = useStore();
    // const patientDiagnosis: boolean = storeModule.value === 'patients';
    // const diagnosisData: ComputedRef<(PatientDiagnosis | RegisterDiagnosis)[]> = computed(
    //   () => store.getters[`${storeModule.value}/diagnosis`]
    // );
    //
    // const diagnosisModalVisible: Ref<boolean> = ref(false);
    //
    // const mkbDiagnosis: ComputedRef<MkbDiagnosis[]> = computed(() => store.getters['mkb/mkbDiagnoses']);
    // const mkbSubDiagnosis: ComputedRef<MkbSubDiagnosis[]> = computed(() => store.getters['mkb/mkbSubDiagnosis']);
    //
    // const setDiagnosis = (diagnosis: MkbDiagnosis): void =>
    //   store.commit(`${storeModule.value}/addDiagnosis`, MkbDiagnosis.CreateRelationDiagnosis(patientDiagnosis, diagnosis));
    //
    // const setSubDiagnosis = (subDiagnosis: MkbSubDiagnosis, diagnosis: MkbDiagnosis): void =>
    //   store.commit(`${storeModule.value}/addDiagnosis`, MkbDiagnosis.CreateRelationDiagnosis(patientDiagnosis, diagnosis, subDiagnosis));
    //
    // const setConcreteDiagnosis = (
    //   concreteDiagnosis: MkbConcreteDiagnosis,
    //   subDiagnosis: MkbSubDiagnosis,
    //   diagnosis: MkbDiagnosis
    // ): void => {
    //   console.log(MkbDiagnosis.CreateRelationDiagnosis(patientDiagnosis, diagnosis, subDiagnosis));
    //   store.commit(
    //     `${storeModule.value}/addDiagnosis`,
    //     MkbDiagnosis.CreateRelationDiagnosis(patientDiagnosis, diagnosis, subDiagnosis, concreteDiagnosis)
    //   );
    // };
    //
    // const removeCheckedDiagnosis = (i: MkbDiagnosis | MkbSubDiagnosis): void =>
    //   store.commit(`${storeModule.value}/removeDiagnosisByDiagnosisOrSubDiagnosisId`, i.id);

    return {};
  },
});
</script>
