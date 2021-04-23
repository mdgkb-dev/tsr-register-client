<template>
  <el-form
    ref="form"
    :model="editPatient"
    :rules="rules"
    @submit.prevent="submitForm"
    label-width="10vw"
    label-position="right"
  >
    <HumanForm :human="editPatient.human" />
    <div v-if="mount">
      <AnthropometryForm
        :inAnthropometry="anthropometry"
        :inAnthropometryData="editPatient.anthropometryData"
      />
      <InsuranceForm
        :inInsuranceCompaniesOptions="insuranceCompaniesOptions"
        :inInsuranceCompanyToHuman="editPatient.human.insuranceCompanyToHuman"
      />
      <DocumentForm
        :inDocuments="documents"
        :inDocumentsScans="documentsScans"
        :inDocumentsValues="documentsValues"
      />
      <MkbForm :inMkbObtions="mkbOptions" :inMkbToPatient="editPatient.mkbToPatient" />
    </div>
    <div class="center-align">
      <el-button type="primary" native-type="submit">Сохранить</el-button>
      <el-button @click="close">Отмена</el-button>
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

import IPatient from '@/interfaces/patients/IPatient';
import IAnthropometry from '@/interfaces/anthropometry/IAnthropometry';
import IInsuranceCompany from '@/interfaces/insuranceCompanies/IInsuranceCompany';
import IMkb from '@/interfaces/mkb/IMkb';
import IOption from '@/interfaces/shared/IOption';
import IDocument from '@/interfaces/documents/IDocument';
import IDocumentScan from '@/interfaces/documentScans/IDocumentScan';
import IDocumentFieldValue from '@/interfaces/documents/IDocumentFieldValue';

@Options({
  components: {
    HumanForm,
    AnthropometryForm,
    InsuranceForm,
    DocumentForm,
    MkbForm,
  },
  props: ['patient', 'is-create-form', 'modalTitle'],
  computed: {
    ...mapGetters('anthropometry', ['anthropometry']),
    ...mapGetters('insuranceCompanies', ['insuranceCompanies']),
    ...mapGetters('mkb', ['mkb']),
    ...mapGetters('documents', ['documents']),
  },
  methods: {
    ...mapActions({
      anthropometryGetAll: 'anthropometry/getAll',
      insuranceCompaniesGetAll: 'insuranceCompanies/getAll',
      mkbGetAll: 'mkb/getAll',
      documentsGetAll: 'documents/getAll',
      documentScansUpload: 'documentScans/upload',
    }),
  },
})
export default class ModalForm extends Vue {
  $refs!: {
    form: any;
  };

  // Types.

  anthropometry!: IAnthropometry[];

  mkb!: IMkb[];

  mkbOptions!: IOption[];

  isCreateForm!: boolean;

  insuranceCompanies!: IInsuranceCompany[];

  insuranceCompaniesOptions!: IOption[];

  patient!: IPatient;

  documents!: IDocument[];

  documentsScans!: { [id: string]: IDocumentScan[] };

  anthropometryGetAll!: () => Promise<void>;

  insuranceCompaniesGetAll!: () => Promise<void>;

  mkbGetAll!: () => Promise<void>;

  documentsGetAll!: () => Promise<void>;

  offset: number[] = [0];

  // Local state.
  editPatient = this.patient;

  documentsValues: { [documentId: string]: { [fieldId: string]: IDocumentFieldValue } } = {};

  mount = false;

  diagnosisMount = false;

  rules = {
    human: {
      surname: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
      ],
    },
  };

  onSubmit(): void {
    for (const document in this.documentsScans) {
      for (const scan of this.documentsScans[document]) {
        this.editPatient.human.documentScans?.push(scan);
      }
    }

    this.editPatient.human.documentFieldToHuman = [];
    for (const document in this.documentsValues) {
      for (const field in this.documentsValues[document]) {
        this.editPatient.human.documentFieldToHuman.push(this.documentsValues[document][field]);
      }
    }

    if (this.isCreateForm) {
      this.$store.dispatch('patients/create', this.editPatient);
    } else {
      this.$store.dispatch('patients/edit', this.editPatient);
    }
    this.$emit('close');
  }

  // Lifecycle methods.
  async mounted(): Promise<void> {
    await this.anthropometryGetAll();
    await this.insuranceCompaniesGetAll();
    await this.mkbGetAll();
    await this.documentsGetAll();
    this.insuranceCompaniesOptions = [];

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
        let item = this.editPatient.human.documentFieldToHuman?.find(i => {
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

    for (const scan of this.editPatient.human.documentScans!) {
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
    this.$refs.form.validate((val: any) => {
      console.log(val);
    });

    // if (this.isCreateForm) {
    //   this.$store.dispatch('patients/create', this.editPatient);
    // } else {
    //   this.$store.dispatch('patients/edit', this.editPatient);
    // }
    // this.$emit('close');
  }

  close(): void {
    this.documentsValues = {};
    this.documentsScans = {};
    this.mount = false;
    this.$emit('close');
  }
}
</script>
