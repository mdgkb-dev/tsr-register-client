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
                @clear="selectedClass.resetSelected()"
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
                @clear="selectedClass.resetSelected()"
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
                @clear="selectedClass.resetSelected()"
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
                @clear="selectedClass.resetSelected()"
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
                @clear="selectedClass.resetSelected()"
              >
                <el-option v-for="item in selectedClass.getAllSubDiagnosis()" :key="item.id" :label="item.getFullName()" :value="item.id" />
              </el-select>
            </div>
            <el-button @click="props.row.saveDiagnosis(selectedClass)">Сохранить диагноз</el-button>
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
          <el-form-item v-if="scope.row.editMode" label-width="0" style="margin-bottom: 0">
            <RemoteSearch :must-be-translated="true" :key-value="schema.mkbFlat.key" @select="selectMkbElement($event, scope.row)" />
          </el-form-item>
          <span v-else>{{ scope.row.getFullName() }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="isEditMode" width="50" fixed="right" align="center">
        <template #default="scope">
          <TableButtonGroup
            :show-remove-button="true"
            :show-edit-button="!scope.row.editMode"
            @remove="removeDiagnosis(scope.row.id)"
            @edit="scope.row.editDiagnosis()"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineAsyncComponent, defineComponent, PropType, reactive, Ref } from 'vue';

import MkbConcreteDiagnosis from '@/classes/mkb/MkbConcreteDiagnosis';
import MkbDiagnosis from '@/classes/mkb/MkbDiagnosis';
import MkbSubDiagnosis from '@/classes/mkb/MkbSubDiagnosis';
import MkbTreeDialog from '@/components/Mkb/MkbTreeDialog.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import ISearchObject from '@/interfaces/ISearchObject';
import IWithDiagnosis from '@/interfaces/IWithDiagnosis';
import IMkbClass from '@/interfaces/mkb/IMkbClass';
import IMkbConcreteDiagnosis from '@/interfaces/mkb/IMkbConcreteDiagnosis';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IMkbElement from '@/interfaces/mkb/IMkbElement';
import IMkbGroup from '@/interfaces/mkb/IMkbGroup';
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

    const getProp = (index: number): string => {
      let mod = '';
      if (patientDiagnosis) {
        mod = 'patientDiagnosis.';
      } else {
        mod = 'registerDiagnosis.';
      }
      if (props.storeModule === 'drugs') {
        mod = 'drugsDiagnosis.';
      }
      return mod + index + '.mkbDiagnosisId';
    };

    const mkbGroup: ComputedRef<IMkbGroup> = computed(() => Provider.store.getters['mkbGroups/item']);
    const mkbDiagnosis: ComputedRef<IMkbDiagnosis> = computed(() => Provider.store.getters['mkbDiagnoses/item']);
    const mkbSubDiagnosis: ComputedRef<IMkbSubDiagnosis> = computed(() => Provider.store.getters['mkbSubDiagnoses/item']);
    const mkbConcreteDiagnosis: ComputedRef<IMkbConcreteDiagnosis> = computed(() => Provider.store.getters['mkbConcreteDiagnoses/item']);

    const clearDiagnosisData = (
      withDiagnosis: IWithDiagnosis,
      group: boolean,
      diagnosis: boolean,
      subDiagnosis: boolean,
      concreteDiagnosis: boolean
    ): void => {
      if (group) {
        withDiagnosis.mkbDiagnosis.queryStringGroup = '';
        withDiagnosis.mkbDiagnosisId = undefined;
      }
      if (diagnosis) {
        withDiagnosis.mkbDiagnosis.queryStringDiagnosis = '';
        withDiagnosis.mkbDiagnosisId = undefined;
      }
      if (subDiagnosis) {
        withDiagnosis.mkbSubDiagnosis.queryString = '';
        withDiagnosis.mkbSubDiagnosisId = undefined;
      }
      if (concreteDiagnosis) {
        withDiagnosis.mkbConcreteDiagnosis.queryString = '';
        withDiagnosis.mkbConcreteDiagnosisId = undefined;
      }
    };

    const setGroup = (withDiagnosis: IWithDiagnosis, item: IMkbGroup): void => {
      withDiagnosis.mkbDiagnosis.queryStringGroup = item.fullName;
      withDiagnosis.mkbDiagnosis.mkbGroupId = item.id;
    };

    const setDiagnosis = (withDiagnosis: IWithDiagnosis, item: IMkbDiagnosis): void => {
      withDiagnosis.mkbDiagnosis.queryStringDiagnosis = item.fullName;
      withDiagnosis.mkbDiagnosisId = item.id;
      withDiagnosis.mkbDiagnosis = new MkbDiagnosis(item);
    };

    const setSubDiagnosis = (withDiagnosis: IWithDiagnosis, item: IMkbSubDiagnosis): void => {
      withDiagnosis.mkbSubDiagnosisId = item.id;
      withDiagnosis.mkbSubDiagnosis = new MkbSubDiagnosis(item);
      withDiagnosis.mkbSubDiagnosis.queryString = item.fullName;
    };

    const selectGroup = async (event: ISearchObject, withDiagnosis: IWithDiagnosis): Promise<void> => {
      await Provider.store.dispatch('mkbGroups/get', event.id);
      setGroup(withDiagnosis, mkbGroup.value);
      clearDiagnosisData(withDiagnosis, false, true, true, true);
    };

    const selectDiagnosis = async (event: ISearchObject, withDiagnosis: IWithDiagnosis): Promise<void> => {
      await Provider.store.dispatch('mkbDiagnoses/get', event.id);
      setDiagnosis(withDiagnosis, mkbDiagnosis.value);
      clearDiagnosisData(withDiagnosis, false, false, true, true);
      if (mkbDiagnosis.value.mkbGroup) {
        setGroup(withDiagnosis, mkbDiagnosis.value.mkbGroup);
      }
    };

    const selectSubDiagnosis = async (event: ISearchObject, withDiagnosis: IWithDiagnosis): Promise<void> => {
      await Provider.store.dispatch('mkbSubDiagnoses/get', event.id);
      setSubDiagnosis(withDiagnosis, mkbSubDiagnosis.value);
      clearDiagnosisData(withDiagnosis, false, false, false, true);
      if (mkbSubDiagnosis.value.mkbDiagnosis) {
        setDiagnosis(withDiagnosis, mkbSubDiagnosis.value.mkbDiagnosis);
        if (mkbSubDiagnosis.value.mkbDiagnosis.mkbGroup) {
          setGroup(withDiagnosis, mkbSubDiagnosis.value.mkbDiagnosis.mkbGroup);
        }
      }
    };

    const selectConcreteDiagnosis = async (event: ISearchObject, withDiagnosis: IWithDiagnosis): Promise<void> => {
      await Provider.store.dispatch('mkbConcreteDiagnoses/get', event.id);

      withDiagnosis.mkbConcreteDiagnosisId = mkbConcreteDiagnosis.value.id;
      withDiagnosis.mkbConcreteDiagnosis = new MkbConcreteDiagnosis(mkbConcreteDiagnosis.value);
      withDiagnosis.mkbConcreteDiagnosis.queryString = mkbConcreteDiagnosis.value.name;

      if (mkbConcreteDiagnosis.value.mkbSubDiagnosis) {
        setSubDiagnosis(withDiagnosis, mkbConcreteDiagnosis.value.mkbSubDiagnosis);
        if (mkbConcreteDiagnosis.value.mkbSubDiagnosis.mkbDiagnosis) {
          setDiagnosis(withDiagnosis, mkbConcreteDiagnosis.value.mkbSubDiagnosis.mkbDiagnosis);
          if (mkbConcreteDiagnosis.value.mkbSubDiagnosis.mkbDiagnosis.mkbGroup) {
            setGroup(withDiagnosis, mkbConcreteDiagnosis.value.mkbSubDiagnosis.mkbDiagnosis.mkbGroup);
          }
        }
      }
    };

    const selectMkbElement = async (event: ISearchObject, withDiagnosis: IWithDiagnosis): Promise<void> => {
      await Provider.store.dispatch('mkb/selectMkbElement', event.id);
      selectedClass.value.selectByElement(selectedElement.value);
    };

    return {
      filteredConcreteDiagnosis,
      getProp,
      diagnosisData,
      patientDiagnosis,
      formatDate,
      expandRowKeys,
      filteredDiagnosis,
      mkbSubDiagnosis,
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
      selectGroup,
      selectDiagnosis,
      selectSubDiagnosis,
      selectConcreteDiagnosis,
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
