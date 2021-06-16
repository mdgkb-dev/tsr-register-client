<template>
  <div class="table-under-collapse">
    <el-button @click="addDiagnosis">Добавить диагноз</el-button>
    <el-button @click="addDiagnosisModal">Добавить диагноз из списка</el-button>

    <el-dialog v-if="diagnosisModalVisible" v-model="diagnosisModalVisible" width="90%">
      <el-row>
        <el-col :span="12">
          <h3>Список диагнозов</h3>
          <MkbTree
            :checkedDiagnosis="checkedDiagnosis"
            :selectable="true"
            @setDiagnosis="setDiagnosis"
            @removeDiagnosis="removeCheckedDiagnosis"
            @setSubDiagnosis="setSubDiagnosis"
          ></MkbTree>
        </el-col>
        <el-col :span="10" :offset="2">
          <h3>Добавленные диагнозы</h3>
          <el-table :data="checkedDiagnosis" style="width: 100%; margin-bottom: 20px">
            <el-table-column type="index" width="50" />
            <el-table-column prop="mkbDiagnosis.name" label="Основной диагноз" width="300"> </el-table-column>
            <el-table-column prop="mkbSubDiagnosis.name" label="Уточнённый диагноз" width="400"> </el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelDiagnosisFromModal">Отменить</el-button>
          <el-button type="primary" @click="addDiagnosisFromModal">Добавить диагноз</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-if="diagnosisSearchModalVisible" v-model="diagnosisSearchModalVisible" width="90%">
      <el-row>
        <el-col :span="12">
          <h3>Поиск</h3>
          <el-autocomplete
            popper-class="wide-dropdown"
            @select="handleGroupSelect($event)"
            :fetch-suggestions="findGroups"
            v-model="queryStringsGroups[0]"
            placeholder="Выберите группу"
          >
          </el-autocomplete>
          <el-autocomplete
            @select="handleDiagnosisSelect($event)"
            popper-class="wide-dropdown"
            :fetch-suggestions="findDiagnosis"
            v-model="queryStringsDiagnosis[0]"
            placeholder="Выберите диагноз"
          >
            <template #default="{ item }">
              <div class="value">{{ item.value }}</div>
            </template>
          </el-autocomplete>

          <!--          <el-select v-model="scope.row.mkbSubDiagnosisId" v-if="scope.row.mkbDiagnosisId" placeholder="Выберите диагноз">-->
          <!--            <el-option v-for="i in mkbSubDiagnosisOption" :key="i.value" :label="i.label" :value="i.value" />-->
          <!--          </el-select>-->
        </el-col>
        <el-col :span="10" :offset="2">
          <h3>Добавленные диагнозы</h3>
          <el-table :data="checkedDiagnosis" style="width: 100%; margin-bottom: 20px">
            <el-table-column type="index" width="50" />
            <el-table-column prop="mkbDiagnosis.name" label="Основной диагноз" width="300"> </el-table-column>
            <el-table-column prop="mkbSubDiagnosis.name" label="Уточнённый диагноз" width="400"> </el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelDiagnosisFromModal">Отменить</el-button>
          <el-button type="primary" @click="addDiagnosisFromModal">Добавить диагноз</el-button>
        </span>
      </template>
    </el-dialog>

    <el-table :data="patientDiagnosis" :row-key="row => row.id" :expand-row-keys="expandRowKeys" @expand-change="handleExpandChange">
      <el-table-column type="expand">
        <template #default="props">
          <el-button @click="addAnamnesis(props.row)" stryle="margin: 100px">Добавить анамнез</el-button>
          <div class="block" style="">
            <el-timeline style="margin-top: 20px">
              <el-timeline-item
                v-for="(anamnesis, index) in props.row.patientDiagnosisAnamnesis"
                :key="index"
                :timestamp="fillDateFormat(anamnesis.date)"
                placement="top"
              >
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

      <el-table-column label="Основной диагноз" width="450" sortable>
        <template #default="scope">
          <div>{{ scope.row.mkbDiagnosis.code }} {{ scope.row.mkbDiagnosis.name }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="height" label="Уточнённый диагноз" width="450">
        <template #default="scope">
          <div v-if="scope.row.mkbSubDiagnosis">{{ scope.row.mkbDiagnosis.code }}.{{ scope.row.mkbSubDiagnosis.subCode }} {{ scope.row.mkbSubDiagnosis.name }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="Первичный" width="120">
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
import IOption from '@/interfaces/shared/IOption';
import { defineAsyncComponent } from 'vue';
import PatientDiagnosisAnamnesis from '@/classes/patients/PatientDiagnosisAnamnesis';
import IMkbGroup from '@/interfaces/mkb/IMkbGroup';

const MkbTree = defineAsyncComponent(() => import('@/components/MkbTree.vue'));
const AnamnesisForm = defineAsyncComponent(() => import('@/components/Patients/AnamnesisForm.vue'));

@Options({
  components: {
    MkbTree,
    AnamnesisForm,
  },
  props: ['in-patient-diagnosis'],
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
  queryStringsGroups = [];
  queryStringsDiagnosis = [];

  mkbDiagnosis!: IMkbDiagnosis[];
  mkbGroups!: IMkbGroup[];
  mkbSubDiagnosis!: IMkbSubDiagnosis[];
  filteredDiagnosis!: IMkbDiagnosis[];

  inPatientDiagnosis!: IPatientDiagnosis[];

  searchDiagnosis!: (query: string) => Promise<void>;
  searchGroups!: (query: string) => Promise<void>;
  searchSubDiagnosis!: (diagnosisId: string) => Promise<void>;
  getDiagnosisByGroupId!: (groupId: string) => Promise<void>;

  diagnosis: ISearch[] = [];
  groups: ISearch[] = [];
  mkbSubDiagnosisOption: IOption[] = [];

  // Local state.
  patientDiagnosis = this.inPatientDiagnosis;
  diagnosisModalVisible = false;
  diagnosisSearchModalVisible = false;
  checkedDiagnosis: IPatientDiagnosis[] = this.inPatientDiagnosis;
  expandRowKeys: (string | undefined)[] = [];

  cancelDiagnosisFromModal(): void {
    this.diagnosisModalVisible = false;
  }

  addDiagnosis(): void {
    this.diagnosisSearchModalVisible = true;
  }

  addAnamnesis = (diagnosis: IPatientDiagnosis) => {
    const anamnesis = new PatientDiagnosisAnamnesis();
    anamnesis.isEditMode = true;
    diagnosis.patientDiagnosisAnamnesis.push(anamnesis);
  };

  handleExpandChange = (row: IPatientDiagnosis) => {
    this.expandRowKeys = row.id === this.expandRowKeys[0] ? [] : [row.id];
  };

  addDiagnosisModal(): void {
    this.diagnosisModalVisible = true;
  }

  addDiagnosisFromModal(): void {
    this.diagnosisModalVisible = false;
    this.patientDiagnosis = this.checkedDiagnosis;
  }

  setDiagnosis(diagnosis: IMkbDiagnosis): void {
    const patientDiagnosis = new PatientDiagnosis();
    patientDiagnosis.mkbDiagnosis = diagnosis;
    patientDiagnosis.mkbDiagnosisId = diagnosis.id;
    this.checkedDiagnosis.push(patientDiagnosis);
  }

  setSubDiagnosis(subDiagnosis: IMkbSubDiagnosis, diagnosis: IMkbDiagnosis): void {
    const patientDiagnosis = new PatientDiagnosis();
    patientDiagnosis.mkbSubDiagnosis = subDiagnosis;
    patientDiagnosis.mkbSubDiagnosisId = subDiagnosis.id;

    patientDiagnosis.mkbDiagnosis = diagnosis;
    patientDiagnosis.mkbDiagnosisId = diagnosis.id;
    this.checkedDiagnosis.push(patientDiagnosis);
  }

  async findDiagnosis(query: string, resolve: any) {
    console.log(this.filteredDiagnosis);
    if (this.filteredDiagnosis.length > 0) {
      this.diagnosis = [];
      this.filteredDiagnosis.forEach((d: IMkbDiagnosis) => {
        if (d.id) {
          this.diagnosis.push({ value: d.getFullName(), id: d.id });
        }
      });
      resolve(this.diagnosis);
    }
    if (query.length > 2) {
      await this.searchDiagnosis(query);
      this.diagnosis = [];
      this.mkbDiagnosis.forEach((d: IMkbDiagnosis) => {
        if (d.id) {
          this.diagnosis.push({ value: d.getFullName(), id: d.id });
        }
      });
      resolve(this.diagnosis);
    }
  }

  async findGroups(query: string, resolve: any) {
    if (query.length > 0) {
      await this.searchGroups(query);
      this.groups = [];
      this.mkbGroups.forEach((d: IMkbGroup) => {
        if (d.id && d.name) {
          this.groups.push({ value: d.name, id: d.id });
        }
      });
      resolve(this.groups);
    }
  }

  async findSubDiagnosis(diagnosisId: string) {
    await this.searchSubDiagnosis(diagnosisId);
    this.mkbSubDiagnosisOption = [];
    this.mkbSubDiagnosis.forEach((d: IMkbSubDiagnosis) => {
      if (d.id) {
        this.mkbSubDiagnosisOption.push({ label: d.getFullName(), value: d.id });
      }
    });
  }

  async handleGroupSelect(item: ISearch) {
    await this.getDiagnosisByGroupId(item.id);
  }

  async handleDiagnosisSelect(item: ISearch) {
    // console.log(index);
    // this.patientDiagnosis[index].mkbDiagnosisId = item.id;
    await this.findSubDiagnosis(item.id);
  }

  removeCheckedDiagnosis(item: any): void {
    const checkedDiagnosis = this.checkedDiagnosis.filter(
      (diagnosis: IPatientDiagnosis) => diagnosis.mkbDiagnosisId === item.id || diagnosis.mkbSubDiagnosisId === item.id
    );
    checkedDiagnosis.forEach((d: any) => {
      const index = this.checkedDiagnosis.indexOf(d);
      if (index !== -1) {
        this.patientDiagnosis.splice(index, 1);
      }
    });
  }

  removeDiagnosis(item: any): void {
    const index = this.patientDiagnosis.indexOf(item);
    if (index !== -1) {
      this.patientDiagnosis.splice(index, 1);
    }
  }
  fillDateFormat = (date: Date) => (date ? Intl.DateTimeFormat('ru-RU').format(new Date(date)) : '');
}
</script>
