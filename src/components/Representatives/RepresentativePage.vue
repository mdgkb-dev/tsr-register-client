<template>
  <div class="representative-page-container">
    <PageHead :title="representative.human.getFullName()" :links="links" @submitForm="submitForm" />
    <el-row v-if="mount">
      <RepresentativePageInfo :representative="representative" />
    </el-row>
    <el-row>
      <el-collapse>
        <el-form ref="form" :model="representative" @submit.prevent="submitForm" label-width="150px" :rules="rules">
          <div v-if="mount">
            <el-collapse-item>
              <template #title>
                <h2 class="collapseHeader">Паспортные данные</h2>
              </template>
              <HumanForm :human="representative.human" />
            </el-collapse-item>
            <el-collapse-item>
              <template #title>
                <h2 class="collapseHeader">Документы</h2>
              </template>
              <DocumentForm v-model:documents="representative.human.documents" v-model:fileInfos="representative.human.fileInfos" />
            </el-collapse-item>
            <el-collapse-item>
              <template #title>
                <h2 class="collapseHeader">Подопечные</h2>
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
import { mixins, Options } from 'vue-class-component';
import { mapActions, mapGetters } from 'vuex';

import HumanRules from '@/classes/humans/HumanRules';
import Representative from '@/classes/representatives/Representative';
import DocumentForm from '@/components/DocumentForm.vue';
import HumanForm from '@/components/HumanForm.vue';
import PageHead from '@/components/PageHead.vue';
import RepresentativePageInfo from '@/components/Representatives/RepresentativePageInfo.vue';
import RepresentativeToPatientForm from '@/components/Representatives/RepresentativeToPatientForm.vue';
import IPatient from '@/interfaces/patients/IPatient';
import IRepresentativeType from '@/interfaces/representatives/IRepresentativeType';
import BreadCrumbsLinks from '@/mixins/BreadCrumbsLinks.vue';
import ConfirmLeavePage from '@/mixins/ConfirmLeavePage.vue';
import FormMixin from '@/mixins/FormMixin.vue';
import ValidateMixin from '@/mixins/ValidateMixin.vue';

@Options({
  name: 'RepresentativePage',
  components: {
    HumanForm,
    DocumentForm,
    RepresentativeToPatientForm,
    RepresentativePageInfo,
    PageHead,
  },
  computed: {
    ...mapGetters('patients', ['patients']),
    ...mapGetters('representativeTypes', ['representativeTypes']),
  },
  methods: {
    ...mapActions({
      documentScansUpload: 'documentScans/upload',
      patientsCreate: 'patients/create',
      patientsGetAll: 'patients/getAll',
      representativeGet: 'representatives/get',
      representativeTypesGetAll: 'representativeTypes/getAll',
    }),
  },
})
export default class RepresentativePage extends mixins(ValidateMixin, ConfirmLeavePage, FormMixin, BreadCrumbsLinks) {
  patients!: IPatient[];
  offset: number[] = [0];
  representativeTypes!: IRepresentativeType[];

  documentsGetAll!: () => Promise<void>;
  documentsUpload!: () => Promise<void>;
  patientsGetAll!: () => Promise<void>;
  representativeGet!: (representativeId: string) => Promise<void>;
  representativeTypesGetAll!: () => Promise<void>;

  // Local state.
  mount = false;
  representative = new Representative();
  patientsOptions = [{}];
  representativeTypesOptions = [{}];

  rules = {
    human: HumanRules,
  };

  // Lifecycle methods.
  async mounted(): Promise<void> {
    window.addEventListener('beforeunload', this.beforeWindowUnload);

    if (!this.$route.params.representativeId) {
      this.isEditMode = false;
    } else {
      this.isEditMode = true;
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

    this.pushToLinks(['/representatives'], ['Список представителей']);

    this.mount = true;
    this.initialState = JSON.stringify(this);
  }

  submitForm(): void {
    if (!this.validate(this.$refs.form)) return;

    for (const item of this.representative.representativeToPatient) {
      item.patient = undefined;
    }

    this.syncSubmitHandling('representatives', this.representative);
  }
}
</script>

<style lang="scss" scoped>
.representative-page-container:deep {
  @import '@/assets/elements/collapse.scss';
}

.el-row {
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
