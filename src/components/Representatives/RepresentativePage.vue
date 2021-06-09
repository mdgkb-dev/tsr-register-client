<template>
  <div class="representative-page-container">
    <PageHead :titleParent="'Представители'" :title="'Профиль'" @submitForm="submitForm" />
    <el-row v-if="mount">
      <RepresentativePageInfo :representative="representative" />
    </el-row>
    <el-row>
      <el-collapse>
        <el-form ref="form" :model="representative" @submit.prevent="submitForm" label-width="150px" :rules="rules">
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
              <RepresentativeToPatientForm
                :inRepresentativeToPatient="representative.representativeToPatient"
                :inRepresentativeTypes="representativeTypesOptions"
                :inPatients="patientsOptions"
              />
            </el-collapse-item>
          </div>
        </el-form>
      </el-collapse>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Options, mixins } from 'vue-class-component';
import { mapGetters, mapActions } from 'vuex';

import IDocument from '@/interfaces/documents/IDocument';
import IDocumentFieldValue from '@/interfaces/documents/IDocumentFieldValue';
import IDocumentScan from '@/interfaces/documentScans/IDocumentScan';
import HumanForm from '@/components/HumanForm.vue';
import DocumentForm from '@/components/DocumentForm.vue';
import RepresentativeToPatientForm from '@/components/Representatives/RepresentativeToPatientForm.vue';
import Representative from '@/classes/representatives/Representative';
import HumanRules from '@/classes/humans/HumanRules';
import IRepresentativeType from '@/interfaces/representatives/IRepresentativeType';
import ValidateMixin from '@/mixins/ValidateMixin.vue';
import ConfirmLeavePage from '@/mixins/ConfirmLeavePage.vue';
import FormMixin from '@/mixins/FormMixin.vue';
import PageHead from '@/components/PageHead.vue';
import RepresentativePageInfo from './RepresentativePageInfo.vue';
import IPatient from '../../interfaces/patients/IPatient';

@Options({
  components: {
    HumanForm,
    DocumentForm,
    RepresentativeToPatientForm,
    RepresentativePageInfo,
    PageHead,
  },
  computed: {
    ...mapGetters('patients', ['patients']),
    ...mapGetters('documents', ['documents']),
    ...mapGetters('representativeTypes', ['representativeTypes']),
  },
  methods: {
    ...mapActions({
      patientsGetAll: 'patients/getAll',
      representativeTypesGetAll: 'representativeTypes/getAll',
      representativeGet: 'representatives/get',
      patientsCreate: 'patients/create',
      documentsGetAll: 'documents/getAll',
      documentScansUpload: 'documentScans/upload',
    }),
  },
})
export default class RepresentativePage extends mixins(ValidateMixin, ConfirmLeavePage, FormMixin) {
  patients!: IPatient[];
  documents!: IDocument[];
  offset: number[] = [0];
  representativeTypes!: IRepresentativeType[];

  patientsGetAll!: () => Promise<void>;
  documentsGetAll!: () => Promise<void>;
  documentsUpload!: () => Promise<void>;
  representativeGet!: (representativeId: string) => Promise<void>;
  representativeTypesGetAll!: () => Promise<void>;

  // Local state.
  documentsScans: { [id: string]: IDocumentScan[] } = {};
  documentsValues: { [documentId: string]: { [fieldId: string]: IDocumentFieldValue } } = {};
  mount = false;
  representative = new Representative();
  patientsOptions = [{}];
  representativeTypesOptions = [{}];

  title = '';

  rules = {
    human: HumanRules,
  };

  // Lifecycle methods.
  async mounted(): Promise<void> {
    window.addEventListener('beforeunload', this.beforeWindowUnload);

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
    await this.representativeTypesGetAll();

    this.representativeTypesOptions.splice(0, 1);
    for (const item of this.representativeTypes) {
      if ((this.representative.human.isMale && item.isMale) || (!this.representative.human.isMale && !item.isMale)) {
        this.representativeTypesOptions.push({
          label: item.name,
          value: item.id,
        });
      }
    }

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
    this.initialState = JSON.stringify(this);
  }

  submitForm(): void {
    if (!this.validate(this.$refs.form)) return;

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
    this.syncSubmitHandling('representatives', this.representative);
  }
}
</script>

<style lang="scss" scoped>
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
.representative-page-container:deep {
  @import '@/assets/elements/patientAndRepresPage.scss';
}
</style>
