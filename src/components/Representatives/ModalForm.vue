<template>
  <h2>{{ modalTitle }}</h2>
  <el-form ref="form" :model="editRepresentative" label-width="150px">
    <el-row>
      <el-col>
        <h3>Личная информация</h3>
      </el-col>
      <el-row>
        <el-col :span="8">
          <el-form-item label="Имя">
            <el-input label="name" v-model="editRepresentative.human.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Фамилия">
            <el-input v-model="editRepresentative.human.surname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Отчество">
            <el-input v-model="editRepresentative.human.patronymic"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="Пол">
            <el-select v-model="editRepresentative.human.gender" placeholder="Выберите пол">
              <el-option label="Мужчина" value="male"></el-option>
              <el-option label="Женщина" value="female"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Дата рождения">
            <el-date-picker
              type="date"
              v-model="editRepresentative.human.dateBirth"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="Адрес регистрации">
            <el-input v-model="editRepresentative.human.addressRegistration"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Адрес проживания">
            <el-input v-model="editRepresentative.human.addressResidential"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="Телефон">
          <el-input v-model="editRepresentative.human.contact.phone"></el-input>
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="editRepresentative.human.contact.email"></el-input>
        </el-form-item>
      </el-row>
    </el-row>
    <h3>Подопечные представителя</h3>
    <el-row>
      <el-form-item>
        <el-row>
          <el-form-item
            v-for="(item, index) in editRepresentative.representativeToPatient"
            :key="index"
            v-model="editRepresentative.representativeToPatient"
          >
            <el-space direction="horizontal" alignment="start" :size="1">
              <span>Пациент</span>
              <el-col :span="12">
                <el-select v-model="editRepresentative.representativeToPatient[index].patientId">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="Number(item.value)"
                  >
                  </el-option>
                </el-select>
              </el-col>

              <span>Роль представителя</span>
              <el-col :span="11">
                <el-select v-model="editRepresentative.representativeToPatient[index].type">
                  <el-option
                    v-for="item in types"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="1">
                <el-button @click.prevent="remove(item)">Удалить пациента</el-button>
              </el-col>
            </el-space>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item>
            <el-button @click="add">Добавить пациента</el-button>
          </el-form-item>
        </el-row>
      </el-form-item>
    </el-row>
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
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Сохранить</el-button>
      <el-button @click="close">Отмена</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapGetters, mapActions } from 'vuex';

import IDocument from '@/interfaces/documents/IDocument';
import IDocumentFieldValue from '@/interfaces/documents/IDocumentFieldValue';
import IDocumentScan from '@/interfaces/documentScans/IDocumentScan';
import IPatient from '../../interfaces/patients/IPatient';
import IRepresentetive from '../../interfaces/representatives/IRepresentative';

@Options({
  props: ['representative', 'is-create-form', 'modal-title'],
  computed: {
    ...mapGetters('patients', ['patients']),
    ...mapGetters('documents', ['documents']),
  },
  methods: {
    ...mapActions({
      patientsGetAll: 'patients/getAll',
      patientsCreate: 'patients/create',
      documentsGetAll: 'documents/getAll',
      documentScansUpload: 'documentScans/upload',
    }),
  },
})
export default class ModalForm extends Vue {
  representative!: IRepresentetive;

  $refs!: {
    uploadFile: any;
  };

  isCreateForm!: boolean;

  patients!: IPatient[];

  documents!: IDocument[];

  documentsScans!: { [id: string]: IDocumentScan[] };

  documentsValues!: { [documentId: string]: { [fieldId: string]: IDocumentFieldValue } };

  offset: number[] = [0];

  patientsGetAll!: () => Promise<void>;

  mount = false;

  documentsGetAll!: () => Promise<void>;

  documentsUpload!: () => Promise<void>;

  editRepresentative = this.representative;

  options = [{}];

  types = [
    { label: 'Отец', value: 'отец' },
    { label: 'Мать', value: 'мать' },
  ];

  async init(): Promise<void> {
    await this.patientsGetAll();
    this.options.splice(0, 1);
    for (const item of this.patients) {
      this.options.push({
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
      sum += document.documentFields!.length;
      this.offset.push(sum);

      this.documentsScans[document.id as string] = [];
      this.documentsValues[document.id as string] = {};

      for (const field of document.documentFields!) {
        let item = this.editRepresentative.human.documentFieldToHuman?.find(i => {
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

    for (const scan of this.editRepresentative.human.documentScans!) {
      this.documentsScans[scan.documentId!].push({
        id: scan.id as string,
        documentId: scan.documentId,
        url: scan.id as string,
        name: scan.name as string,
      });
    }

    this.mount = true;
  }

  async mounted(): Promise<void> {
    await this.init();
  }

  onSubmit(): void {
    for (const item of this.editRepresentative.representativeToPatient) {
      item.patient = undefined;
    }

    for (const document in this.documentsScans) {
      for (const scan of this.documentsScans[document]) {
        this.editRepresentative.human.documentScans?.push(scan);
      }
    }

    this.editRepresentative.human.documentFieldToHuman = [];
    for (const document in this.documentsValues) {
      for (const field in this.documentsValues[document]) {
        this.editRepresentative.human.documentFieldToHuman.push(
          this.documentsValues[document][field]
        );
      }
    }

    if (this.isCreateForm) {
      this.$store.dispatch('representatives/create', this.editRepresentative);
    } else {
      this.$store.dispatch('representatives/edit', this.editRepresentative);
    }

    this.$emit('close');
  }

  async beforeUpdate(): Promise<void> {
    this.editRepresentative = this.representative;
    await this.init();
  }

  close(): void {
    this.documentsValues = {};
    this.documentsScans = {};
    this.mount = false;
    this.$emit('close');
  }

  add(): void {
    this.editRepresentative.representativeToPatient.push({
      id: undefined,
      type: '',
      patientId: undefined,
    });
  }

  remove(item: any): void {
    const index = this.editRepresentative.representativeToPatient.indexOf(item);
    if (index !== -1) {
      this.editRepresentative.representativeToPatient.splice(index, 1);
    }
  }

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

    for (const scan of this.editRepresentative.human.documentScans!) {
      const i = this.editRepresentative.human.documentScans!.findIndex(
        (item: any) => item.id === file.id
      );
      this.editRepresentative.human.documentScans!.splice(i, 1);
    }
  }

  async download(file: any): Promise<void> {
    await this.$store.dispatch('documentScans/download', file);
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
