<template>
  <!-- TODO: Переписать props на store. -->
  <div class="table-under-collapse">
    <el-space style="margin-bottom: 10px">
      {{ patientDiagnosis }}
      <el-button @click="addDiagnosis">Добавить диагноз</el-button>
      <MkbTreeDialog
        v-model:checkedDiagnosis="diagnosisData"
        v-model:diagnosisData="diagnosisData"
        v-model:patientDiagnosis="patientDiagnosis"
        @setDiagnosis="setDiagnosisFromModal($event)"
      />
    </el-space>

    <el-table
      :data="diagnosisData"
      :row-key="(row) => row.id"
      :expand-row-keys="expandRowKeys"
      class="table-shadow"
      header-row-class-name="header-style"
      @expand-change="handleExpandChange"
    >
      <el-table-column type="index" width="60" align="center" />

      <el-table-column v-if="patientDiagnosis" type="expand">
        <template #default="props">
          <el-button style="margin: 10px" @click="addAnamnesis(props.row)">Добавить анамнез</el-button>
          <div class="block" style="">
            <el-timeline style="margin-top: 20px">
              <el-timeline-item
                v-for="(anamnesis, index) in props.row.patientDiagnosisAnamnesis"
                :key="anamnesis.id"
                :timestamp="formatDate(anamnesis.date)"
                placement="top"
              >
                <AnamnesisForm
                  :anamnesis="anamnesis"
                  :index="index"
                  :diagnosis="props.row"
                  :prop-name="'patientDiagnosis.' + props.$index + '.patientDiagnosisAnamnesis.' + index"
                />
              </el-timeline-item>
            </el-timeline>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="Группа диагноза" align="center" sortable>
        <template #default="scope">
          <el-form-item label-width="0" style="margin-bottom: 0">
            <el-autocomplete
              v-model="queryStringsGroups[scope.row.id]"
              style="width: 100%"
              popper-class="wide-dropdown"
              :fetch-suggestions="findGroups"
              placeholder="Выберите группу"
              @select="handleGroupSelect($event, scope.row.id)"
              @input="syncSearchGroups($event, scope.row.id)"
            >
            </el-autocomplete>
          </el-form-item>
        </template>
      </el-table-column>

      <el-table-column label="Основной диагноз" align="center" sortable>
        <template #default="scope">
          <el-form-item
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
              v-model="queryStringsDiagnosis[scope.row.id]"
              style="width: 100%"
              popper-class="wide-dropdown"
              :fetch-suggestions="findDiagnosis"
              placeholder="Выберите диагноз"
              @select="handleDiagnosisSelect($event, scope.row.id)"
              @input="syncSearchDiagnosis($event, scope.row.id)"
            />
          </el-form-item>
        </template>
      </el-table-column>

      <el-table-column prop="height" label="Уточнённый диагноз" align="center">
        <template #default="scope">
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
        </template>
      </el-table-column>

      <el-table-column v-if="patientDiagnosis" prop="weight" label="Первичный" width="110" align="center">
        <template #default="scope">
          <el-checkbox v-model="scope.row.primary" />
        </template>
      </el-table-column>
      <el-table-column width="40" fixed="right" align="center">
        <template #default="scope">
          <TableButtonGroup :show-remove-button="true" @remove="removeDiagnosis(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { v4 as uuidv4 } from 'uuid';
import { computed, ComputedRef, defineAsyncComponent, defineComponent, onBeforeMount, PropType, reactive, toRefs } from 'vue';
import { useStore } from 'vuex';

import PatientDiagnosis from '@/classes/patients/PatientDiagnosis';
import PatientDiagnosisAnamnesis from '@/classes/patients/PatientDiagnosisAnamnesis';
import RegisterDiagnosis from '@/classes/registers/RegisterDiagnosis';
import MkbTreeDialog from '@/components/Mkb/MkbTreeDialog.vue';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IMkbGroup from '@/interfaces/mkb/IMkbGroup';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';
import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';
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
    diagnosisData: {
      type: Array as PropType<(IPatientDiagnosis | IRegisterDiagnosis)[]>,
      default: () => [],
    },
    patientDiagnosis: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props) {
    const store = useStore();
    const { diagnosisData, patientDiagnosis } = toRefs(props);
    let expandRowKeys: (string | undefined)[] = reactive([]);
    const queryStringsDiagnosis: Record<string, string> = reactive({});
    const queryStringsGroups: Record<string, string> = reactive({});

    const { formatDate } = useDateFormat();

    const filteredDiagnosis: ComputedRef<IMkbDiagnosis[]> = computed(() => store.getters['mkb/filteredDiagnosis']);
    const mkbDiagnosis: ComputedRef<IMkbDiagnosis[]> = computed(() => store.getters['mkb/mkbDiagnosis']);
    const mkbGroups: ComputedRef<IMkbGroup[]> = computed(() => store.getters['mkb/mkbGroups']);
    const mkbSubDiagnosis: ComputedRef<IMkbSubDiagnosis[]> = computed(() => store.getters['mkb/mkbSubDiagnosis']);

    onBeforeMount(() => {
      diagnosisData.value.forEach((diagnosisData: PatientDiagnosis | RegisterDiagnosis) => {
        if (diagnosisData.mkbDiagnosis && diagnosisData.id) {
          queryStringsDiagnosis[diagnosisData.id] = diagnosisData.mkbDiagnosis.getFullName();
          if (diagnosisData.mkbDiagnosis.mkbGroup && diagnosisData.mkbDiagnosis.mkbGroup.name) {
            queryStringsGroups[diagnosisData.id] = diagnosisData.mkbDiagnosis.mkbGroup.getFullName();
          }
        }
      });
    });

    const addDiagnosis = (): void => {
      let newDiagnosisData: IPatientDiagnosis | IRegisterDiagnosis;
      if (patientDiagnosis.value) {
        newDiagnosisData = new PatientDiagnosis();
      } else {
        newDiagnosisData = new RegisterDiagnosis();
      }

      newDiagnosisData.id = uuidv4();
      diagnosisData.value.push(newDiagnosisData);
      queryStringsDiagnosis[newDiagnosisData.id] = '';
      queryStringsGroups[newDiagnosisData.id] = '';
    };

    const syncSearchDiagnosis = (query: string, id: string): void => {
      if (query.length === 0) {
        queryStringsGroups[id] = '';
        store.commit('mkb/setFilteredDiagnosis', []);
        const diagnosis = diagnosisData.value.find((d) => d.id === id);

        if (diagnosis) {
          diagnosis.mkbDiagnosis = undefined;
          diagnosis.mkbDiagnosisId = undefined;
          diagnosis.mkbSubDiagnosis = undefined;
          diagnosis.mkbSubDiagnosisId = undefined;
        }
      }
    };

    const syncSearchGroups = (query: string, id: string): void => {
      if (query.length === 0) {
        queryStringsDiagnosis[id] = '';
        store.commit('mkb/setFilteredDiagnosis', []);
        const diagnosis = diagnosisData.value.find((d) => d.id === id);

        if (diagnosis) {
          diagnosis.mkbDiagnosis = undefined;
          diagnosis.mkbDiagnosisId = undefined;
          diagnosis.mkbSubDiagnosis = undefined;
          diagnosis.mkbSubDiagnosisId = undefined;
        }
      }
    };

    const setDiagnosisFromModal = (diagnosis: IPatientDiagnosis | IRegisterDiagnosis): void => {
      if (diagnosis.id && diagnosis.mkbDiagnosis && diagnosis.mkbDiagnosis.mkbGroup) {
        queryStringsDiagnosis[diagnosis.id] = diagnosis.mkbDiagnosis.getFullName();
        queryStringsGroups[diagnosis.id] = diagnosis.mkbDiagnosis.mkbGroup.getFullName();
      }
    };

    const addAnamnesis = (diagnosis: IPatientDiagnosis): void => {
      const anamnesis = new PatientDiagnosisAnamnesis();
      anamnesis.isEditMode = true;
      diagnosis.patientDiagnosisAnamnesis.push(anamnesis);
    };

    const handleExpandChange = (row: IPatientDiagnosis | IRegisterDiagnosis): void => {
      expandRowKeys = row.id === expandRowKeys[0] ? reactive([]) : reactive([row.id]);
    };

    const findDiagnosis = async (query: string, resolve: any): Promise<void> => {
      let diagnosis: ISearchDiagnosis[] = [];
      if (filteredDiagnosis.value.length > 0 && query.length === 0) {
        filteredDiagnosis.value.forEach((d: IMkbDiagnosis) => {
          if (d.id) {
            diagnosis.push({ value: d.getFullName(), id: d.id, diagnosis: d });
          }
        });
      }

      if (query.length > 2) {
        diagnosis = [];
        await store.dispatch('mkb/searchDiagnosis', query);
        mkbDiagnosis.value.forEach((d: IMkbDiagnosis) => {
          if (d.id) {
            diagnosis.push({ value: d.getFullName(), id: d.id, diagnosis: d });
          }
        });
      }

      resolve(diagnosis);
    };

    const findGroups = async (query: string, resolve: any) => {
      const groups: ISearch[] = [];

      if (query.length === 0) {
        await store.dispatch('mkb/searchGroups', query);
        resolve(groups);
        return;
      }

      if (query.length > 0) {
        await store.dispatch('mkb/searchGroups', query);
        mkbGroups.value.forEach((d: IMkbGroup) => {
          if (d.id && d.name) {
            groups.push({ value: d.getFullName(), id: d.id });
          }
        });
      }

      resolve(groups);
    };

    const findSubDiagnosis = async (diagnosisId: string) => {
      await store.dispatch('mkb/searchSubDiagnosis', diagnosisId);
      diagnosisData.value.forEach((d: IPatientDiagnosis | RegisterDiagnosis) => {
        if (d.mkbDiagnosis && d.mkbDiagnosisId === diagnosisId) {
          d.mkbDiagnosis.mkbSubDiagnosis.push(...mkbSubDiagnosis.value);
        }
      });
    };

    const handleGroupSelect = async (item: ISearch, id: string): Promise<void> => {
      await store.dispatch('mkb/getDiagnosisByGroupId', item.id);
      const diagnosis = diagnosisData.value.find((d) => d.id === id);
      queryStringsDiagnosis[id] = '';

      if (diagnosis) {
        diagnosis.mkbDiagnosis = undefined;
        diagnosis.mkbDiagnosisId = undefined;
        diagnosis.mkbSubDiagnosis = undefined;
        diagnosis.mkbSubDiagnosisId = undefined;
      }
    };

    const handleDiagnosisSelect = async (item: ISearchDiagnosis, id: string): Promise<void> => {
      const diagnosis = diagnosisData.value.find((d) => d.id === id);

      if (diagnosis) {
        diagnosis.mkbDiagnosisId = item.id;
        diagnosis.mkbDiagnosis = item.diagnosis;
      }

      if (item.diagnosis.mkbGroup) {
        queryStringsGroups[id] = item.diagnosis.mkbGroup.getFullName();
      }

      await findSubDiagnosis(item.id);
    };

    const removeDiagnosis = (item: any): void => {
      const index = diagnosisData.value.indexOf(item);
      if (index !== -1) {
        diagnosisData.value.splice(index, 1);
      }
    };

    return {
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
      setDiagnosisFromModal,
      syncSearchDiagnosis,
      syncSearchGroups,
    };
  },
});
</script>
