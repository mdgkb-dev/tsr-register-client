<template>
  <div class="patient-page-container" v-if="mount">
    <PageHead :title="title" :links="links" @submitForm="submitForm" :showSaveButton="true" />
    <el-row><PatientPageInfo :patient="patient"/></el-row>
    <el-row>
      <el-collapse>
        <el-form :status-icon="true" :inline-message="true" ref="form" :model="patient" :rules="rules" @submit.prevent="submitForm" label-width="25%" label-position="left">
          <div>
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
              <AnthropometryForm :inHeightWeight="patient.heightWeight" :inAnthropometry="anthropometries" :inAnthropometryData="patient.anthropometryData" />
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
              <DocumentForm v-model:documents="patient.human.documents" v-model:fileInfos="patient.human.fileInfos" />
            </el-collapse-item>

            <el-collapse-item>
              <template #title><h2 class="collapseHeader">Диагнозы</h2></template>
              <MkbForm v-model:diagnosisData="patient.patientDiagnosis" :patientDiagnosis="true" />
            </el-collapse-item>

            <el-collapse-item>
              <template #title><h2 class="collapseHeader">Инвалидность</h2></template>
              <DisabilityForm
                v-model:disabilities="patient.disabilities"
                :birthDate="patient.human.dateBirth"
                v-model:fileInfos="patient.human.fileInfos"
                @addEdv="addEdv"
                @removeEdv="removeEdv"
              />
            </el-collapse-item>

            <el-collapse-item>
              <template #title><h2 class="collapseHeader">Законные представители</h2></template>
              <PatientToRepresentativeForm
                :inRepresentativeToPatient="patient.representativeToPatient"
                :inRepresentativeTypes="representativeTypesOptions"
                :inRepresentatives="representativeOptions"
              />
            </el-collapse-item>
            <el-collapse-item>
              <template #title><h2 class="collapseHeader">Регистры</h2></template>
              <PatientRegistersForm v-model:registerToPatient="patient.registerToPatient" :patientDiagnosis="patient.patientDiagnosis" />
            </el-collapse-item>
          </div>
        </el-form>
      </el-collapse>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent } from 'vue';
import { mixins, Options } from 'vue-class-component';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { mapActions, mapGetters } from 'vuex';

import HeightWeight from '@/classes/anthropometry/HeightWeight';
import HumanRules from '@/classes/humans/HumanRules';
import Patient from '@/classes/patients/Patient';
import DocumentForm from '@/components/DocumentForm.vue';
import HumanForm from '@/components/HumanForm.vue';
import MkbForm from '@/components/Mkb/MkbForm.vue';
import PageHead from '@/components/PageHead.vue';
import AnthropometryForm from '@/components/Patients/AnthropometryForm.vue';
import DisabilityForm from '@/components/Patients/DisabilityForm.vue';
import InsuranceForm from '@/components/Patients/InsuranceForm.vue';
import PatientPageInfo from '@/components/Patients/PatientPageInfo.vue';
import PatientToRepresentativeForm from '@/components/Patients/PatientToRepresentativeForm.vue';
import IAnthropometry from '@/interfaces/anthropometry/IAnthropometry';
import IDisability from '@/interfaces/disabilities/IDisability';
import IEdv from '@/interfaces/disabilities/IEdv';
import IInsuranceCompany from '@/interfaces/insuranceCompanies/IInsuranceCompany';
import IRepresentative from '@/interfaces/representatives/IRepresentative';
import IRepresentativeType from '@/interfaces/representatives/IRepresentativeType';
import IOption from '@/interfaces/shared/IOption';
import BreadCrumbsLinks from '@/mixins/BreadCrumbsLinks.vue';
import ConfirmLeavePage from '@/mixins/ConfirmLeavePage.vue';
import FormMixin from '@/mixins/FormMixin.vue';
import ValidateMixin from '@/mixins/ValidateMixin.vue';

const PatientRegistersForm = defineAsyncComponent(() => import('@/components/Patients/PatientRegistersForm.vue'));

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
    PatientRegistersForm,
  },
  computed: {
    ...mapGetters('anthropometry', ['anthropometries']),
    ...mapGetters('disabilities', ['disabilities']),
    ...mapGetters('insuranceCompanies', ['insuranceCompanies']),
    ...mapGetters('patients', ['patient']),
    ...mapGetters('representativeTypes', ['representativeTypes']),
    ...mapGetters('representatives', ['representatives']),
  },
  methods: {
    ...mapActions({
      anthropometryGetAll: 'anthropometry/getAll',
      disabilitiesGetAll: 'disabilities/getAll',
      insuranceCompaniesGetAll: 'insuranceCompanies/getAll',
      patientGet: 'patients/get',
      representativeTypesGetAll: 'representativeTypes/getAll',
      representativesGetAll: 'representatives/getAll',
    }),
  },
})
export default class PatientPage extends mixins(ValidateMixin, ConfirmLeavePage, FormMixin, BreadCrumbsLinks) {
  // Types.

  anthropometries!: IAnthropometry[];
  disabilities!: IDisability[];
  insuranceCompanies!: IInsuranceCompany[];
  insuranceCompaniesOptions!: IOption[];
  representativeTypes!: IRepresentativeType[];
  representatives!: IRepresentative[];

  anthropometryGetAll!: () => Promise<void>;
  insuranceCompaniesGetAll!: () => Promise<void>;
  patientGet!: (patientId: string) => Promise<void>;
  representativeTypesGetAll!: () => Promise<void>;
  representativesGetAll!: () => Promise<void>;

  // Local state.
  diagnosisMount = false;
  mount = false;
  offset: number[] = [0];
  patient = new Patient();
  representativeOptions: IOption[] = [];
  representativeTypesOptions: IOption[] = [];
  title = '';

  rules = {
    human: HumanRules,
  };

  // Lifecycle methods.
  async mounted(): Promise<void> {
    if (!this.$route.params.patientId) {
      this.isEditMode = false;
      this.title = 'Создать пациента';
    } else {
      this.isEditMode = true;
      await this.patientGet(`${this.$route.params.patientId}`);
      this.patient = this.$store.getters['patients/patient'];
      this.title = this.patient.human.getFullName();
    }

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

    this.pushToLinks(['/patients'], ['Список пациентов']);
    this.mount = true;
    this.diagnosisMount = true;

    window.addEventListener('beforeunload', this.beforeWindowUnload);
    this.$watch('patient', this.formUpdated, { deep: true });
  }

  beforeRouteLeave(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    this.showConfirmModal(this.submitForm, next);
  }

  // Methods.
  async submitForm(next?: NavigationGuardNext): Promise<void> {
    this.saveButtonClick = true;
    if (!this.validate(this.$refs.form)) return;

    for (const item of this.patient.representativeToPatient) {
      item.patient = undefined;
    }

    let heightId: string | undefined = '';
    let weightId: string | undefined = '';

    this.anthropometries.forEach((a: IAnthropometry) => {
      if (a.isHeight()) {
        heightId = a.id;
      }
      if (a.isWeight()) {
        weightId = a.id;
      }
    });

    this.patient.anthropometryData = HeightWeight.toAnthropometryData(this.patient.heightWeight, heightId, weightId, this.patient.id);
    await this.submitHandling('patients', this.patient, next);
  }

  addEdv(edv: IEdv): void {
    const disabilitiy = this.patient.disabilities.find((d: IDisability): boolean => d.id === edv.disabilityId);

    if (!disabilitiy) {
      return;
    }

    disabilitiy.edvs.push(edv);
  }

  removeEdv(edv: IEdv): void {
    const disabilitiy = this.patient.disabilities.find((d: IDisability): boolean => d.id === edv.disabilityId);

    if (!disabilitiy) {
      return;
    }

    const edvIndex = disabilitiy.edvs.findIndex((e: IEdv): boolean => e.id === edv.id);

    if (edvIndex < 0) {
      return;
    }

    disabilitiy.edvs.splice(edvIndex, 1);
  }
}
</script>

<style lang="scss" scoped>
.patient-page-container:deep {
  @import '@/assets/elements/collapse.scss';
}
</style>
