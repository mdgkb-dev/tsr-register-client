<template>
  <el-form
    ref="form"
    :model="editPatient"
    @submit.prevent="submitForm"
    label-width="10vw"
    label-position="right"
  >
    <h3>Личная информация</h3>
    <el-form-item label="Фамилия" label-width="20vw">
      <el-input
        v-model="v$.editPatient.human.surname.$model"
        :class="{ 'wrong-input': v$.editPatient.human.surname.$errors.length > 0 }"
      ></el-input>
      <div
        :class="['error-message']"
        v-for="(error, surnameIndex) of v$.editPatient.human.surname.$errors"
        :key="surnameIndex"
      >
        {{ error.$message }}
      </div>
    </el-form-item>
    <el-form-item label="Имя" label-width="20vw">
      <el-input
        v-model="v$.editPatient.human.name.$model"
        :class="{ 'wrong-input': v$.editPatient.human.name.$errors.length > 0 }"
      ></el-input>
      <div
        :class="['error-message']"
        v-for="(error, nameIndex) of v$.editPatient.human.name.$errors"
        :key="nameIndex"
      >
        {{ error.$message }}
      </div>
    </el-form-item>
    <el-form-item label="Отчество" label-width="20vw">
      <el-input
        v-model="v$.editPatient.human.patronymic.$model"
        :class="{ 'wrong-input': v$.editPatient.human.patronymic.$errors.length > 0 }"
      ></el-input>
      <div
        :class="['error-message']"
        v-for="(error, patronymicIndex) of v$.editPatient.human.patronymic.$errors"
        :key="patronymicIndex"
      >
        {{ error.$message }}
      </div>
    </el-form-item>
    <el-form-item label="Пол" label-width="20vw">
      <el-select v-model="editPatient.human.gender" placeholder="Выберите пол">
        <el-option label="Мужчина" value="male"></el-option>
        <el-option label="Женщина" value="female"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Дата рождения" label-width="20vw">
      <el-date-picker
        type="date"
        placeholder="Выберете дату"
        v-model="v$.editPatient.human.dateBirth.$model"
      ></el-date-picker>
      <div
        :class="['error-message']"
        v-for="(error, dateBirthIndex) of v$.editPatient.human.dateBirth.$errors"
        :key="dateBirthIndex"
      >
        {{ error.$message }}
      </div>
    </el-form-item>
    <el-form-item label="Адрес регистрации" label-width="20vw">
      <el-input v-model="editPatient.human.addressRegistration"></el-input>
    </el-form-item>
    <el-form-item label="Адрес проживания" label-width="20vw">
      <el-input v-model="editPatient.human.addressResidential"></el-input>
    </el-form-item>
    <el-form-item label="Телефон" label-width="20vw">
      <el-input
        v-model="v$.editPatient.human.contact.phone.$model"
        :class="{ 'wrong-input': v$.editPatient.human.contact.phone.$errors.length > 0 }"
      ></el-input>
      <div
        :class="['error-message']"
        v-for="(error, phoneIndex) of v$.editPatient.human.contact.phone.$errors"
        :key="phoneIndex"
      >
        {{ error.$message }}
      </div>
    </el-form-item>
    <el-form-item label="Email" label-width="20vw">
      <el-input
        v-model="v$.editPatient.human.contact.email.$model"
        :class="{ 'wrong-input': v$.editPatient.human.contact.email.$errors.length > 0 }"
      ></el-input>
      <div
        :class="['error-message']"
        v-for="(error, emailIndex) of v$.editPatient.human.contact.email.$errors"
        :key="emailIndex"
      >
        {{ error.$message }}
      </div>
    </el-form-item>

    <div v-if="mount">
      <h3>Антропометрия</h3>
      <el-form-item v-for="param in anthropometry" :key="param">
        <el-form-item :label="param.name">
          <el-button @click="add(param.id)">Добавить изменение</el-button>
        </el-form-item>
        <template v-for="(item, i) in editPatient.anthropometryData">
          <div v-if="item.anthropometryId === param.id">
            <el-form-item label="Дата" label-width="12vw">
              <el-date-picker
                type="date"
                placeholder="Дата изменения"
                v-model="editPatient.anthropometryData[i].date"
                style="width: 10vw"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="Значение" label-width="12vw">
              <el-input-number v-model="editPatient.anthropometryData[i].value"></el-input-number>
            </el-form-item>
            <el-form-item label-width="12vw">
              <el-button @click.prevent="remove(item)">Удалить изменение</el-button>
            </el-form-item>
          </div>
        </template>
      </el-form-item>
      <h3>Страховки</h3>

      <el-form-item label-width="20vw" class="remove-margin-bottom">
        <el-button @click="addInsurance">Добавить страховку</el-button>
      </el-form-item>

      <el-form-item
        v-for="(item, index) in editPatient.human.insuranceCompanyToHuman"
        :key="index"
        v-model="editPatient.human.insuranceCompanyToHuman"
      >
        <el-form-item label="Компания" label-width="12vw">
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
        </el-form-item>
        <el-form-item label="Номер" label-width="12vw">
          <el-input
            label="Введите номер страховки"
            v-model="editPatient.human.insuranceCompanyToHuman[index].number"
          ></el-input>
        </el-form-item>

        <el-form-item label-width="12vw">
          <el-button @click.prevent="removeInsurance(item)">Удалить страховку</el-button>
        </el-form-item>
      </el-form-item>

      <!--      -->
      <!--      -->
      <!--      -->
      <h3>Документы</h3>
      <el-form-item v-for="document in documents" :key="document" v-if="mount">
        <h3>{{ document.name }}</h3>
        <div v-for="(field, j) in document.documentFields" :key="j">
          <el-form-item label-width="12vw" :label="field.name" v-if="field.type === 'string'">
            <el-input
              v-model="documentsValues[`${document.id}`][`${field.id}`].valueString"
            ></el-input>
          </el-form-item>
          <el-form-item label-width="12vw" :label="field.name" v-else-if="field.type === 'number'">
            <el-input-number
              label="field.name"
              v-model="documentsValues[`${document.id}`][`${field.id}`].valueNumber"
            ></el-input-number>
          </el-form-item>
        </div>

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
          <el-button size="small" type="primary">Загрузить изображение документа</el-button>
        </el-upload>
      </el-form-item>
      <!--      -->
      <!--      -->
      <!--      -->

      <h3>Диагнозы</h3>
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
    <div class="center-align">
      <el-button
        type="primary"
        native-type="submit"
        :disabled="
          (isCreateForm &&
            (!v$.editPatient.human.surname.$dirty ||
              (v$.editPatient.human.surname.$dirty &&
                v$.editPatient.human.surname.$errors.length > 0) ||
              !v$.editPatient.human.name.$dirty ||
              (v$.editPatient.human.name.$dirty && v$.editPatient.human.name.$errors.length > 0) ||
              !v$.editPatient.human.patronymic.$dirty ||
              (v$.editPatient.human.patronymic.$dirty &&
                v$.editPatient.human.patronymic.$errors.length > 0) ||
              !v$.editPatient.human.dateBirth.$dirty ||
              (v$.editPatient.human.dateBirth.$dirty &&
                v$.editPatient.human.dateBirth.$errors.length > 0) ||
              (v$.editPatient.human.contact.phone.$dirty &&
                v$.editPatient.human.contact.phone.$errors.length > 0) ||
              (v$.editPatient.human.contact.email.$dirty &&
                v$.editPatient.human.contact.email.$errors.length > 0))) ||
          (!isCreateForm && v$.$errors.length > 0)
        "
        >Сохранить</el-button
      >
      <el-button @click="close">Отмена</el-button>
    </div>
  </el-form>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapActions, mapGetters } from 'vuex';
import useVuelidate from '@vuelidate/core';
import { required, email, helpers } from '@vuelidate/validators';

import IPatient from '@/interfaces/patients/IPatient';
import IAnthropometry from '@/interfaces/anthropometry/IAnthropometry';
import IInsuranceCompany from '@/interfaces/insuranceCompanies/IInsuranceCompany';
import IMkb from '@/interfaces/mkb/IMkb';
import IOption from '@/interfaces/shared/IOption';
import IDocument from '@/interfaces/documents/IDocument';
import IDocumentScan from '@/interfaces/documentScans/IDocumentScan';
import IDocumentFieldValue from '@/interfaces/documents/IDocumentFieldValue';

const russianLettersValidator = (value: unknown) => /^[А-Яа-яЁё \-]+$/.test(String(value));
const phoneValidator = (value: unknown) => /^(7[0-9]+)*$/.test(String(value));

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
  validations: {
    editPatient: {
      human: {
        surname: {
          required: helpers.withMessage('Пожалуйста, введите фамилию.', required),
          russianLettersValidator: helpers.withMessage(
            'Фамилия может содержать только русские буквы.',
            russianLettersValidator
          ),
        },
        name: {
          required: helpers.withMessage('Пожалуйста, введите имя.', required),
          russianLettersValidator: helpers.withMessage(
            'Имя может содержать только русские буквы.',
            russianLettersValidator
          ),
        },
        patronymic: {
          required: helpers.withMessage('Пожалуйста, введите отчество.', required),
          russianLettersValidator: helpers.withMessage(
            'Отчество может содержать только русские буквы.',
            russianLettersValidator
          ),
        },
        dateBirth: {
          required: helpers.withMessage('Пожалуйста, выберите дату рождения.', required),
        },
        contact: {
          phone: {
            phoneValidator: helpers.withMessage(
              'Пожалуйста, используйте только цифры формата: 79151234567',
              phoneValidator
            ),
          },
          email: {
            email: helpers.withMessage(
              'Пожалуста, введите корректный email формата: name@host.domain',
              email
            ),
          },
        },
      },
    },
  },
})
export default class ModalForm extends Vue {
  // Types.
  anthropometry!: IAnthropometry[];

  mkb!: IMkb[];

  mkbOptions!: IOption[];

  isCreateForm!: boolean;

  insuranceCompanies!: IInsuranceCompany[];

  options!: IOption[];

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

  v$ = useVuelidate();

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
    this.options = [];

    for (const item of this.insuranceCompanies) {
      this.options.push({
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
    if (this.isCreateForm) {
      this.$store.dispatch('patients/create', this.editPatient);
    } else {
      this.$store.dispatch('patients/edit', this.editPatient);
    }
    this.$emit('close');
  }

  add(paramId: string): void {
    this.editPatient.anthropometryData.push({
      anthropometryId: paramId,
      date: '',
      value: 0,
    });
  }

  remove(item: any): void {
    const index = this.editPatient.anthropometryData.indexOf(item);
    if (index !== -1) {
      this.editPatient.anthropometryData.splice(index, 1);
    }
  }

  addInsurance(humanId: number, insuranceCompanyId: number): void {
    this.editPatient.human.insuranceCompanyToHuman.push({
      number: '',
      insuranceCompanyId: undefined,
      humanId: undefined,
    });
  }

  removeInsurance(item: any): void {
    const index = this.editPatient.human.insuranceCompanyToHuman.indexOf(item);
    if (index !== -1) {
      this.editPatient.human.insuranceCompanyToHuman.splice(index, 1);
    }
  }

  addDiagnosis(): void {
    this.editPatient.mkbToPatient.push({
      primary: false,
      mkbId: '',
      patientId: '',
    });
  }

  removeDiagnosis(item: any): void {
    const index = this.editPatient.mkbToPatient.indexOf(item);
    if (index !== -1) {
      this.editPatient.mkbToPatient.splice(index, 1);
    }
  }

  close(): void {
    this.documentsValues = {};
    this.documentsScans = {};
    this.mount = false;
    this.$emit('close');
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

<style scoped>
.remove-margin-bottom {
  margin-bottom: 0px;
}
</style>
