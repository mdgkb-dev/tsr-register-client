<template>
  <div class="patient-page-container">
    <PageHead :titleParent="'Пациенты'" :title="'Профиль'" @submitForm="submitForm" />
    <el-row v-if="mount"><PatientPageInfo :patient="patient"/></el-row>
    <el-row>
      <!-- <div class="table-background" style="width: 100%; height: 100%"> -->
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
              <template #title><h2 class="collapseHeader">Диагнозы</h2></template>
              <MkbForm v-model:diagnosisData="patient.patientDiagnosis" :patientDiagnosis="true" />
            </el-collapse-item>
            <el-collapse-item>
              <template #title><h2 class="collapseHeader">Инвалидность</h2></template>
              <DisabilityForm :inDisabilities="patient.disabilities" :inBirthDate="patient.human.dateBirth" />
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
      <!-- </div> -->
    </el-row>
  </div>
</template>

<script lang="ts">
import { Options, mixins } from 'vue-class-component';
import { mapActions, mapGetters } from 'vuex';

import HumanForm from '@/components/HumanForm.vue';
import InsuranceForm from '@/components/Patients/InsuranceForm.vue';
import AnthropometryForm from '@/components/Patients/AnthropometryForm.vue';
import DocumentForm from '@/components/DocumentForm.vue';
import MkbForm from '@/components/Mkb/MkbForm.vue';
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
import IAnthropometry from '@/interfaces/anthropometry/IAnthropometry';
import ValidateMixin from '@/mixins/ValidateMixin.vue';
import ConfirmLeavePage from '@/mixins/ConfirmLeavePage.vue';
import FormMixin from '@/mixins/FormMixin.vue';
import PageHead from '@/components/PageHead.vue';

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
    PageHead,
  },
  computed: {
    ...mapGetters('anthropometry', ['anthropometries']),
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
      anthropometryGetAll: 'anthropometry/getAll',
      insuranceCompaniesGetAll: 'insuranceCompanies/getAll',
      documentsGetAll: 'documents/getAll',
      documentScansUpload: 'documentScans/upload',
      disabilitiesGetAll: 'disabilities/getAll',
      representativeTypesGetAll: 'representativeTypes/getAll',
      representativesGetAll: 'representatives/getAll',
    }),
  },
})
export default class ModalForm extends mixins(ValidateMixin, ConfirmLeavePage, FormMixin) {
  // Types.
  disabilities!: IDisability[];
  anthropometries!: IAnthropometry[];
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
  anthropometryGetAll!: () => Promise<void>;

  offset: number[] = [0];

  // Local state.
  patient = new Patient();
  documentsValues: { [documentId: string]: { [fieldId: string]: IDocumentFieldValue } } = {};
  mount = false;
  diagnosisMount = false;
  representativeOptions: IOption[] = [];
  representativeTypesOptions: IOption[] = [];

  rules = {
    human: HumanRules,
  };

  // Lifecycle methods.
  async created(): Promise<void> {
    window.addEventListener('beforeunload', this.beforeWindowUnload);

    if (!this.$route.params.patientId) {
      this.isEditMode = false;
    } else {
      this.isEditMode = true;
      await this.patientGet(`${this.$route.params.patientId}`);
      this.patient = this.$store.getters['patients/patient'];
    }
    await this.insuranceCompaniesGetAll();
    await this.documentsGetAll();
    await this.anthropometryGetAll();

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
    if (this.representativeTypes) {
      for (const item of this.representativeTypes) {
        if (item.id) {
          this.representativeTypesOptions.push({
            label: item.name,
            value: item.id,
          });
        }
      }
    }

    this.representativeOptions.splice(0, 1);
    if (this.representatives) {
      for (const item of this.representatives) {
        if (item.id) {
          this.representativeOptions.push({
            label: `${item.human.surname} ${item.human.name} ${item.human.patronymic}`,
            value: item.id,
          });
        }
      }
    }

    this.mount = true;
    this.diagnosisMount = true;
    this.initialState = JSON.stringify(this);
  }

  async submitForm(): Promise<void> {
    if (!this.validate(this.$refs.form)) return;

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

    let heightId: string | undefined = '';
    let weightId: string | undefined = '';
    this.anthropometries.forEach((a: IAnthropometry) => {
      if (a.isHeight()) heightId = a.id;
      if (a.isWeight()) weightId = a.id;
    });

    this.patient.anthropometryData = HeightWeight.toAnthropometryData(this.patient.heightWeight, heightId, weightId, this.patient.id);
    await this.submitHandling('patients', this.patient);
  }
}
</script>

<style lang="scss" scoped>
.patient-page-container:deep {
  @import '@/assets/elements/collapse.scss';
}
</style>
