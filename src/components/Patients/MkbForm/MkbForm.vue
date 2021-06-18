<template>
  <div class="table-under-collapse">
    <el-button @click="addDiagnosis">Добавить диагноз</el-button>

    <MkbTreeDialog @setDiagnosis="setDiagnosisFromModal($event)" v-model:patientDiagnosis="patientDiagnosis" />

    <el-table :data="patientDiagnosis" :row-key="row => row.id" :expand-row-keys="expandRowKeys" @expand-change="handleExpandChange">
      <el-table-column type="expand">
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
      <el-table-column prop="weight" label="Первичный" width="90">
        <template #default="scope">
          <el-checkbox v-model="scope.row.primary" />
        </template>
      </el-table-column>
      <el-table-column width="120">
        <template #default="scope">
          <el-button @click="removeDiagnosis(scope.row)" type="text" size="small">Удалить</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

import { mapActions, mapGetters } from 'vuex';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import ISearch from '@/interfaces/shared/ISearch';
import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';
import PatientDiagnosis from '@/classes/patients/PatientDiagnosis';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';
import { defineAsyncComponent } from 'vue';
import PatientDiagnosisAnamnesis from '@/classes/patients/PatientDiagnosisAnamnesis';
import IMkbGroup from '@/interfaces/mkb/IMkbGroup';
import MkbTreeDialog from '@/components/Patients/MkbForm/MkbTreeDialog.vue';
import { v4 as uuidv4 } from 'uuid';
import ISearchDiagnosis from '@/interfaces/shared/ISearchDiagnosis';

const AnamnesisForm = defineAsyncComponent(() => import('@/components/Patients/AnamnesisForm.vue'));

@Options({
  components: {
    AnamnesisForm,
    MkbTreeDialog,
  },
  props: ['patientDiagnosis'],
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

  patientDiagnosis!: IPatientDiagnosis[];

  searchGroups!: (query: string) => Promise<void>;

  searchDiagnosis!: (query: string) => Promise<void>;
  searchSubDiagnosis!: (diagnosisId: string) => Promise<void>;
  getDiagnosisByGroupId!: (groupId: string) => Promise<void>;

  // Local state.
  expandRowKeys: (string | undefined)[] = [];

  mounted(): void {
    this.patientDiagnosis.forEach((patientDiagnosis: PatientDiagnosis) => {
      if (patientDiagnosis.mkbDiagnosis && patientDiagnosis.id) {
        this.queryStringsDiagnosis[patientDiagnosis.id] = patientDiagnosis.mkbDiagnosis.getFullName();
        if (patientDiagnosis.mkbDiagnosis.mkbGroup && patientDiagnosis.mkbDiagnosis.mkbGroup.name) {
          this.queryStringsGroups[patientDiagnosis.id] = patientDiagnosis.mkbDiagnosis.mkbGroup.getFullName();
        }
      }
    });
  }

  addDiagnosis(): void {
    const patientDiagnosis = new PatientDiagnosis();
    patientDiagnosis.id = uuidv4();
    this.patientDiagnosis.push(patientDiagnosis);
    this.queryStringsDiagnosis[patientDiagnosis.id] = '';
    this.queryStringsGroups[patientDiagnosis.id] = '';
  }

  syncSearchDiagnosis(query: string, id: string): void {
    if (query.length === 0) {
      this.queryStringsGroups[id] = '';
      this.filteredDiagnosis = [];
      const diagnosis = this.patientDiagnosis.find(d => d.id === id);
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
      const diagnosis = this.patientDiagnosis.find(d => d.id === id);
      if (diagnosis) {
        diagnosis.mkbDiagnosis = undefined;
        diagnosis.mkbDiagnosisId = undefined;
        diagnosis.mkbSubDiagnosis = undefined;
        diagnosis.mkbSubDiagnosisId = undefined;
      }
    }
  }

  setDiagnosisFromModal(diagnosis: IPatientDiagnosis): void {
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

  handleExpandChange = (row: IPatientDiagnosis) => {
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
    this.patientDiagnosis.forEach((d: IPatientDiagnosis) => {
      if (d.mkbDiagnosis && d.mkbDiagnosisId === diagnosisId) {
        d.mkbDiagnosis.mkbSubDiagnosis.push(...this.mkbSubDiagnosis);
      }
    });
  }

  async handleGroupSelect(item: ISearch, id: string) {
    await this.getDiagnosisByGroupId(item.id);
    const diagnosis = this.patientDiagnosis.find(d => d.id === id);
    this.queryStringsDiagnosis[id] = '';
    if (diagnosis) {
      diagnosis.mkbDiagnosis = undefined;
      diagnosis.mkbDiagnosisId = undefined;
      diagnosis.mkbSubDiagnosis = undefined;
      diagnosis.mkbSubDiagnosisId = undefined;
    }
  }

  async handleDiagnosisSelect(item: ISearchDiagnosis, id: string) {
    const diagnosis = this.patientDiagnosis.find(d => d.id === id);
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
    const index = this.patientDiagnosis.indexOf(item);
    if (index !== -1) {
      this.patientDiagnosis.splice(index, 1);
    }
  }
}
</script>
