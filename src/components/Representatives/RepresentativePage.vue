<template>
  <el-row>
    <el-col :span="8">
      <h2 class="header-top-table">Представители <i class="el-icon-arrow-right" /> Профиль</h2>
    </el-col>
    <el-col :span="3" :offset="11" style="margin-top: 8px" align="right">
      <el-button type="success" round native-type="submit" @click="onSubmit">Сохранить изменения</el-button>
    </el-col>
  </el-row>
  <el-row v-if="mount">
    <RepresentativePageInfo :representative="representative" />
  </el-row>
  <el-row>
    <div class="table-background" style="width: 100%; height: 100%">
      <el-collapse>
        <el-form ref="form" :model="representative" label-width="150px" :rules="rules">
          <div v-if="mount">
            <el-collapse-item>
              <template #title>
                <h2 class="collapseHeader">
                  Паспортные данные
                </h2>
              </template>
              <HumanForm :human="representative.human" />
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
                  Привязанные дети
                </h2>
              </template>
              <RepresentativeToPatientForm :inRepresentativeToPatient="representative.representativeToPatient" :inTypes="types" :inPatients="patientsOptions" />
            </el-collapse-item>
          </div>
        </el-form>
      </el-collapse>
    </div>
  </el-row>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapGetters, mapActions } from 'vuex';

import IDocument from '@/interfaces/documents/IDocument';
import IDocumentFieldValue from '@/interfaces/documents/IDocumentFieldValue';
import IDocumentScan from '@/interfaces/documentScans/IDocumentScan';
import HumanForm from '@/components/HumanForm.vue';
import DocumentForm from '@/components/DocumentForm.vue';
import RepresentativeToPatientForm from '@/components/Representatives/RepresentativeToPatientForm.vue';
import Representative from '@/classes/representatives/Representative';
import Contact from '@/classes/humans/Contact';
import IPatient from '../../interfaces/patients/IPatient';
import RepresentativePageInfo from './RepresentativePageInfo.vue';

@Options({
  components: {
    HumanForm,
    DocumentForm,
    RepresentativeToPatientForm,
    RepresentativePageInfo,
  },
  computed: {
    ...mapGetters('patients', ['patients']),
    ...mapGetters('documents', ['documents']),
  },
  methods: {
    ...mapActions({
      patientsGetAll: 'patients/getAll',
      representativeGet: 'representatives/get',
      patientsCreate: 'patients/create',
      documentsGetAll: 'documents/getAll',
      documentScansUpload: 'documentScans/upload',
    }),
  },
})
export default class RepresentativePage extends Vue {
  $refs!: {
    uploadFile: any;
    form: any;
  };
  $message: any;
  isEditMode!: boolean;
  patients!: IPatient[];
  documents!: IDocument[];
  offset: number[] = [0];

  patientsGetAll!: () => Promise<void>;
  documentsGetAll!: () => Promise<void>;
  documentsUpload!: () => Promise<void>;
  representativeGet!: (representativeId: string) => Promise<void>;

  // Local state.

  documentsScans: { [id: string]: IDocumentScan[] } = {};
  documentsValues: { [documentId: string]: { [fieldId: string]: IDocumentFieldValue } } = {};
  mount = false;
  representative = new Representative();
  patientsOptions = [{}];

  title = '';

  types = [
    { label: 'Отец', value: 'отец' },
    { label: 'Мать', value: 'мать' },
  ];

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

  async mounted(): Promise<void> {
    if (!this.$route.params.representativeId) {
      this.isEditMode = false;
      this.title = 'Создать представителя';
    } else {
      this.isEditMode = true;
      this.title = 'Редактировать представителя';
      await this.representativeGet(`${this.$route.params.representativeId}`);
      this.representative = this.$store.getters['representatives/representative'];
    }

    await this.patientsGetAll();
    this.patientsOptions.splice(0, 1);
    for (const item of this.patients) {
      this.patientsOptions.push({
        label: `${item.human.surname} ${item.human.name} ${item.human.patronymic}`,
        value: item.id,
        human: item.human,
      });
    }

    let sum = 0;
    await this.documentsGetAll();

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
          let item = this.representative.human.documentFieldToHuman?.find((i: IDocumentFieldValue) => i.documentFieldId === field.id);
          if (item === undefined) {
            item = {
              id: field.id,
              valueString: undefined,
              valueNumber: 0,
              valueDate: null,
              documentFieldId: field.id,
            };
          }
          if (item) {
            this.documentsValues[document.id as string][field.id as string] = item;
          }
        }
      }
    }

    if (this.representative.human.documentScans) {
      for (const scan of this.representative.human.documentScans) {
        if (scan.documentId) {
          this.documentsScans[scan.documentId].push({
            id: scan.id as string,
            documentId: scan.documentId,
            url: scan.id as string,
            name: scan.name as string,
          });
        }
      }
    }
    this.mount = true;
  }

  onSubmit(): void {
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

    for (const item of this.representative.representativeToPatient) {
      item.patient = undefined;
    }

    for (const document in this.documentsScans) {
      if (Object.prototype.hasOwnProperty.call(this.documentsScans, document)) {
        for (const scan of this.documentsScans[document]) {
          this.representative.human.documentScans.push(scan);
        }
      }
    }

    this.representative.human.documentFieldToHuman = [];
    for (const document in this.documentsValues) {
      if (Object.prototype.hasOwnProperty.call(this.documentsValues, document)) {
        for (const field in this.documentsValues[document]) {
          if (Object.prototype.hasOwnProperty.call(this.documentsValues[document], field)) {
            this.representative.human.documentFieldToHuman.push(this.documentsValues[document][field]);
          }
        }
      }
    }

    if (this.isEditMode) {
      this.$store.dispatch('representatives/edit', this.representative);
    } else {
      this.$store.dispatch('representatives/create', this.representative);
    }

    this.$router.push('/representatives');
  }
}
</script>

<style scoped>
.el-row {
  margin-bottom: 40px;
  &:last-child {
    margin-bottom: 0;
  }
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.modal-wrapper {
  width: 100%;
  height: 100%;
}
</style>
