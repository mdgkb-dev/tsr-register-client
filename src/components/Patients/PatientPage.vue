<template>
  <el-row>
    <el-col :span="8">
      <h2 class="header-top-table">Пациенты <i class="el-icon-arrow-right"> </i> Профиль</h2>
    </el-col>
    <el-col :span="3" :offset="11" style="margin-top: 8px" align="right">
      <el-affix :offset="20">
        <el-button type="success" round native-type="submit" @click="submitForm()">Сохранить изменения</el-button>
      </el-affix>
    </el-col>
  </el-row>
  <el-row v-if="mount"><PatientPageInfo :patient="patient"/></el-row>
  <el-row>
    <div class="table-background" style="width: 100%; height: 100%">
      <el-collapse>
        <el-form ref="form" :model="patient" :rules="rules" @submit.prevent="submitForm" label-width="20%" label-position="left">
          <div v-if="mount">
            <el-collapse-item>
              <template #title><h2 class="collapseHeader">Паспортные данные</h2></template>
              <HumanForm :human="patient.human" />
            </el-collapse-item>
            <el-collapse-item>
              <template #title><h2 class="collapseHeader">Антропометрия</h2></template>
              <AnthropometryForm :inHeightWeight="patient.heightWeight" :inBirthDate="patient.human.dateBirth" :isMale="patient.human.isMale" />
            </el-collapse-item>
            <el-collapse-item>
              <template #title><h2 class="collapseHeader">Страховки</h2></template>
              <InsuranceForm :inInsuranceCompaniesOptions="insuranceCompaniesOptions" :inInsuranceCompanyToHuman="patient.human.insuranceCompanyToHuman" />
            </el-collapse-item>
            <el-collapse-item>
              <template #title><h2 class="collapseHeader">Документы</h2></template>
              <DocumentForm :inDocuments="documents" :inDocumentsScans="documentsScans" :inDocumentsValues="documentsValues" />
            </el-collapse-item>
            <el-collapse-item>
              <template #title><h2 class="collapseHeader">Диагнозы</h2></template><MkbForm :inPatientDiagnosis="patient.patientDiagnosis" />
            </el-collapse-item>
            <el-collapse-item>
              <template #title><h2 class="collapseHeader">Инвалидность</h2></template>
              <DisabilityForm :inDisabilities="patient.disabilities" />
            </el-collapse-item>
            <el-collapse-item>
              <template #title><h2 class="collapseHeader">Законные представители</h2></template>
              <PatientToRepresentativeForm
                :inRepresentativeToPatient="patient.representativeToPatient"
                :inRepresentativeTypes="representativeTypesOptions"
                :inRepresentatives="representativeOptions"
              />
            </el-collapse-item>
          </div>
        </el-form>
      </el-collapse>
    </div>
  </el-row>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapActions, mapGetters } from 'vuex';

import HumanForm from '@/components/HumanForm.vue';
import InsuranceForm from '@/components/Patients/InsuranceForm.vue';
import AnthropometryForm from '@/components/Patients/AnthropometryForm.vue';
import DocumentForm from '@/components/DocumentForm.vue';
import MkbForm from '@/components/Patients/MkbForm.vue';
import DisabilityForm from '@/components/Patients/DisabilityForm.vue';
import PatientPageInfo from '@/components/Patients/PatientPageInfo.vue';
import PatientToRepresentativeForm from '@/components/Patients/PatientToRepresentativeForm.vue';
import IInsuranceCompany from '@/interfaces/insuranceCompanies/IInsuranceCompany';
import IOption from '@/interfaces/shared/IOption';
import IDocument from '@/interfaces/documents/IDocument';
import IDocumentScan from '@/interfaces/documentScans/IDocumentScan';
import IDocumentFieldValue from '@/interfaces/documents/IDocumentFieldValue';
import Patient from '@/classes/patients/Patient';
import IDisability from '@/interfaces/disabilities/IDisability';
import HeightWeight from '@/classes/anthropometry/HeightWeight';
import HumanRules from '@/classes/humans/HumanRules';
import IRepresentative from '@/interfaces/representatives/IRepresentative';
import IRepresentativeType from '@/interfaces/representatives/IRepresentativeType';

@Options({
  components: {
    PatientPageInfo,
    HumanForm,
    AnthropometryForm,
    InsuranceForm,
    DocumentForm,
    MkbForm,
    DisabilityForm,
    PatientToRepresentativeForm,
  },
  computed: {
    ...mapGetters('insuranceCompanies', ['insuranceCompanies']),
    ...mapGetters('documents', ['documents']),
    ...mapGetters('disabilities', ['disabilities']),
    ...mapGetters('patients', ['patient']),
    ...mapGetters('representativeTypes', ['representativeTypes']),
    ...mapGetters('representatives', ['representatives']),
  },
  methods: {
    ...mapActions({
      patientGet: 'patients/get',
      insuranceCompaniesGetAll: 'insuranceCompanies/getAll',
      documentsGetAll: 'documents/getAll',
      documentScansUpload: 'documentScans/upload',
      disabilitiesGetAll: 'disabilities/getAll',
      representativeTypesGetAll: 'representativeTypes/getAll',
      representativesGetAll: 'representatives/getAll',
    }),
  },
})
export default class ModalForm extends Vue {
  // Types.
  $refs!: {
    form: any;
    message: any;
  };

  $message!: any;
  $confirm!: any;

  disabilities!: IDisability[];
  isEditMode!: boolean;
  insuranceCompanies!: IInsuranceCompany[];
  insuranceCompaniesOptions!: IOption[];
  documents!: IDocument[];
  documentsScans!: { [id: string]: IDocumentScan[] };
  representatives!: IRepresentative[];
  representativeTypes!: IRepresentativeType[];

  insuranceCompaniesGetAll!: () => Promise<void>;
  documentsGetAll!: () => Promise<void>;
  representativesGetAll!: () => Promise<void>;
  representativeTypesGetAll!: () => Promise<void>;
  patientGet!: (patientId: string) => Promise<void>;

  offset: number[] = [0];

  // Local state.
  patient = new Patient();
  documentsValues: { [documentId: string]: { [fieldId: string]: IDocumentFieldValue } } = {};
  mount = false;
  diagnosisMount = false;
  representativeOptions = [{}];
  representativeTypesOptions = [{}];
  title = '';
  error = '';
  confirmStay = false;
  initialState = '';

  rules = {
    human: HumanRules,
  };

  compareStates() {
    const initial = this.initialState;
    this.initialState = '';
    if (initial !== JSON.stringify(this)) {
      this.confirmStay = true;
    }
  }

  confirmLeave() {
    if (window.confirm('Вы уверены, что хотите покинуть страницу? У вас есть несохранённые изменения!')) {
      this.confirmStay = false;
      return true;
    }
    return false;
  }

  async beforeWindowUnload(e: any) {
    this.compareStates();
    if (this.confirmStay && !this.confirmLeave()) {
      e.preventDefault();
      e.returnValue = '';
    }
  }

  // Lifecycle methods.
  async created(): Promise<void> {
    window.addEventListener('beforeunload', this.beforeWindowUnload);

    if (!this.$route.params.patientId) {
      this.isEditMode = false;
      this.title = 'Создать пациента';
    } else {
      this.isEditMode = true;
      this.title = 'Редактировать пациента';
      await this.patientGet(`${this.$route.params.patientId}`);
      this.patient = this.$store.getters['patients/patient'];
    }
    await this.insuranceCompaniesGetAll();
    await this.documentsGetAll();

    this.insuranceCompaniesOptions = [];
    if (this.patient.disabilities) {
      for (const disability of this.patient.disabilities) {
        if (!disability.edvs) {
          disability.edvs = [];
        }
      }
    }
    if (this.insuranceCompanies) {
      for (const item of this.insuranceCompanies) {
        this.insuranceCompaniesOptions.push({
          label: `${item.name}`,
          value: `${item.id}`,
        });
      }
    }

    let sum = 0;
    this.documentsScans = {};
    this.documentsValues = {};
    if (this.documents) {
      for (const document of this.documents) {
        if (document.documentFields) {
          sum += document.documentFields.length;
        }
        this.offset.push(sum);

        this.documentsScans[document.id as string] = [];
        this.documentsValues[document.id as string] = {};
        if (document.documentFields) {
          for (const field of document.documentFields) {
            let item = this.patient.human.documentFieldToHuman?.find((i: IDocumentFieldValue) => i.documentFieldId === field.id);

            if (item === undefined) {
              item = {
                id: field.id,
                valueString: undefined,
                valueNumber: 0,
                documentFieldId: field.id,
              };
            }
            this.documentsValues[document.id as string][field.id as string] = item;
          }
        }
      }
    }
    for (const scan of this.patient.human.documentScans) {
      if (scan.documentId) {
        this.documentsScans[scan.documentId].push({
          id: scan.id as string,
          documentId: scan.documentId,
          url: scan.id as string,
          name: scan.name as string,
        });
      }
    }

    await this.representativesGetAll();
    await this.representativeTypesGetAll();

    this.representativeTypesOptions.splice(0, 1);
    for (const item of this.representativeTypes) {
      this.representativeTypesOptions.push({
        label: item.name,
        value: item.id,
      });
    }

    this.representativeOptions.splice(0, 1);
    for (const item of this.representatives) {
      this.representativeOptions.push({
        label: `${item.human.surname} ${item.human.name} ${item.human.patronymic}`,
        value: item.id,
        human: item.human,
      });
    }

    this.mount = true;
    this.diagnosisMount = true;
    this.initialState = JSON.stringify(this);
  }

  async beforeUnmount(): Promise<void> {
    window.removeEventListener('beforeunload', this.beforeWindowUnload);
  }

  // Methods.
  async beforeRouteLeave(to: any, from: any, next: any) {
    await this.compareStates();
    if (this.confirmStay && !this.confirmLeave()) {
      next(false);
    } else {
      next();
    }
  }

  async submitForm(): Promise<void> {
    let validationResult = true;

    this.$refs.form.validate((valid: boolean, errorFields: any) => {
      let errorMessage = '<strong>Проверьте правильность введенных данных:</strong><ul>';
      for (const item of Object.keys(errorFields)) {
        errorMessage += `<li>${errorFields[item][0].message}</li>`;
      }
      errorMessage += '</ul>';
      if (!valid) {
        this.$message({
          dangerouslyUseHTMLString: true,
          message: errorMessage,
          type: 'error',
        });
        validationResult = false;
        return false;
      }
      this.$message({
        message: 'Изменения успешно сохранены',
        type: 'success',
      });
      return true;
    });

    if (!validationResult) {
      return;
    }

    for (const item of this.patient.representativeToPatient) {
      item.patient = undefined;
    }

    for (const document in this.documentsScans) {
      if (Object.prototype.hasOwnProperty.call(this.documentsScans, document)) {
        for (const scan of this.documentsScans[document]) {
          this.patient.human.documentScans.push(scan);
        }
      }
    }

    this.patient.human.documentFieldToHuman = [];
    for (const document in this.documentsValues) {
      if (Object.prototype.hasOwnProperty.call(this.documentsValues, document)) {
        for (const field in this.documentsValues[document]) {
          if (Object.prototype.hasOwnProperty.call(this.documentsValues[document], field)) {
            this.patient.human.documentFieldToHuman.push(this.documentsValues[document][field]);
          }
        }
      }
    }

    this.patient.anthropometryData = HeightWeight.toAnthropometryData(this.patient.heightWeight, this.patient.id);

    try {
      if (this.isEditMode) {
        await this.$store.dispatch('patients/edit', this.patient);
      } else {
        await this.$store.dispatch('patients/create', this.patient);
      }
    } catch (e) {
      this.$message.error(e.toString());
      return;
    }

    await this.$router.push('/patients');
  }
}
</script>
