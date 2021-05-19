<template>
  <el-row>
    <el-col :span="8">
      <h2 class="header-top-table">Пациенты <i class="el-icon-arrow-right"> </i> Профиль</h2>
    </el-col>
    <el-col :span="3" :offset="11" style="margin-top: 8px" align="right">
      <el-button type="success" round native-type="submit" @click="submitForm()">Сохранить изменения</el-button>
    </el-col>
  </el-row>
  <el-row v-if="mount">
    <PatientPageInfo :patient="patient" />
  </el-row>
  <el-row>
    <div class="table-background" style="width: 100%; height: 100%">
      <el-collapse>
        <el-form ref="form" :model="patient" :rules="rules" @submit.prevent="submitForm" label-width="20%" label-position="left">
          <div v-if="mount">
            <el-collapse-item>
              <template #title>
                <h2 class="collapseHeader">
                  Паспортные данные
                </h2>
              </template>
              <HumanForm :human="patient.human" />
            </el-collapse-item>
            <el-collapse-item>
              <template #title>
                <h2 class="collapseHeader">
                  Антропометрия
                </h2>
              </template>
              <AnthropometryForm :inAnthropometry="anthropometries" :inAnthropometryData="patient.anthropometryData" />
            </el-collapse-item>
            <el-collapse-item>
              <template #title>
                <h2 class="collapseHeader">
                  Страховки
                </h2>
              </template>
              <InsuranceForm :inInsuranceCompaniesOptions="insuranceCompaniesOptions" :inInsuranceCompanyToHuman="patient.human.insuranceCompanyToHuman" />
            </el-collapse-item>
            <el-collapse-item>
              <template #title>
                <h2 class="collapseHeader">
                  Документы
                </h2>
              </template>
              <DocumentForm :inDocuments="documents" :inDocumentsScans="documentsScans" :inDocumentsValues="documentsValues" />
            </el-collapse-item>
            <el-collapse-item>
              <template #title>
                <h2 class="collapseHeader">
                  Диагнозы
                </h2>
              </template>
              <MkbForm :inPatientDiagnosis="patient.patientDiagnosis" />
            </el-collapse-item>
            <el-collapse-item>
              <template #title>
                <h2 class="collapseHeader">
                  Инвалидность
                </h2>
              </template>
              <DisabilityForm :inDisabilities="patient.disabilities" />
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

import IAnthropometry from '@/interfaces/anthropometry/IAnthropometry';
import IInsuranceCompany from '@/interfaces/insuranceCompanies/IInsuranceCompany';
import IOption from '@/interfaces/shared/IOption';
import IDocument from '@/interfaces/documents/IDocument';
import IDocumentScan from '@/interfaces/documentScans/IDocumentScan';
import IDocumentFieldValue from '@/interfaces/documents/IDocumentFieldValue';
import Patient from '@/classes/patients/Patient';
import IDisability from '@/interfaces/disabilities/IDisability';
import Contact from '@/classes/humans/Contact';
import IAnthropometryData from '@/interfaces/anthropometry/IAnthropometryData';

@Options({
  components: {
    PatientPageInfo,
    HumanForm,
    AnthropometryForm,
    InsuranceForm,
    DocumentForm,
    MkbForm,
    DisabilityForm,
  },
  computed: {
    ...mapGetters('anthropometry', ['anthropometries']),
    ...mapGetters('insuranceCompanies', ['insuranceCompanies']),
    ...mapGetters('documents', ['documents']),
    ...mapGetters('disabilities', ['disabilities']),
    ...mapGetters('patients', ['patient']),
  },
  methods: {
    ...mapActions({
      patientGet: 'patients/get',
      anthropometryGetAll: 'anthropometry/getAll',
      insuranceCompaniesGetAll: 'insuranceCompanies/getAll',
      documentsGetAll: 'documents/getAll',
      documentScansUpload: 'documentScans/upload',
      disabilitiesGetAll: 'disabilities/getAll',
    }),
  },
})
export default class ModalForm extends Vue {
  // Types.
  $refs!: {
    form: any;
    message: any;
  };

  $message!: {
    error: any;
  };

  anthropometries!: IAnthropometry[];
  disabilities!: IDisability[];
  isEditMode!: boolean;
  insuranceCompanies!: IInsuranceCompany[];
  insuranceCompaniesOptions!: IOption[];
  documents!: IDocument[];
  documentsScans!: { [id: string]: IDocumentScan[] };

  anthropometryGetAll!: () => Promise<void>;
  insuranceCompaniesGetAll!: () => Promise<void>;
  documentsGetAll!: () => Promise<void>;
  patientGet!: (patientId: string) => Promise<void>;

  offset: number[] = [0];

  // Local state.
  patient = new Patient();
  documentsValues: { [documentId: string]: { [fieldId: string]: IDocumentFieldValue } } = {};
  mount = false;
  diagnosisMount = false;
  title = '';
  error = '';

  validatePhone = (rule: any, value: any, callback: any): void => {
    if (Contact.getPhoneRegExp().test(value) || !value) {
      callback();
    } else {
      callback(new Error('Пожалуйста, введите корректный номер телефона'));
    }
  };

  validateEmail = (rule: any, value: any, callback: any): void => {
    if (Contact.getEmailRegExp().test(value) || !value) {
      callback();
    } else {
      callback(new Error('Пожалуйста, введите корректный email'));
    }
  };

  rules = {
    human: {
      surname: [{ required: true, message: 'Пожалуйста, укажите фамилию', trigger: 'blur' }],
      name: [{ required: true, message: 'Пожалуйста, укажите имя', trigger: 'blur' }],
      patronymic: [{ required: true, message: 'Пожалуйста, укажите отчество', trigger: 'blur' }],
      isMale: [{ required: true, message: 'Пожалуйста, выберите пол', trigger: 'change' }],
      dateBirth: [{ required: true, message: 'Пожалуйста, выберите дату', trigger: 'blur' }],
      addressRegistration: [{ required: true, message: 'Пожалуйста, укажите адрес регистрации', trigger: 'blur' }],
      addressResidential: [{ required: true, message: 'Пожалуйста, укажите адрес проживания', trigger: 'blur' }],
      contact: {
        phone: [{ validator: this.validatePhone, trigger: 'blur' }],
        email: [{ validator: this.validateEmail, trigger: 'blur' }],
      },
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
      await this.patientGet(`${this.$route.params.patientId}`);
      this.patient = this.$store.getters['patients/patient'];
    }
    await this.anthropometryGetAll();
    await this.insuranceCompaniesGetAll();
    await this.documentsGetAll();
    this.patient.anthropometryData.sort((a: IAnthropometryData, b: IAnthropometryData) => new Date(a.date).getTime() - new Date(b.date).getTime());
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

    let sum = 0;
    this.documentsScans = {};
    this.documentsValues = {};
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
    this.mount = true;
    this.diagnosisMount = true;
  }

  // Methods.
  async submitForm(): Promise<void> {
    let validationResult = true;

    this.$refs.form.validate((valid: boolean) => {
      if (!valid) {
        validationResult = false;
        return false;
      }
      return true;
    });

    if (!validationResult) {
      return;
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

    this.$refs.form.validate((val: any) => {
      console.log(val);
    });

    this.$router.push('/patients');
  }
}
</script>
