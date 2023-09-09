<template>
  <div class="table-under-collapse">
    <RemoteSearch :must-be-translated="true" key-value="mkbItem" placeholder="Начните вводить название диагноза" @select="addMkbItem" />
    <!--    <el-space v-if="isEditMode" style="margin-bottom: 10px">-->
    <!--      <el-button @click="addDiagnosis">Добавить диагноз</el-button>-->
    <!--      <MkbTreeDialog :store-module="storeModule" />-->
    <!--    </el-space>-->
    <el-table
      :data="mkbLinker.getMkbItems()"
      :row-key="(row) => row.id"
      class="table-shadow"
      header-row-class-name="header-style"
      :expand-row-keys="expandRowKeys"
    >
      <!--      <el-table-column type="index" width="60" align="center" />-->

      <!--      <el-table-column type="expand">-->
      <!--        <template #default="props">-->
      <!--          <div class="block" style="">-->
      <!--            <el-timeline style="margin-top: 20px">-->
      <!--              <el-timeline-item-->
      <!--                v-for="(anamnesis, index) in props.row.patientDiagnosisAnamnesis"-->
      <!--                :key="anamnesis.id"-->
      <!--                :timestamp="$dateTimeFormatter.format(anamnesis.date)"-->
      <!--                placement="top"-->
      <!--              >-->
      <!--                <AnamnesisForm-->
      <!--                  :anamnesis-prop="anamnesis"-->
      <!--                  :prop-name="'patientDiagnosis.' + props.$index + '.patientDiagnosisAnamnesis.' + index"-->
      <!--                  @remove="RemoveFromClass(index, props.row.patientDiagnosisAnamnesis, props.row.patientDiagnosisAnamnesisForDelete)"-->
      <!--                />-->
      <!--              </el-timeline-item>-->
      <!--            </el-timeline>-->
      <!--          </div>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column v-if="isEditMode" width="50" fixed="right" align="center">
        <template #default="scope">
          <TableButtonGroup show-remove-button @remove="mkbLinker.removeMkbItem(scope.$index)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, PropType, Ref, ref } from 'vue';

import MkbItem from '@/classes/MkbItem';
// import MkbTreeDialog from '@/components/Mkb/MkbTreeDialog.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import IMkbLinker from '@/interfaces/IMkbLinker';
import ISearchObject from '@/interfaces/ISearchObject';
import Provider from '@/services/Provider/Provider';

// const AnamnesisForm = defineAsyncComponent(() => import('@/components/Patients/AnamnesisForm.vue'));

export default defineComponent({
  name: 'MkbForm',
  components: {
    RemoteSearch,
    // AnamnesisForm,
    // MkbTreeDialog,
    TableButtonGroup,
  },
  props: {
    mkbLinker: {
      type: Object as PropType<IMkbLinker>,
      required: true,
    },
  },
  setup(props) {
    let expandRowKeys: Ref<(string | undefined)[]> = ref([]);
    const searchFormRef = ref();
    // const { formatDate } = useDateFormat();
    const isEditMode: ComputedRef<boolean> = computed<boolean>(() => Provider.store.getters['patients/isEditMode']);
    const mkbItem: ComputedRef<MkbItem> = computed<MkbItem>(() => Provider.store.getters['mkbItems/item']);

    const addMkbItem = async (event: ISearchObject): Promise<void> => {
      // console.log(event)
      await Provider.store.dispatch('mkbItems/get', event.value);
      props.mkbLinker.addMkbItem(mkbItem.value);
    };

    // const changeEditMode = (patientDiagnosis: IPatientDiagnosis) => {
    //   patientDiagnosis.changeEditMode();
    //   searchFormRef.value.$refs.searchForm.focus();
    // };

    // const getRowClassName = ({ row }: any): string => {
    //   if (row.patientDiagnosisAnamnesis.length === 0) {
    //     return 'row-expand-cover';
    //   }
    //   return '';
    // };

    return {
      // getRowClassName,
      searchFormRef,
      // changeEditMode,
      // filteredConcreteDiagnosis,
      // diagnosisData,
      // patientDiagnosis,
      // formatDate,
      expandRowKeys,
      // filteredDiagnosis,
      // addAnamnesis,
      // addDiagnosis,
      // handleExpandChange,
      // removeDiagnosis,
      // clearForm,
      isEditMode,
      // filteredSubDiagnosis,
      // selectedElement,
      // RemoveFromClass,
      addMkbItem,
      //
      // selectedClass,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.el-timeline) {
  margin-right: 20px;
}
.selects {
  display: flex;
  flex-direction: column;
  width: 100%;
  &-item {
    width: 100%;
    margin: 10px 10px 0 10px;
    padding-right: 10px;
    :deep(.el-input__wrapper) {
      border-radius: 20px;
    }
    :deep(.el-select) {
      width: 100%;
    }
  }
  &-item:empty {
    display: none;
  }
}

:deep(.row-expand-cover .el-table__expand-icon) {
  visibility: hidden;
}
</style>
