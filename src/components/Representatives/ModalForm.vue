<template>
  <el-form ref="form" :model="editRepresentative" label-width="120px">
    <h1>{{ modalTitle }}</h1>
    <el-form-item label="Activity name">
      <el-input v-model="editRepresentative.human.name"></el-input>
      <el-input v-model="editRepresentative.human.surname"></el-input>
      <el-input v-model="editRepresentative.human.patronymic"></el-input>
    </el-form-item>
    <el-form-item label="Activity zone">
      <el-select v-model="editRepresentative.human.gender" placeholder="please select your zone">
        <el-option label="Мужчина" value="male"></el-option>
        <el-option label="Женщина" value="female"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Activity time">
      <el-col :span="11">
        <el-date-picker
          type="date"
          placeholder="Pick a date"
          v-model="editRepresentative.human.dateBirth"
          style="width: 100%"
        ></el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="Адреса">
      <el-input v-model="editRepresentative.human.addressRegistration"></el-input>
      <el-input v-model="editRepresentative.human.addressResidential"></el-input>
    </el-form-item>
    <el-form-item label="Контакты">
      <el-input v-model="editRepresentative.human.contact.phone"></el-input>
      <el-input v-model="editRepresentative.human.contact.email"></el-input>
    </el-form-item>
    <el-form-item>
      <el-form-item
        v-for="(item, index) in editRepresentative.representativeToPatient"
        :key="index"
        v-model="editRepresentative.representativeToPatient"
      >
        <el-select
          placeholder="Выберите пациента"
          v-model="editRepresentative.representativeToPatient[index].patientId"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="Number(item.value)"
          >
          </el-option>
        </el-select>
        <el-select
          placeholder="Выберите роль представителя"
          v-model="editRepresentative.representativeToPatient[index].type"
        >
          <el-option
            v-for="item in types"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button @click.prevent="remove(item)">Удалить пациента</el-button>
      </el-form-item>

      <el-form-item>
        <el-button @click="add">Добавить пациента</el-button>
      </el-form-item>

      <el-button type="primary" @click="onSubmit">Сохранить</el-button>
      <el-button @click="close">Отмена</el-button>
    </el-form-item>
    <div v-if="mount">
      <h2>Документы</h2>
      <el-form-item v-for="(document, i) in documents" :key="document">
        <h3>{{ document.name }}</h3>

        <!--        -->
        <!--        -->
        <!--        -->
        <el-upload
          action=""
          :limit="3"
          :http-request="upload"
          :data="document"
          ref="upload"
          :file-list="editRepresentative.human.documentScan"
        >
          <el-button size="small" type="primary">Загрузить файл</el-button>
          <template #tip>
            <div class="el-upload__tip">jpg/png files with a size less than 500kb</div>
          </template>
        </el-upload>

        <!--        -->
        <!--        -->
        <!--        -->
        <el-form-item
          v-for="(field, j) in document.documentFields"
          :key="field.documentFieldToHuman"
        >
          <span>{{ field.name }}</span>
          <div v-if="field.type === 'string'">
            <el-input
              label="field.name"
              v-model="editRepresentative.human.documentFieldToHuman[getIdx(i, j)].valueString"
            ></el-input>
          </div>
          <div v-else-if="field.type === 'number'">
            <el-input-number
              label="field.name"
              v-model="editRepresentative.human.documentFieldToHuman[getIdx(i, j)].valueNumber"
            ></el-input-number>
          </div>
        </el-form-item>
      </el-form-item>
    </div>
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
      documentsUpload: 'documents/upload',
    }),
  },
})
export default class ModalForm extends Vue {
  representative!: IRepresentetive;

  isCreateForm!: boolean;

  patients!: IPatient[];

  documents!: IDocument[];

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

  async mounted(): Promise<void> {
    await this.patientsGetAll();
    this.options.splice(0, 1);
    for (const item of this.patients) {
      this.options.push({
        label: `${item.human.surname} ${item.human.name} ${item.human.patronymic}`,
        value: item.id,
        human: item.human,
      });
    }

    if (this.editRepresentative.human.documentFieldToHuman?.length === 0) {
      let sum = 0;
      await this.documentsGetAll();

      for (const document of this.documents) {
        sum += document.documentFields!.length;
        this.offset.push(sum);
        for (const field of document.documentFields!) {
          const obj = {} as IDocumentFieldValue;
          obj.valueString = '';
          obj.valueNumber = 0;
          obj.documentFieldId = field.id!;
          this.editRepresentative.human.documentFieldToHuman!.push(obj);
        }
      }
    }
    this.mount = true;
  }

  onSubmit(): void {
    for (const item of this.editRepresentative.representativeToPatient) {
      item.patient = undefined;
    }
    if (this.isCreateForm) {
      this.$store.dispatch('representatives/create', this.editRepresentative);
    } else {
      this.$store.dispatch('representatives/edit', this.editRepresentative);
    }

    this.$emit('close');
  }

  beforeUpdate(): void {
    this.editRepresentative = this.representative;
  }

  close(): void {
    this.$emit('close');
  }

  add(): void {
    this.editRepresentative.representativeToPatient.push({
      id: undefined,
      type: '',
      patientId: undefined,
    });
  }

  getIdx(i: number, j: number): number {
    return this.offset[i] + j;
  }

  remove(item: any): void {
    const index = this.editRepresentative.representativeToPatient.indexOf(item);
    if (index !== -1) {
      this.editRepresentative.representativeToPatient.splice(index, 1);
    }
  }

  async upload(file: any): Promise<void> {
    const res = await this.$store.dispatch('documents/upload', file);
    const resFile = await res.json();
    if (this.editRepresentative.human.documentScan?.length === 0) {
      this.editRepresentative.human.documentScan = [];
    }
    this.editRepresentative.human.documentScan!.push({
      file: {
        originalFileName: resFile.originalFileName,
        file: resFile.filename,
      },
      documentId: file.data.id,
      humanId: this.editRepresentative.human.id,
    });
  }
}
</script>
