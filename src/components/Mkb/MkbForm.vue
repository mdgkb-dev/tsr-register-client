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
          <el-button v-if="isEditMode" style="margin: 10px" @click="addAnamnesis(props.row)">Добавить анамнез</el-button>
          <div class="block" style="">
            <el-timeline style="margin-top: 20px">
              <el-timeline-item
                v-for="(anamnesis, index) in props.row.patientDiagnosisAnamnesis"
                :key="anamnesis.id"
                :timestamp="formatDate(anamnesis.date)"
                placement="top"
              >
                <AnamnesisForm
                  :anamnesis-id="anamnesis.id"
                  :prop-name="'patientDiagnosis.' + props.$index + '.patientDiagnosisAnamnesis.' + index"
                />
              </el-timeline-item>
            </el-timeline>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="Группа диагноза" align="start" sortable>
        <template #default="scope">
          <el-form-item v-if="isEditMode" label-width="0" style="margin-bottom: 0">
            <el-autocomplete
              v-model="scope.row.mkbDiagnosis.queryStringGroup"
              style="width: 100%"
              popper-class="wide-dropdown"
              :fetch-suggestions="findGroups"
              placeholder="Выберите группу"
              @select="handleGroupSelect($event, scope.row.id)"
              @input="clearForm($event, scope.row.id, false)"
            >
            </el-autocomplete>
          </el-form-item>
          <span v-else>{{ scope.row.mkbDiagnosis.queryStringGroup }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Основной диагноз" align="start" sortable>
        <template #default="scope">
          <el-form-item
            v-if="isEditMode"
            label-width="0"
            style="margin-bottom: 0"
            :prop="
              patientDiagnosis
                ? 'patientDiagnosis.' + scope.$index + '.mkbDiagnosisId'
                : 'registerDiagnosis.' + scope.$index + '.mkbDiagnosisId'
            "
            :rules="[{ required: true, message: 'Необходимо указать основной диагноз', trigger: 'change' }]"
          >
            <el-autocomplete
              v-model="scope.row.mkbDiagnosis.queryStringDiagnosis"
              style="width: 100%"
              popper-class="wide-dropdown"
              :fetch-suggestions="findDiagnosis"
              placeholder="Выберите диагноз"
              @select="handleDiagnosisSelect($event, scope.row.id)"
              @input="clearForm($event, scope.row.id, true)"
            />
          </el-form-item>
          <span v-else>{{ scope.row.mkbDiagnosis.queryStringDiagnosis }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="height" label="Уточнённый диагноз" align="center">
        <template #default="scope">
          <div v-if="isEditMode">
            <el-select
              v-if="scope.row.mkbDiagnosisId && scope.row.mkbDiagnosis.mkbSubDiagnosis.length > 0"
              v-model="scope.row.mkbSubDiagnosisId"
              style="width: 100%"
              placeholder="Выберите уточнённый диагноз"
            >
              <el-option
                v-for="i in scope.row.mkbDiagnosis.mkbSubDiagnosis"
                :key="i.id"
                :label="`${scope.row.mkbDiagnosis.code}.${i.getFullName()}`"
                :value="i.id"
              />
            </el-select>
            <el-select v-else v-model="undefined" style="width: 100%" disabled placeholder="Уточнённых диагнозов нет" />
          </div>
          <span v-else>{{ scope.row.mkbSubDiagnosis ? scope.row.mkbSubDiagnosis.name : 'Уточнённых диагнозов нет' }}</span>
        </template>
      </el-table-column>

      <el-table-column v-if="patientDiagnosis && isEditMode" prop="weight" label="Первичный" width="110" align="center">
        <template #default="scope">
          <el-checkbox v-model="scope.row.primary" />
        </template>
      </el-table-column>
      <el-table-column v-if="isEditMode" width="40" fixed="right" align="center">
        <template #default="scope">
          <TableButtonGroup :show-remove-button="true" @remove="removeDiagnosis(scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineAsyncComponent, defineComponent, PropType, reactive, toRefs } from 'vue';
import { useStore } from 'vuex';

import RegisterDiagnosis from '@/classes/registers/RegisterDiagnosis';
import MkbTreeDialog from '@/components/Mkb/MkbTreeDialog.vue';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IMkbGroup from '@/interfaces/mkb/IMkbGroup';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';
import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';
import IPatientDiagnosisAnamnesis from '@/interfaces/patients/IPatientDiagnosisAnamnesis';
import IRegisterDiagnosis from '@/interfaces/registers/IRegisterDiagnosis';
import ISearch from '@/interfaces/shared/ISearch';
import ISearchDiagnosis from '@/interfaces/shared/ISearchDiagnosis';
import useDateFormat from '@/mixins/useDateFormat';

const AnamnesisForm = defineAsyncComponent(() => import('@/components/Patients/AnamnesisForm.vue'));

export default defineComponent({
  name: 'MkbForm',
  components: {
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
    const store = useStore();
    const { storeModule } = toRefs(props);
    let expandRowKeys: (string | undefined)[] = reactive([]);
    const queryStringsDiagnosis: Record<string, string> = reactive({});
    const queryStringsGroups: Record<string, string> = reactive({});
    const { formatDate } = useDateFormat();
    const isEditMode: ComputedRef<boolean> = computed<boolean>(() => store.getters['patients/isEditMode']);

    const filteredDiagnosis: ComputedRef<IMkbDiagnosis[]> = computed(() => store.getters['mkb/filteredDiagnosis']);

    const patientDiagnosis: boolean = storeModule.value === 'patients';
    const diagnosisData: ComputedRef<(IPatientDiagnosis | IRegisterDiagnosis)[]> = computed(
      () => store.getters[`${storeModule.value}/diagnosis`]
    );
    const mkbDiagnosis: ComputedRef<IMkbDiagnosis[]> = computed(() => store.getters['mkb/mkbDiagnosis']);
    const mkbGroups: ComputedRef<IMkbGroup[]> = computed(() => store.getters['mkb/mkbGroups']);
    const mkbSubDiagnosis: ComputedRef<IMkbSubDiagnosis[]> = computed(() => store.getters['mkb/mkbSubDiagnosis']);

    const addDiagnosis = (): void => store.commit(`${storeModule.value}/addDiagnosis`);
    const removeDiagnosis = (id: string): void => store.commit(`${storeModule.value}/removeDiagnosis`, id);

    const addAnamnesis = (diagnosis: IPatientDiagnosisAnamnesis): void => store.commit(`patients/addAnamnesis`, diagnosis.id);

    const handleExpandChange = (row: IPatientDiagnosis | IRegisterDiagnosis): void => {
      expandRowKeys = row.id === expandRowKeys[0] ? reactive([]) : reactive([row.id]);
    };

    const findDiagnosis = async (query: string, resolve: CallableFunction): Promise<void> => {
      let diagnosis: ISearchDiagnosis[] = [];
      if (filteredDiagnosis.value.length > 0 && query.length === 0) {
        filteredDiagnosis.value.forEach((d: IMkbDiagnosis) => {
          if (d.id) diagnosis.push({ value: d.getFullName(), id: d.id, diagnosis: d });
        });
      }

      if (query.length > 2) {
        diagnosis = [];
        await store.dispatch('mkb/searchDiagnosis', query);
        mkbDiagnosis.value.forEach((d: IMkbDiagnosis) => {
          if (d.id) diagnosis.push({ value: d.getFullName(), id: d.id, diagnosis: d });
        });
      }

      resolve(diagnosis);
    };

    const findGroups = async (query: string, resolve: CallableFunction) => {
      const groups: ISearch[] = [];

      if (query.length === 0) {
        await store.dispatch('mkb/searchGroups', query);
        resolve(groups);
        return;
      }

      if (query.length > 0) {
        await store.dispatch('mkb/searchGroups', query);
        mkbGroups.value.forEach((d: IMkbGroup) => {
          if (d.id && d.name) groups.push({ value: d.getFullName(), id: d.id });
        });
      }

      resolve(groups);
    };

    const findSubDiagnosis = async (diagnosisId: string) => {
      await store.dispatch('mkb/searchSubDiagnosis', diagnosisId);
      diagnosisData.value.forEach((d: IPatientDiagnosis | RegisterDiagnosis) => {
        if (d.mkbDiagnosis && d.mkbDiagnosisId === diagnosisId) d.mkbDiagnosis.mkbSubDiagnosis.push(...mkbSubDiagnosis.value);
      });
    };

    const handleGroupSelect = async (item: ISearch, id: string): Promise<void> => {
      await store.dispatch('mkb/getDiagnosisByGroupId', item.id);
      clearForm('', id);
    };

    const handleDiagnosisSelect = async (item: ISearchDiagnosis, id: string): Promise<void> => {
      const diagnosis = diagnosisData.value.find((d) => d.id === id);
      if (diagnosis) {
        diagnosis.mkbDiagnosisId = item.id;
        diagnosis.mkbDiagnosis = item.diagnosis;
      }
      if (item.diagnosis.mkbGroup) queryStringsGroups[id] = item.diagnosis.mkbGroup.getFullName();
      await findSubDiagnosis(item.id);
    };

    const clearForm = (query: string, id: string): void => {
      if (query.length === 0) return;
      store.commit('mkb/setFilteredDiagnosis', []);
      store.commit(`${storeModule.value}/clearDiagnosis`, id);
    };

    return {
      diagnosisData,
      patientDiagnosis,
      formatDate,
      expandRowKeys,
      filteredDiagnosis,
      mkbDiagnosis,
      mkbGroups,
      mkbSubDiagnosis,
      queryStringsDiagnosis,
      queryStringsGroups,
      addAnamnesis,
      addDiagnosis,
      findDiagnosis,
      findGroups,
      handleDiagnosisSelect,
      handleExpandChange,
      handleGroupSelect,
      removeDiagnosis,
      clearForm,
      isEditMode,
    };
  },
});
</script>
