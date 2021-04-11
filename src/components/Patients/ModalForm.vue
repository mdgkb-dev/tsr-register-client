<template>
  <h1>{{ modalTitle }}</h1>
  <el-form ref="form" :model="editPatient" label-width="150px">
    <el-row>
      <el-col>
        <h3>Личная информация</h3>
      </el-col>
      <el-row>
        <el-col :span="8">
          <el-form-item label="Имя">
            <el-input v-model="editPatient.human.name"></el-input>
          </el-form-item>
        </el-col>
        <el-form-item label="Фамилия">
          <el-col :span="8">
            <el-input v-model="editPatient.human.surname"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="Отчество">
          <el-col :span="8">
            <el-input v-model="editPatient.human.patronymic"></el-input>
          </el-col>
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="Пол">
            <el-select v-model="editPatient.human.gender" placeholder="Выберите пол">
              <el-option label="Мужчина" value="male"></el-option>
              <el-option label="Женщина" value="female"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Дата рождения">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="Pick a date"
                v-model="editPatient.human.dateBirth"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="Адрес регистрации">
            <el-input v-model="editPatient.human.addressRegistration"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Адрес проживания">
            <el-input v-model="editPatient.human.addressResidential"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="Телефон">
          <el-input v-model="editPatient.human.contact.phone"></el-input>
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="editPatient.human.contact.email"></el-input>
        </el-form-item>
      </el-row>
      <div v-if="mount">
        <h2>Антропометрия</h2>
        <el-form-item v-for="param in anthropometry" :key="param">
          <h3>{{ param.name }}</h3>
          <el-form-item>
            <el-button @click="add(param.id)">Добавить изменение</el-button>
          </el-form-item>
          <template v-for="(item, i) in editPatient.anthropometryData">
            <div v-if="item.anthropometryId === param.id">
              <el-form-item label="Дата">
                <el-col :span="11">
                  <el-date-picker
                    type="date"
                    placeholder="Дата изменения"
                    v-model="editPatient.anthropometryData[i].date"
                    style="width: 100%"
                  ></el-date-picker>
                </el-col>
                <el-button @click.prevent="remove(item)">Удалить изменение</el-button>
              </el-form-item>
              <el-form-item label="Значение">
                <el-input-number v-model="editPatient.anthropometryData[i].value"></el-input-number>
              </el-form-item>
            </div>
          </template>
        </el-form-item>
        <h2>Страховки</h2>
        <el-form-item>
          <el-form-item
            v-for="(item, index) in editPatient.human.insuranceCompanyToHuman"
            :key="index"
            v-model="editPatient.human.insuranceCompanyToHuman"
          >
            <el-select
              placeholder="Выберите компанию"
              v-model="editPatient.human.insuranceCompanyToHuman[index].insuranceCompanyId"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-input
              label="Введите номер страховки"
              v-model="editPatient.human.insuranceCompanyToHuman[index].number"
            ></el-input>
            <el-button @click.prevent="removeInsurance(item)">Удалить страховку</el-button>
          </el-form-item>

          <el-form-item>
            <el-button @click="addInsurance">Добавить страховку</el-button>
          </el-form-item>
        </el-form-item>

        <!--      -->
        <!--      -->
        <!--      -->
        <h2>Документы</h2>
        <el-form-item v-for="document in documents" :key="document" v-if="mount">
          <el-row>
            <h3>{{ document.name }}</h3>

            <el-row>
              <el-form-item v-for="(field, j) in document.documentFields" :key="j">
                <el-col>
                  <span>{{ field.name }}</span>
                  <div v-if="field.type === 'string'">
                    <el-input
                      label="field.name"
                      v-model="documentsValues[`${document.id}`][`${field.id}`].valueString"
                    ></el-input>
                  </div>
                  <div v-else-if="field.type === 'number'">
                    <el-input-number
                      label="field.name"
                      v-model="documentsValues[`${document.id}`][`${field.id}`].valueNumber"
                    ></el-input-number>
                  </div>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row>
              <el-upload
                action=""
                :limit="3"
                :on-preview="download"
                :on-success="onSuccess"
                :on-remove="onRemove"
                :http-request="upload"
                :data="document"
                ref="uploadFile"
                :file-list="documentsScans[document.id]"
              >
                <el-button size="small" type="primary">Загрузить файл</el-button>
              </el-upload>
            </el-row>
          </el-row>
        </el-form-item>
        <!--      -->
        <!--      -->
        <!--      -->

        <h2>Диагнозы</h2>
        <el-form-item v-if="diagnosisMount">
          <el-form-item
            v-for="(item, index) in editPatient.mkbToPatient"
            :key="index"
            v-model="editPatient.mkbToPatient"
          >
            <el-select
              placeholder="Выберите диагноз"
              filterable
              v-model="editPatient.mkbToPatient[index].mkbId"
            >
              <el-option
                v-for="item in mkbOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-checkbox v-model="editPatient.mkbToPatient[index].primary">Первичный</el-checkbox>
            <el-button @click.prevent="removeDiagnosis(item)">Удалить диагноз</el-button>
          </el-form-item>

          <el-form-item>
            <el-button @click="addDiagnosis">Добавить диагноз</el-button>
          </el-form-item>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Сохранить</el-button>
        <el-button @click="close">Отмена</el-button>
      </el-form-item>
    </el-row>
  </el-form>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import IPatient from '@/interfaces/patients/IPatient';
import { mapActions, mapGetters } from 'vuex';
import IAnthropometry from '@/interfaces/anthropometry/IAnthropometry';
import IInsuranceCompany from '@/interfaces/insuranceCompanies/IInsuranceCompany';
import IMkb from '@/interfaces/mkb/IMkb';
import IOption from '@/interfaces/shared/IOption';
import IDocument from '@/interfaces/documents/IDocument';
import IDocumentScan from '@/interfaces/documentScans/IDocumentScan';
import IDocumentFieldValue from '@/interfaces/documents/IDocumentFieldValue';

@Options({
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
  patient!: IPatient;

  isCreateForm!: boolean;

  editPatient = this.patient;

  documents!: IDocument[];

  documentsScans!: { [id: string]: IDocumentScan[] };

  anthropometryGetAll!: () => Promise<void>;

  insuranceCompaniesGetAll!: () => Promise<void>;

  mkbGetAll!: () => Promise<void>;

  anthropometry!: IAnthropometry[];

  insuranceCompanies!: IInsuranceCompany[];

  documentsGetAll!: () => Promise<void>;

  documentsValues!: { [documentId: string]: { [fieldId: string]: IDocumentFieldValue } };

  offset: number[] = [0];

  mkb!: IMkb[];

  mount = false;

  options!: IOption[];

  mkbOptions!: IOption[];

  diagnosisMount = false;

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

  async mounted(): Promise<void> {
    await this.anthropometryGetAll();
    await this.insuranceCompaniesGetAll();
    await this.mkbGetAll();

    this.options = [];
    for (const item of this.insuranceCompanies) {
      this.options.push({
        label: `${item.name}`,
        value: `${item.id}`,
      });
    }
    console.log(this.mkb);
    this.mkb = this.mkb.slice(1, 100);

    this.mkbOptions = [];
    for (const item of this.mkb) {
      this.mkbOptions.push({
        label: `${item.class} ${item.groupName} ${item.subGroupName} ${item.diagnosisName} ${item.subDiagnosisName}`,
        value: `${item.id}`,
      });
    }

    let sum = 0;
    await this.documentsGetAll();

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
  }

  add(paramId: string): void {
    this.patient.anthropometryData.push({
      anthropometryId: paramId,
      date: '',
      value: 0,
    });
  }

  remove(item: any): void {
    const index = this.patient.anthropometryData.indexOf(item);
    if (index !== -1) {
      this.patient.anthropometryData.splice(index, 1);
    }
  }

  addInsurance(humanId: number, insuranceCompanyId: number): void {
    this.patient.human.insuranceCompanyToHuman.push({
      number: '',
      insuranceCompanyId: undefined,
      humanId: undefined,
    });
  }

  removeInsurance(item: any): void {
    const index = this.patient.human.insuranceCompanyToHuman.indexOf(item);
    if (index !== -1) {
      this.patient.human.insuranceCompanyToHuman.splice(index, 1);
    }
  }

  addDiagnosis(): void {
    this.patient.mkbToPatient.push({
      primary: false,
      mkbId: '',
      patientId: '',
    });
  }

  removeDiagnosis(item: any): void {
    const index = this.patient.mkbToPatient.indexOf(item);
    if (index !== -1) {
      this.patient.mkbToPatient.splice(index, 1);
    }
  }

  close(): void {
    this.documentsValues = {};
    this.documentsScans = {};
    this.mount = false;
    this.$emit('close');
  }

  beforeUpdate(): void {
    this.editPatient = this.patient;
  }

  //  документы
  async upload(file: any): Promise<any> {
    const formData = new FormData();
    formData.append('file', file.file);
    formData.append('documentId', file.data.id);
    const res = await this.$store.dispatch('documentScans/upload', formData);
    const re = await res.json();
    this.documentsScans[file.data.id].push({
      id: re.id as string,
      documentId: re.documentId,
    });
    return re;
  }

  onSuccess(res: any, file: any, fileList: any): void {
    file.url = res.id;
  }

  async onRemove(file: any): Promise<void> {
    await this.$store.dispatch('documentScans/delete', file.id);
    for (const document in this.documentsScans) {
      for (const scan of this.documentsScans[document]) {
        if (scan.id === file.id) {
          const i = this.documentsScans[document].findIndex((item: any) => item.id === file.id);
          this.documentsScans[document].splice(i, 1);
          console.log(this.documentsScans);
        }
      }
    }

    for (const scan of this.editPatient.human.documentScans!) {
      const i = this.editPatient.human.documentScans!.findIndex((item: any) => item.id === file.id);
      this.editPatient.human.documentScans!.splice(i, 1);
    }
  }

  async download(file: any): Promise<void> {
    await this.$store.dispatch('documentScans/download', file);
  }
}
</script>
