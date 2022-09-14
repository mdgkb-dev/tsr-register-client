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
      :default-expand-all="true"
      @expand-change="handleExpandChange"
    >
      <el-table-column type="index" width="60" align="center" />

      <el-table-column v-if="patientDiagnosis" type="expand">
        <template #default="props">
          <div v-if="props.row.editMode && selectedClass.id">
            <div>
              <el-select
                v-model="selectedClass.selectedGroupId"
                :disabled="!!selectedClass.selectedSubGroupId"
                clearable
                @clear="selectedClass.selectedGroupId = undefined"
              >
                <el-option v-for="item in selectedClass.mkbGroups" :key="item.id" :value="item.id" :label="item.getFullName()" />
              </el-select>
            </div>
            <div>
              <el-select
                v-if="selectedClass.getAllSubGroups().length"
                :model-value="selectedClass.selectedSubGroupId"
                :disabled="!!selectedClass.selectedDiagnosisId"
                clearable
                @change="($e) => selectedClass.selectSubGroup($e)"
                @clear="selectedClass.selectedSubGroupId = undefined"
              >
                <el-option v-for="item in selectedClass.getAllSubGroups()" :key="item.id" :value="item.id" :label="item.getFullName()" />
              </el-select>
            </div>
            <div>
              <el-select
                v-if="selectedClass.getAllSubSubGroups().length"
                :model-value="selectedClass.selectedSubSubGroupId"
                :disabled="!!selectedClass.selectedSubDiagnosisId"
                clearable
                @change="($e) => selectedClass.selectSubGroup($e)"
                @clear="selectedClass.selectedSubSubGroupId = undefined"
              >
                <el-option v-for="item in selectedClass.getAllSubSubGroups()" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </div>
            <div>
              <el-select
                v-if="selectedClass.getAllDiagnosis()"
                :model-value="selectedClass.selectedDiagnosisId"
                :disabled="!!selectedClass.selectedSubDiagnosisId"
                clearable
                @change="($e) => selectedClass.selectDiagnosis($e)"
                @clear="selectedClass.selectedDiagnosisId = undefined"
              >
                <el-option v-for="item in selectedClass.getAllDiagnosis()" :key="item.id" :label="item.getFullName()" :value="item.id" />
              </el-select>
            </div>
            <div>
              <el-select
                v-if="selectedClass.getAllSubDiagnosis().length"
                :model-value="selectedClass.selectedSubDiagnosisId"
                clearable
                @change="($e) => selectedClass.selectSubDiagnosis($e)"
                @clear="selectedClass.selectedSubDiagnosisId = undefined"
              >
                <el-option v-for="item in selectedClass.getAllSubDiagnosis()" :key="item.id" :label="item.getFullName()" :value="item.id" />
              </el-select>
            </div>
          </div>
          <div v-else>
            <div>
              {{ props.row.mkbDiagnosis?.mkbGroup?.name }}
            </div>
            <div>
              {{ props.row.mkbDiagnosis?.getFullName() }}
            </div>
          </div>
          <el-divider />
          <el-button v-if="isEditMode" style="margin: 10px" @click="addAnamnesis(props.row)">Добавить анамнез</el-button>
          <div class="block" style="">
            <el-timeline style="margin-top: 20px">
              <el-timeline-item
                v-for="(anamnesis, index) in props.row.patientDiagnosisAnamnesis"
                :key="anamnesis.id"
                :timestamp="formatDate(anamnesis.date)"
                placement="top"
              >
                <!-- :anamnesis-id="anamnesis.id" -->
                <AnamnesisForm
                  :anamnesis-prop="anamnesis"
                  :prop-name="'patientDiagnosis.' + props.$index + '.patientDiagnosisAnamnesis.' + index"
                  @remove="RemoveFromClass(props.$index, props.row.patientDiagnosisAnamnesis, props.row.patientDiagnosisAnamnesisForDelete)"
                />
              </el-timeline-item>
            </el-timeline>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="Группа диагноза" align="start" sortable>
        <template #default="scope">
          <el-form-item v-show="scope.row.editMode" label-width="0" style="margin-bottom: 0">
            <RemoteSearch
              ref="searchFormRef"
              :show-suggestions="false"
              :must-be-translated="true"
              :key-value="schema.mkbFlat.key"
              @select="selectMkbElement($event, scope.row)"
            />
          </el-form-item>
          <span v-if="!scope.row.editMode">{{ scope.row.getFullName() }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="isEditMode" width="50" fixed="right" align="center">
        <template #default="scope">
          <TableButtonGroup
            :show-remove-button="true"
            :show-edit-button="!scope.row.editMode"
            :show-check-button="scope.row.editMode"
            @remove="removeDiagnosis(scope.row.id)"
            @edit="changeEditMode(scope.row)"
            @check="scope.row.saveDiagnosis(selectedClass)"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineAsyncComponent, defineComponent, PropType, reactive, Ref, ref } from 'vue';

import MkbTreeDialog from '@/components/Mkb/MkbTreeDialog.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import ISearchObject from '@/interfaces/ISearchObject';
import IWithDiagnosis from '@/interfaces/IWithDiagnosis';
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
    let expandRowKeys: (string | undefined)[] = reactive([]);
    const searchFormRef = ref();
    const { formatDate } = useDateFormat();
    const isEditMode: ComputedRef<boolean> = computed<boolean>(() => Provider.store.getters['patients/isEditMode']);
    const selectedClass: ComputedRef<IMkbClass> = computed(() => Provider.store.getters['mkb/mkbClass']);
    const selectedElement: ComputedRef<IMkbElement> = computed(() => Provider.store.getters['mkb/mkbElement']);
    const filteredDiagnosis: ComputedRef<IMkbDiagnosis[]> = computed(() => Provider.store.getters['mkb/filteredDiagnosis']);
    const filteredSubDiagnosis: Ref<IMkbSubDiagnosis[]> = computed(() => Provider.store.getters['mkb/filteredSubDiagnosis']);
    const filteredConcreteDiagnosis: Ref<IMkbConcreteDiagnosis[]> = computed(() => Provider.store.getters['mkb/filteredConcreteDiagnosis']);

    const patientDiagnosis: boolean = props.storeModule === 'patients';
    const diagnosisData: ComputedRef<(IPatientDiagnosis | IRegisterDiagnosis)[]> = computed(
      () => Provider.store.getters[`${props.storeModule}/diagnosis`]
    );

    const addDiagnosis = (): void => Provider.store.commit(`${props.storeModule}/addDiagnosis`);
    const removeDiagnosis = (id: string): void => Provider.store.commit(`${props.storeModule}/removeDiagnosis`, id);
    const addAnamnesis = (diagnosis: IPatientDiagnosisAnamnesis): void => Provider.store.commit(`patients/addAnamnesis`, diagnosis.id);

    const handleExpandChange = (row: IPatientDiagnosis | IRegisterDiagnosis): void => {
      expandRowKeys = row.id === expandRowKeys[0] ? reactive([]) : reactive([row.id]);
    };

    const clearForm = (query: string, id: string): void => {
      if (query.length === 0) return;
      // Provider.store.commit('mkb/setFilteredDiagnosis', []);
      Provider.store.commit(`${props.storeModule}/clearDiagnosis`, id);
    };

    const selectMkbElement = async (event: ISearchObject, withDiagnosis: IWithDiagnosis): Promise<void> => {
      await Provider.store.dispatch('mkb/selectMkbElement', event.id);
      selectedClass.value.selectByElement(selectedElement.value);
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
</style>
