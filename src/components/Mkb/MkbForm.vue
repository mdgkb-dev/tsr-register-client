<template>
  <div class="table-under-collapse">
    <el-space style="margin-bottom: 10px">
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
                :timestamp="$dateFormatRu(anamnesis.date)"
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
import { defineAsyncComponent } from 'vue';
import { Options, Vue } from 'vue-class-component';
import { mapActions, mapGetters } from 'vuex';

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

const AnamnesisForm = defineAsyncComponent(() => import('@/components/Patients/AnamnesisForm.vue'));

@Options({
  name: 'MkbForm',
  components: {
    AnamnesisForm,
    MkbTreeDialog,
    TableButtonGroup,
  },
  props: ['diagnosisData', 'patientDiagnosis'],
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
export default class MkbForm extends Vue {
  // Types.
  queryStringsGroups: Record<string, string> = {};
  queryStringsDiagnosis: Record<string, string> = {};

  mkbDiagnosis!: IMkbDiagnosis[];
  mkbGroups!: IMkbGroup[];
  mkbSubDiagnosis!: IMkbSubDiagnosis[];
  filteredDiagnosis!: IMkbDiagnosis[];

  diagnosisData!: Array<IPatientDiagnosis | IRegisterDiagnosis>;
  patientDiagnosis?: boolean;

  searchGroups!: (query: string) => Promise<void>;

  searchDiagnosis!: (query: string) => Promise<void>;
  searchSubDiagnosis!: (diagnosisId: string) => Promise<void>;
  getDiagnosisByGroupId!: (groupId: string) => Promise<void>;

  // Local state.
  expandRowKeys: (string | undefined)[] = [];

  mounted(): void {
    this.diagnosisData.forEach((diagnosisData: PatientDiagnosis | RegisterDiagnosis) => {
      if (diagnosisData.mkbDiagnosis && diagnosisData.id) {
        this.queryStringsDiagnosis[diagnosisData.id] = diagnosisData.mkbDiagnosis.getFullName();
        if (diagnosisData.mkbDiagnosis.mkbGroup && diagnosisData.mkbDiagnosis.mkbGroup.name) {
          this.queryStringsGroups[diagnosisData.id] = diagnosisData.mkbDiagnosis.mkbGroup.getFullName();
        }
      }
    });
  }

  addDiagnosis(): void {
    let diagnosisData;
    if (this.patientDiagnosis) {
      diagnosisData = new PatientDiagnosis();
    } else {
      diagnosisData = new RegisterDiagnosis();
    }
    diagnosisData.id = uuidv4();
    this.diagnosisData.push(diagnosisData);
    this.queryStringsDiagnosis[diagnosisData.id] = '';
    this.queryStringsGroups[diagnosisData.id] = '';
  }

  syncSearchDiagnosis(query: string, id: string): void {
    if (query.length === 0) {
      this.queryStringsGroups[id] = '';
      this.filteredDiagnosis = [];
      const diagnosis = this.diagnosisData.find((d) => d.id === id);
      if (diagnosis) {
        diagnosis.mkbDiagnosis = undefined;
        diagnosis.mkbDiagnosisId = undefined;
        diagnosis.mkbSubDiagnosis = undefined;
        diagnosis.mkbSubDiagnosisId = undefined;
      }
    }
  }

  syncSearchGroups(query: string, id: string): void {
    if (query.length === 0) {
      this.queryStringsDiagnosis[id] = '';
      this.filteredDiagnosis = [];
      const diagnosis = this.diagnosisData.find((d) => d.id === id);
      if (diagnosis) {
        diagnosis.mkbDiagnosis = undefined;
        diagnosis.mkbDiagnosisId = undefined;
        diagnosis.mkbSubDiagnosis = undefined;
        diagnosis.mkbSubDiagnosisId = undefined;
      }
    }
  }

  setDiagnosisFromModal(diagnosis: IPatientDiagnosis | IRegisterDiagnosis): void {
    if (diagnosis.id && diagnosis.mkbDiagnosis && diagnosis.mkbDiagnosis.mkbGroup) {
      this.queryStringsDiagnosis[diagnosis.id] = diagnosis.mkbDiagnosis.getFullName();
      this.queryStringsGroups[diagnosis.id] = diagnosis.mkbDiagnosis.mkbGroup.getFullName();
    }
  }

  addAnamnesis = (diagnosis: IPatientDiagnosis) => {
    const anamnesis = new PatientDiagnosisAnamnesis();
    anamnesis.isEditMode = true;
    diagnosis.patientDiagnosisAnamnesis.push(anamnesis);
  };

  handleExpandChange = (row: IPatientDiagnosis | IRegisterDiagnosis) => {
    this.expandRowKeys = row.id === this.expandRowKeys[0] ? [] : [row.id];
  };

  async findDiagnosis(query: string, resolve: any) {
    let diagnosis: ISearchDiagnosis[] = [];
    if (this.filteredDiagnosis.length > 0 && query.length === 0) {
      this.filteredDiagnosis.forEach((d: IMkbDiagnosis) => {
        if (d.id) {
          diagnosis.push({ value: d.getFullName(), id: d.id, diagnosis: d });
        }
      });
    }

    if (query.length > 2) {
      diagnosis = [];
      await this.searchDiagnosis(query);
      this.mkbDiagnosis.forEach((d: IMkbDiagnosis) => {
        if (d.id) {
          diagnosis.push({ value: d.getFullName(), id: d.id, diagnosis: d });
        }
      });
    }
    resolve(diagnosis);
  }

  async findGroups(query: string, resolve: any) {
    const groups: ISearch[] = [];
    if (query.length === 0) {
      await this.searchGroups(query);
      resolve(groups);
      return;
    }
    if (query.length > 0) {
      await this.searchGroups(query);
      this.mkbGroups.forEach((d: IMkbGroup) => {
        if (d.id && d.name) {
          groups.push({ value: d.getFullName(), id: d.id });
        }
      });
    }
    resolve(groups);
  }

  async findSubDiagnosis(diagnosisId: string) {
    await this.searchSubDiagnosis(diagnosisId);
    this.diagnosisData.forEach((d: IPatientDiagnosis | RegisterDiagnosis) => {
      if (d.mkbDiagnosis && d.mkbDiagnosisId === diagnosisId) {
        d.mkbDiagnosis.mkbSubDiagnosis.push(...this.mkbSubDiagnosis);
      }
    });
  }

  async handleGroupSelect(item: ISearch, id: string) {
    await this.getDiagnosisByGroupId(item.id);
    const diagnosis = this.diagnosisData.find((d) => d.id === id);
    this.queryStringsDiagnosis[id] = '';
    if (diagnosis) {
      diagnosis.mkbDiagnosis = undefined;
      diagnosis.mkbDiagnosisId = undefined;
      diagnosis.mkbSubDiagnosis = undefined;
      diagnosis.mkbSubDiagnosisId = undefined;
    }
  }

  async handleDiagnosisSelect(item: ISearchDiagnosis, id: string) {
    const diagnosis = this.diagnosisData.find((d) => d.id === id);
    if (diagnosis) {
      diagnosis.mkbDiagnosisId = item.id;
      diagnosis.mkbDiagnosis = item.diagnosis;
    }
    if (item.diagnosis.mkbGroup) {
      this.queryStringsGroups[id] = item.diagnosis.mkbGroup.getFullName();
    }
    await this.findSubDiagnosis(item.id);
  }

  removeDiagnosis(item: any): void {
    const index = this.diagnosisData.indexOf(item);
    if (index !== -1) {
      this.diagnosisData.splice(index, 1);
    }
  }
}
</script>
