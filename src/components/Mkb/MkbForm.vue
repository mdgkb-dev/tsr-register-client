<template>
  <div class="table-under-collapse">
    <el-space style="margin-bottom: 10px">
      <el-button @click="addDiagnosis">Добавить диагноз</el-button>
      <MkbTreeDialog
        @setDiagnosis="setDiagnosisFromModal($event)"
        v-model:checkedDiagnosis="diagnosisData"
        v-model:diagnosisData="diagnosisData"
        v-model:patientDiagnosis="patientDiagnosis"
      />
    </el-space>

    <el-table :data="diagnosisData" :row-key="row => row.id" :expand-row-keys="expandRowKeys" @expand-change="handleExpandChange">
      <el-table-column v-if="patientDiagnosis" type="expand">
        <template #default="props">
          <el-button @click="addAnamnesis(props.row)" stryle="margin: 100px">Добавить анамнез</el-button>
          <div class="block" style="">
            <el-timeline style="margin-top: 20px">
              <el-timeline-item v-for="(anamnesis, index) in props.row.patientDiagnosisAnamnesis" :key="index" :timestamp="$dateFormatRu(anamnesis.date)" placement="top">
                <AnamnesisForm
                  :anamnesis="anamnesis"
                  :index="index"
                  :diagnosis="props.row"
                  :propName="'patientDiagnosis.' + props.$index + '.patientDiagnosisAnamnesis.' + index"
                />
              </el-timeline-item>
            </el-timeline>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Группа диагноза" width="450">
        <template #default="scope">
          <el-autocomplete
            style="width: 100%"
            popper-class="wide-dropdown"
            @select="handleGroupSelect($event, scope.row.id)"
            :fetch-suggestions="findGroups"
            @input="syncSearchGroups($event, scope.row.id)"
            v-model="queryStringsGroups[scope.row.id]"
            placeholder="Выберите группу"
          >
          </el-autocomplete>
        </template>
      </el-table-column>
      <el-table-column label="Основной диагноз" width="450" sortable>
        <template #default="scope">
          <el-autocomplete
            style="width: 100%"
            @select="handleDiagnosisSelect($event, scope.row.id)"
            popper-class="wide-dropdown"
            :fetch-suggestions="findDiagnosis"
            @input="syncSearchDiagnosis($event, scope.row.id)"
            placeholder="Выберите диагноз"
            v-model="queryStringsDiagnosis[scope.row.id]"
          />
        </template>
      </el-table-column>
      <el-table-column prop="height" label="Уточнённый диагноз" width="450">
        <template #default="scope">
          <el-select
            style="width: 100%"
            v-model="scope.row.mkbSubDiagnosisId"
            v-if="scope.row.mkbDiagnosisId && scope.row.mkbDiagnosis.mkbSubDiagnosis.length > 0"
            placeholder="Выберите уточнённый диагноз"
          >
            <el-option v-for="i in scope.row.mkbDiagnosis.mkbSubDiagnosis" :key="i.id" :label="`${scope.row.mkbDiagnosis.code}.${i.getFullName()}`" :value="i.id" />
          </el-select>
          <el-select style="width: 100%" v-else disabled v-model="undefined" placeholder="Уточнённых диагнозов нет" />
        </template>
      </el-table-column>
      <el-table-column v-if="patientDiagnosis" prop="weight" label="Первичный" width="90">
        <template #default="scope">
          <el-checkbox v-model="scope.row.primary" />
        </template>
      </el-table-column>
      <el-table-column width="120">
        <template #default="scope">
          <el-button @click="removeDiagnosis(scope.row)" type="text" size="small" round>Удалить</el-button>
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
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IMkbGroup from '@/interfaces/mkb/IMkbGroup';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';
import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';
import IRegisterDiagnosis from '@/interfaces/registers/IRegisterDiagnosis';
import ISearch from '@/interfaces/shared/ISearch';
import ISearchDiagnosis from '@/interfaces/shared/ISearchDiagnosis';

const AnamnesisForm = defineAsyncComponent(() => import('@/components/Patients/AnamnesisForm.vue'));

@Options({
  components: {
    AnamnesisForm,
    MkbTreeDialog,
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
