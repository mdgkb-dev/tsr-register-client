<template>
  <PageHead :titleParent="'Пациенты'" :title="'Профиль'" @submitForm="submitForm" />
  <el-row v-if="mount"><PatientPageInfo :patient="patient" /></el-row>
  <el-row>
    <div class="table-background" style="width: 100%; height: 100%">
      <el-collapse>
        <el-form ref="form" :model="patient" :rules="rules" @submit.prevent="submitForm" label-width="20%" label-position="left">
          <div v-if="mount">
            <el-collapse-item>
              <template #title>
                <h2 class="collapseHeader">Паспортные данные</h2>
              </template>
              <HumanForm :human="patient.human" />
            </el-collapse-item>

            <el-collapse-item>
              <template #title>
                <h2 class="collapseHeader">Антропометрия</h2>
              </template>
              <AnthropometryForm :inAnthropometry="anthropometries" :inAnthropometryData="patient.anthropometryData" />
            </el-collapse-item>

            <el-collapse-item>
              <template #title>
                <h2 class="collapseHeader">Страховки</h2>
              </template>
              <InsuranceForm :inInsuranceCompaniesOptions="insuranceCompaniesOptions" :inInsuranceCompanyToHuman="patient.human.insuranceCompanyToHuman" />
            </el-collapse-item>

            <el-collapse-item>
              <template #title>
                <h2 class="collapseHeader">Документы</h2>
              </template>
              <DocumentForm v-model:documents="patient.human.documents" :documentTypes="documentTypes" />
            </el-collapse-item>

            <el-collapse-item>
              <template #title>
                <h2 class="collapseHeader">Диагнозы</h2>
              </template>
              <MkbForm :inMkbObtions="mkbOptions" :inMkbToPatient="patient.mkbToPatient" />
            </el-collapse-item>

            <el-collapse-item>
              <template #title><h2 class="collapseHeader">Инвалидность</h2></template>
              <DisabilityForm :inDisabilities="patient.disabilities" :inBirthDate="patient.human.dateBirth" />
            </el-collapse-item>

            <el-collapse-item>
              <template #title><h2 class="collapseHeader">Законные представители</h2></template>
              <PatientToRepresentativeForm
                :inRepresentativeToPatient="patient.representativeToPatient"
                :inRepresentativeTypes="representativeTypesOptions"
                :inRepresentatives="representativeOptions"
              />
            </el-collapse-item>
          </div>
        </el-form>
      </el-collapse>
    </div>
  </el-row>
</template>

<script lang="ts">
import { Options, mixins } from 'vue-class-component';
import { mapActions, mapGetters } from 'vuex';

import AnthropometryForm from '@/components/Patients/AnthropometryForm.vue';
import DisabilityForm from '@/components/Patients/DisabilityForm.vue';
import DocumentForm from '@/components/DocumentForm.vue';
import HumanForm from '@/components/HumanForm.vue';
import InsuranceForm from '@/components/Patients/InsuranceForm.vue';
import MkbForm from '@/components/Patients/MkbForm.vue';
import PageHead from '@/components/PageHead.vue';
import PatientPageInfo from '@/components/Patients/PatientPageInfo.vue';
import PatientToRepresentativeForm from '@/components/Patients/PatientToRepresentativeForm.vue';

import ConfirmLeavePage from '@/mixins/ConfirmLeavePage.vue';
import FormMixin from '@/mixins/FormMixin.vue';
import ValidateMixin from '@/mixins/ValidateMixin.vue';

import IAnthropometry from '@/interfaces/anthropometry/IAnthropometry';
import IDisability from '@/interfaces/disabilities/IDisability';
import IDocumentType from '@/interfaces/documents/IDocumentType';
import IInsuranceCompany from '@/interfaces/insuranceCompanies/IInsuranceCompany';
import IOption from '@/interfaces/shared/IOption';
import IRepresentative from '@/interfaces/representatives/IRepresentative';
import IRepresentativeType from '@/interfaces/representatives/IRepresentativeType';

import HeightWeight from '@/classes/anthropometry/HeightWeight';
import HumanRules from '@/classes/humans/HumanRules';
import Patient from '@/classes/patients/Patient';

@Options({
  name: 'PatientPage',
  components: {
    PatientPageInfo,
    HumanForm,
    AnthropometryForm,
    InsuranceForm,
    DocumentForm,
    MkbForm,
    DisabilityForm,
    PatientToRepresentativeForm,
    PageHead,
  },
  computed: {
    ...mapGetters('anthropometry', ['anthropometries']),
    ...mapGetters('disabilities', ['disabilities']),
    ...mapGetters('documentTypes', ['documentTypes']),
    ...mapGetters('insuranceCompanies', ['insuranceCompanies']),
    ...mapGetters('patients', ['patient']),
    ...mapGetters('representativeTypes', ['representativeTypes']),
    ...mapGetters('representatives', ['representatives']),
  },
  methods: {
    ...mapActions({
      anthropometryGetAll: 'anthropometry/getAll',
      disabilitiesGetAll: 'disabilities/getAll',
      documentTypesGetAll: 'documentTypes/getAll',
      insuranceCompaniesGetAll: 'insuranceCompanies/getAll',
      patientGet: 'patients/get',
      representativeTypesGetAll: 'representativeTypes/getAll',
      representativesGetAll: 'representatives/getAll',
    }),
  },
})
export default class PatientPage extends mixins(ValidateMixin, ConfirmLeavePage, FormMixin) {
  // Types.
  $refs!: {
    form: any;
  };
  anthropometries!: IAnthropometry[];
  disabilities!: IDisability[];
  insuranceCompanies!: IInsuranceCompany[];
  insuranceCompaniesOptions!: IOption[];
  representativeTypes!: IRepresentativeType[];
  representatives!: IRepresentative[];

  anthropometryGetAll!: () => Promise<void>;
  documentTypesGetAll!: () => Promise<void>;
  insuranceCompaniesGetAll!: () => Promise<void>;
  patientGet!: (patientId: string) => Promise<void>;
  representativeTypesGetAll!: () => Promise<void>;
  representativesGetAll!: () => Promise<void>;

  // Local state.
  diagnosisMount = false;
  documentTypes: IDocumentType[] = [];
  mount = false;
  offset: number[] = [0];
  patient = new Patient();
  representativeOptions: IOption[] = [];
  representativeTypesOptions: IOption[] = [];

  rules = {
    human: HumanRules,
  };

  // Lifecycle methods.
  async created(): Promise<void> {
    window.addEventListener('beforeunload', this.beforeWindowUnload);

    if (!this.$route.params.patientId) {
      this.isEditMode = false;
    } else {
      this.isEditMode = true;
      await this.patientGet(`${this.$route.params.patientId}`);
      this.patient = this.$store.getters['patients/patient'];
    }

    await this.documentTypesGetAll();
    this.documentTypes = [...(await this.$store.getters['documentTypes/documentTypes'])];
    await this.insuranceCompaniesGetAll();
    await this.anthropometryGetAll();
    this.insuranceCompaniesOptions = [];

    if (this.patient.disabilities) {
      for (const disability of this.patient.disabilities) {
        if (!disability.edvs) {
          disability.edvs = [];
        }
      }
    }

    if (this.insuranceCompanies) {
      for (const item of this.insuranceCompanies) {
        this.insuranceCompaniesOptions.push({
          label: `${item.name}`,
          value: `${item.id}`,
        });
      }
    }

    await this.representativesGetAll();
    await this.representativeTypesGetAll();
    this.representativeTypesOptions.splice(0, 1);

    if (this.representativeTypes) {
      for (const item of this.representativeTypes) {
        if (item.id) {
          this.representativeTypesOptions.push({
            label: item.name,
            value: item.id,
          });
        }
      }
    }

    this.representativeOptions.splice(0, 1);

    if (this.representatives) {
      for (const item of this.representatives) {
        if (item.id) {
          this.representativeOptions.push({
            label: `${item.human.surname} ${item.human.name} ${item.human.patronymic}`,
            value: item.id,
          });
        }
      }
    }

    this.mount = true;
    this.diagnosisMount = true;
    this.initialState = JSON.stringify(this);
  }

  // Methods.
  async submitForm(): Promise<void> {
    if (!this.validate(this.$refs.form)) {
      return;
    }

    for (const item of this.patient.representativeToPatient) {
      item.patient = undefined;
    }

    let heightId: string | undefined = '';
    let weightId: string | undefined = '';

    this.anthropometries.forEach((a: IAnthropometry) => {
      if (a.isHeight()) { heightId = a.id; }
      if (a.isWeight()) { weightId = a.id; }
    });

    this.patient.anthropometryData = HeightWeight.toAnthropometryData(this.patient.heightWeight, heightId, weightId, this.patient.id);
    await this.submitHandling('patients', this.patient);
  }
}
</script>
