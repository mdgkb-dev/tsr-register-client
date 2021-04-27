<template>
  <h2>{{ title }}</h2>
  <el-form
    ref="form"
    :model="patient"
    :rules="rules"
    @submit.prevent="submitForm"
    label-width="10vw"
    label-position="right"
  >
    <div v-if="mount">
      <HumanForm :human="patient.human" />
      <AnthropometryForm
        :inAnthropometry="anthropometry"
        :inAnthropometryData="patient.anthropometryData"
      />
      <InsuranceForm
        :inInsuranceCompaniesOptions="insuranceCompaniesOptions"
        :inInsuranceCompanyToHuman="patient.human.insuranceCompanyToHuman"
      />
      <DocumentForm
        :inDocuments="documents"
        :inDocumentsScans="documentsScans"
        :inDocumentsValues="documentsValues"
      />
      <MkbForm :inMkbObtions="mkbOptions" :inMkbToPatient="patient.mkbToPatient" />
      <DisabilityForm :inDisabilities="patient.disabilities" />
    </div>
    <div class="center-align">
      <el-button type="primary" native-type="submit">Сохранить</el-button>
    </div>
  </el-form>
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

import IAnthropometry from '@/interfaces/anthropometry/IAnthropometry';
import IInsuranceCompany from '@/interfaces/insuranceCompanies/IInsuranceCompany';
import IMkb from '@/interfaces/mkb/IMkb';
import IOption from '@/interfaces/shared/IOption';
import IDocument from '@/interfaces/documents/IDocument';
import IDocumentScan from '@/interfaces/documentScans/IDocumentScan';
import IDocumentFieldValue from '@/interfaces/documents/IDocumentFieldValue';
import Patient from '@/classes/patients/Patient';
import IDisability from '@/interfaces/disabilities/IDisability';

@Options({
  components: {
    HumanForm,
    AnthropometryForm,
    InsuranceForm,
    DocumentForm,
    MkbForm,
    DisabilityForm,
  },
  computed: {
    ...mapGetters('anthropometry', ['anthropometry']),
    ...mapGetters('insuranceCompanies', ['insuranceCompanies']),
    ...mapGetters('mkb', ['mkb']),
    ...mapGetters('documents', ['documents']),
    ...mapGetters('disabilities', ['disabilities']),
  },
  methods: {
    ...mapActions({
      patientGet: 'patients/get',
      anthropometryGetAll: 'anthropometry/getAll',
      insuranceCompaniesGetAll: 'insuranceCompanies/getAll',
      mkbGetAll: 'mkb/getAll',
      documentsGetAll: 'documents/getAll',
      documentScansUpload: 'documentScans/upload',
      disabilitiesGetAll: 'disabilities/getAll',
    }),
  },
})
export default class ModalForm extends Vue {
  $refs!: {
    form: any;
  };

  // Types.

  anthropometry!: IAnthropometry[];

  disabilities!: IDisability[];

  mkb!: IMkb[];

  mkbOptions!: IOption[];

  isEditMode!: boolean;

  insuranceCompanies!: IInsuranceCompany[];

  insuranceCompaniesOptions!: IOption[];

  documents!: IDocument[];

  documentsScans!: { [id: string]: IDocumentScan[] };

  anthropometryGetAll!: () => Promise<void>;

  insuranceCompaniesGetAll!: () => Promise<void>;

  mkbGetAll!: () => Promise<void>;

  documentsGetAll!: () => Promise<void>;

  disabilitiesGetAll!: () => Promise<void>;

  offset: number[] = [0];

  // Local state.
  patient = new Patient();

  documentsValues: { [documentId: string]: { [fieldId: string]: IDocumentFieldValue } } = {};

  mount = false;

  diagnosisMount = false;

  title = '';

  rules = {
    human: {
      surname: [{ required: true, message: 'Необходимое поле', trigger: 'blur' }],
      name: [{ required: true, message: 'Необходимое поле', trigger: 'blur' }],
      patronymic: [{ required: true, message: 'Необходимое поле', trigger: 'blur' }],
      gender: [{ required: true, message: 'Необходимое поле', trigger: 'blur' }],
      dateBirth: [{ required: true, message: 'Необходимое поле', trigger: 'blur' }],
    },
  };

  // Lifecycle methods.
  async created(): Promise<void> {
    if (!this.$route.params.patientId) {
      this.isEditMode = false;
      this.title = 'Создать пациента';
    } else {
      this.isEditMode = true;
      this.title = 'Редактировать пациента';
      const response = await fetch(
        process.env.VUE_APP_BASE_URL + `patient/${this.$route.params.patientId}`
      );
      this.patient = await response.json();
    }

    await this.anthropometryGetAll();
    await this.insuranceCompaniesGetAll();
    await this.mkbGetAll();
    await this.documentsGetAll();
    this.insuranceCompaniesOptions = [];

    for (const disability of this.patient.disabilities) {
      if (!disability.edvs) {
        disability.edvs = [];
      }
    }
    for (const item of this.insuranceCompanies) {
      this.insuranceCompaniesOptions.push({
        label: `${item.name}`,
        value: `${item.id}`,
      });
    }

    this.mkb = this.mkb.slice(1, 100);
    this.mkbOptions = [];
    for (const item of this.mkb) {
      this.mkbOptions.push({
        label: `${item.class} ${item.groupName} ${item.subGroupName} ${item.diagnosisName} ${item.subDiagnosisName}`,
        value: `${item.id}`,
      });
    }

    let sum = 0;

    this.documentsScans = {};
    this.documentsValues = {};

    for (const document of this.documents) {
      sum += document.documentFields!.length;
      this.offset.push(sum);

      this.documentsScans[document.id as string] = [];
      this.documentsValues[document.id as string] = {};

      for (const field of document.documentFields!) {
        let item = this.patient.human.documentFieldToHuman?.find(i => {
          return i.documentFieldId === field.id;
        });

        if (item === undefined) {
          item = {
            id: field.id,
            valueString: undefined,
            valueNumber: 0,
            documentFieldId: field.id,
          };
        }
        this.documentsValues[document.id as string][field.id as string] = item!;
      }
    }

    for (const scan of this.patient.human.documentScans!) {
      this.documentsScans[scan.documentId!].push({
        id: scan.id as string,
        documentId: scan.documentId,
        url: scan.id as string,
        name: scan.name as string,
      });
    }
    this.mount = true;
    this.diagnosisMount = true;
  }

  // Methods.
  submitForm(): void {
    for (const document in this.documentsScans) {
      for (const scan of this.documentsScans[document]) {
        this.patient.human.documentScans?.push(scan);
      }
    }

    this.patient.human.documentFieldToHuman = [];
    for (const document in this.documentsValues) {
      for (const field in this.documentsValues[document]) {
        this.patient.human.documentFieldToHuman.push(this.documentsValues[document][field]);
      }
    }

    if (this.isEditMode) {
      this.$store.dispatch('patients/edit', this.patient);
    } else {
      this.$store.dispatch('patients/create', this.patient);
    }

    this.$refs.form.validate((val: any) => {
      console.log(val);
    });
  }
}
</script>
