<template>
  <h2>{{ modalTitle }}</h2>
  <el-form ref="form" :model="editRepresentative" label-width="150px">
    <HumanForm :human="editRepresentative.human" />

    <DocumentForm
      :inDocuments="documents"
      :inDocumentsScans="documentsScans"
      :inDocumentsValues="documentsValues"
    />
    <RepresentativeToPatientForm
      :inRepresentativeToPatient="editRepresentative.representativeToPatient"
      :inTypes="types"
      :inPatients="patientsOptions"
    />
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
import IRepresentative from '../../interfaces/representatives/IRepresentative';
import HumanForm from '@/components/HumanForm.vue';
import DocumentForm from '@/components/DocumentForm.vue';
import RepresentativeToPatientForm from '@/components/Representatives/RepresentativeToPatientForm.vue';

@Options({
  components: {
    HumanForm,
    DocumentForm,
    RepresentativeToPatientForm,
  },
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
  $refs!: {
    uploadFile: any;
  };

  // Types.
  representative!: IRepresentative;

  isCreateForm!: boolean;

  patients!: IPatient[];

  documents!: IDocument[];

  offset: number[] = [0];

  patientsGetAll!: () => Promise<void>;

  documentsGetAll!: () => Promise<void>;

  documentsUpload!: () => Promise<void>;

  // Local state.

  documentsScans: { [id: string]: IDocumentScan[] } = {};

  documentsValues: { [documentId: string]: { [fieldId: string]: IDocumentFieldValue } } = {};

  mount = false;

  editRepresentative = this.representative;

  patientsOptions = [{}];

  types = [
    { label: 'Отец', value: 'отец' },
    { label: 'Мать', value: 'мать' },
  ];

  async init(): Promise<void> {
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
            valueDate: null,
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
