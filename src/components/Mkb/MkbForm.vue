<template>
  <div class="table-under-collapse">
    <el-space v-if="isEditMode" style="margin-bottom: 10px">
      <el-button @click="addDiagnosis">Добавить диагноз</el-button>
      <MkbTreeDialog :store-module="storeModule" />
    </el-space>
    <el-table
      :data="diagnosisData"
      :row-key="(row) => row.id"
      class="table-shadow"
      header-row-class-name="header-style"
      :expand-row-keys="expandRowKeys"
      @expand-change="handleExpandChange"
    >
      <el-table-column type="index" width="60" align="center" />

      <el-table-column v-if="patientDiagnosis" type="expand">
        <template #default="props">
          <div class="block" style="">
            <el-timeline style="margin-top: 20px">
              <el-timeline-item
                v-for="(anamnesis, index) in props.row.patientDiagnosisAnamnesis"
                :key="anamnesis.id"
                :timestamp="formatDate(anamnesis.date)"
                placement="top"
              >
                <AnamnesisForm
                  :anamnesis-prop="anamnesis"
                  :prop-name="'patientDiagnosis.' + props.$index + '.patientDiagnosisAnamnesis.' + index"
                  @remove="RemoveFromClass(index, props.row.patientDiagnosisAnamnesis, props.row.patientDiagnosisAnamnesisForDelete)"
                />
              </el-timeline-item>
            </el-timeline>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="Группа диагноза" align="start" sortable>
        <template #default="scope">
          <div v-show="scope.row.editMode">
            <RemoteSearch
              ref="searchFormRef"
              :model-value="scope.row.getFullName()"
              :show-suggestions="false"
              :must-be-translated="true"
              :key-value="schema.mkbFlat.key"
              @select="selectMkbElement($event, scope.row)"
            />
            <div v-if="scope.row.editMode && scope.row.selectedClass.id" class="selects">
              <div class="selects-item">
                <el-select
                  v-model="scope.row.selectedClass.selectedGroupId"
                  :disabled="!!scope.row.selectedClass.selectedSubGroupId"
                  clearable
                  fit-input-width
                  @clear="scope.row.selectedClass.selectedGroupId = undefined"
                >
                  <el-option
                    v-for="item in scope.row.selectedClass.mkbGroups"
                    :key="item.id"
                    :value="item.id"
                    :label="item.getFullName()"
                  />
                </el-select>
              </div>
              <div class="selects-item">
                <el-select
                  v-if="scope.row.selectedClass.getAllSubGroups().length"
                  :model-value="scope.row.selectedClass.selectedSubGroupId"
                  :disabled="!!scope.row.selectedClass.selectedDiagnosisId"
                  clearable
                  fit-input-width
                  @change="($e) => scope.row.selectedClass.selectSubGroup($e)"
                  @clear="scope.row.selectedClass.selectedSubGroupId = undefined"
                >
                  <el-option
                    v-for="item in scope.row.selectedClass.getAllSubGroups()"
                    :key="item.id"
                    :value="item.id"
                    :label="item.getFullName()"
                  />
                </el-select>
              </div>
              <div class="selects-item">
                <el-select
                  v-if="scope.row.selectedClass.getAllSubSubGroups().length"
                  :model-value="scope.row.selectedClass.selectedSubSubGroupId"
                  :disabled="!!scope.row.selectedClass.selectedSubDiagnosisId"
                  clearable
                  fit-input-width
                  @change="($e) => scope.row.selectedClass.selectSubGroup($e)"
                  @clear="scope.row.selectedClass.selectedSubSubGroupId = undefined"
                >
                  <el-option v-for="item in selectedClass.getAllSubSubGroups()" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
              </div>
              <div class="selects-item">
                <el-select
                  v-if="scope.row.selectedClass.getAllDiagnosis()"
                  :model-value="scope.row.selectedClass.selectedDiagnosisId"
                  :disabled="!!scope.row.selectedClass.selectedSubDiagnosisId"
                  clearable
                  fit-input-width
                  @change="($e) => scope.row.selectedClass.selectDiagnosis($e)"
                  @clear="scope.row.selectedClass.selectedDiagnosisId = undefined"
                >
                  <el-option v-for="item in selectedClass.getAllDiagnosis()" :key="item.id" :label="item.getFullName()" :value="item.id" />
                </el-select>
              </div>
              <div class="selects-item">
                <el-select
                  v-if="scope.row.selectedClass.getAllSubDiagnosis().length"
                  :model-value="scope.row.selectedClass.selectedSubDiagnosisId"
                  :disabled="!!scope.row.selectedClass.selectedConcreteDiagnosisId"
                  clearable
                  fit-input-width
                  @change="($e) => scope.row.selectedClass.selectSubDiagnosis($e)"
                  @clear="scope.row.selectedClass.selectedSubDiagnosisId = undefined"
                >
                  <el-option
                    v-for="item in scope.row.selectedClass.getAllSubDiagnosis()"
                    :key="item.id"
                    :label="item.getFullName()"
                    :value="item.id"
                  />
                </el-select>
              </div>
              <div class="selects-item">
                <el-select
                  v-if="scope.row.selectedClass.getAllConcreteDiagnosis().length"
                  :model-value="scope.row.selectedClass.selectedConcreteDiagnosisId"
                  clearable
                  fit-input-width
                  @change="($e) => scope.row.selectedClass.selectConcreteDiagnosis($e)"
                  @clear="scope.row.selectedClass.selectedConcreteDiagnosisId = undefined"
                >
                  <el-option
                    v-for="item in scope.row.selectedClass.getAllConcreteDiagnosis()"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </div>
            </div>
          </div>
          <div v-if="!scope.row.editMode">{{ scope.row.getFullName() }}</div>
        </template>
      </el-table-column>
      <el-table-column v-if="isEditMode" width="50" fixed="right" align="center">
        <template #default="scope">
          <TableButtonGroup
            show-remove-button
            :show-edit-button="!scope.row.editMode"
            :show-check-button="scope.row.editMode"
            show-add-button
            @add="
              addAnamnesis(scope.row);
              handleExpandChange(scope.row);
            "
            @remove="removeDiagnosis(scope.row.id)"
            @edit="changeEditMode(scope.row)"
            @check="scope.row.saveDiagnosis(scope.row.selectedClass)"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineAsyncComponent, defineComponent, PropType, Ref, ref, WritableComputedRef } from 'vue';

import MkbClass from '@/classes/mkb/MkbСlass';
import MkbTreeDialog from '@/components/Mkb/MkbTreeDialog.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import ISearchObject from '@/interfaces/ISearchObject';
import IMkbClass from '@/interfaces/mkb/IMkbClass';
import IMkbConcreteDiagnosis from '@/interfaces/mkb/IMkbConcreteDiagnosis';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IMkbElement from '@/interfaces/mkb/IMkbElement';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';
import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';
import IPatientDiagnosisAnamnesis from '@/interfaces/patients/IPatientDiagnosisAnamnesis';
import IRegisterDiagnosis from '@/interfaces/registers/IRegisterDiagnosis';
import useDateFormat from '@/mixins/useDateFormat';
import Provider from '@/services/Provider';
import RemoveFromClass from '@/services/RemoveFromClass';

const AnamnesisForm = defineAsyncComponent(() => import('@/components/Patients/AnamnesisForm.vue'));

export default defineComponent({
  name: 'MkbForm',
  components: {
    RemoteSearch,
    AnamnesisForm,
    MkbTreeDialog,
    TableButtonGroup,
  },
  props: {
    storeModule: {
      type: String as PropType<string>,
      default: '',
    },
  },
  setup(props) {
    let expandRowKeys: Ref<(string | undefined)[]> = ref([]);
    const searchFormRef = ref();
    const { formatDate } = useDateFormat();
    const isEditMode: ComputedRef<boolean> = computed<boolean>(() => Provider.store.getters['patients/isEditMode']);
    const selectedClass: WritableComputedRef<IMkbClass> = computed(() => Provider.store.getters['mkb/mkbClass']);
    const selectedElement: ComputedRef<IMkbElement> = computed(() => Provider.store.getters['mkb/mkbElement']);
    const filteredDiagnosis: ComputedRef<IMkbDiagnosis[]> = computed(() => Provider.store.getters['mkb/filteredDiagnosis']);
    const filteredSubDiagnosis: Ref<IMkbSubDiagnosis[]> = computed(() => Provider.store.getters['mkb/filteredSubDiagnosis']);
    const filteredConcreteDiagnosis: Ref<IMkbConcreteDiagnosis[]> = computed(() => Provider.store.getters['mkb/filteredConcreteDiagnosis']);

    const patientDiagnosis: boolean = props.storeModule === 'patients';
    const diagnosisData: ComputedRef<(IPatientDiagnosis | IRegisterDiagnosis)[]> = computed(
      () => Provider.store.getters[`${props.storeModule}/diagnosis`]
    );

    const addDiagnosis = (): void => {
      selectedClass.value = new MkbClass();
      Provider.store.commit(`${props.storeModule}/addDiagnosis`);
    };
    const removeDiagnosis = (id: string): void => Provider.store.commit(`${props.storeModule}/removeDiagnosis`, id);
    const addAnamnesis = (diagnosis: IPatientDiagnosisAnamnesis): void => {
      Provider.store.commit(`patients/addAnamnesis`, diagnosis.id);
    };

    const handleExpandChange = (row: IPatientDiagnosis | IRegisterDiagnosis): void => {
      expandRowKeys.value = row.id === expandRowKeys.value[0] ? [] : [row.id];
    };

    const clearForm = (query: string, id: string): void => {
      if (query.length === 0) return;
      // Provider.store.commit('mkb/setFilteredDiagnosis', []);
      Provider.store.commit(`${props.storeModule}/clearDiagnosis`, id);
    };

    const selectMkbElement = async (event: ISearchObject, patientDiagnosis: IPatientDiagnosis): Promise<void> => {
      await Provider.store.dispatch('mkb/selectMkbElement', event.id);
      patientDiagnosis.selectedClass = new MkbClass(selectedClass.value);
      patientDiagnosis.selectedClass.selectByElement(selectedElement.value);
    };

    const changeEditMode = (patientDiagnosis: IPatientDiagnosis) => {
      patientDiagnosis.changeEditMode();
      searchFormRef.value.$refs.searchForm.focus();
    };

    return {
      searchFormRef,
      changeEditMode,
      filteredConcreteDiagnosis,
      diagnosisData,
      patientDiagnosis,
      formatDate,
      expandRowKeys,
      filteredDiagnosis,
      addAnamnesis,
      addDiagnosis,
      handleExpandChange,
      removeDiagnosis,
      clearForm,
      isEditMode,
      filteredSubDiagnosis,
      schema: Provider.schema,
      selectedElement,
      RemoveFromClass,
      selectMkbElement,
      //
      selectedClass,
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
</style>
