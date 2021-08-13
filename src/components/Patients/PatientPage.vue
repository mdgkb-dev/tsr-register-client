<template>
  <div v-if="mount" class="patient-page-container">
    <PageHead :title="title" :links="links" :show-save-button="true" @submitForm="submitForm" />
    <el-row><PatientPageInfo :patient="patient" /></el-row>
    <el-row>
      <el-collapse>
        <el-form
          ref="form"
          :status-icon="true"
          :inline-message="true"
          :model="patient"
          :rules="rules"
          label-width="25%"
          label-position="left"
          @submit.prevent="submitForm"
        >
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
              <AnthropometryForm
                :in-height-weight="patient.heightWeight"
                :is-male="patient.human.isMale"
                :in-birth-date="patient.human.dateBirth"
              />
            </el-collapse-item>

            <el-collapse-item>
              <template #title>
                <h2 class="collapseHeader">Страховки</h2>
              </template>
              <InsuranceForm />
            </el-collapse-item>

            <el-collapse-item>
              <template #title>
                <h2 class="collapseHeader">Документы</h2>
              </template>
              <DocumentForm v-model:documents="patient.human.documents" v-model:fileInfos="patient.human.fileInfos" />
            </el-collapse-item>

            <el-collapse-item>
              <template #title><h2 class="collapseHeader">Диагнозы</h2></template>
              <MkbForm v-model:diagnosisData="patient.patientDiagnosis" :patient-diagnosis="true" />
            </el-collapse-item>

            <el-collapse-item>
              <template #title><h2 class="collapseHeader">Инвалидность</h2></template>
              <DisabilityForm />
            </el-collapse-item>

            <el-collapse-item>
              <template #title><h2 class="collapseHeader">Законные представители</h2></template>
              <PatientToRepresentativeForm />
            </el-collapse-item>
            <el-collapse-item>
              <template #title><h2 class="collapseHeader">Регистры</h2></template>
              <PatientRegistersForm />
            </el-collapse-item>
          </div>
        </el-form>
      </el-collapse>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineAsyncComponent, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute } from 'vue-router';
import { useStore } from 'vuex';

import HeightWeight from '@/classes/anthropometry/HeightWeight';
import HumanRules from '@/classes/humans/HumanRules';
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
import IPatient from '@/interfaces/patients/IPatient';
import useBreadCrumbsLinks from '@/mixins/useBreadCrumbsLinks';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import useForm from '@/mixins/useForm';
import useValidate from '@/mixins/useValidate';

const PatientRegistersForm = defineAsyncComponent(() => import('@/components/Patients/PatientRegistersForm.vue'));

export default defineComponent({
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
  setup() {
    const store = useStore();
    const route = useRoute();

    const anthropometries: Ref<IAnthropometry[]> = computed(() => store.getters['anthropometries/anthropometries']);
    const patient: Ref<IPatient> = computed(() => store.getters['patients/patient']);

    const form = ref();
    const isEditMode: Ref<boolean> = ref(false);
    const mount: Ref<boolean> = ref(false);
    const rules = {
      human: HumanRules,
    };
    const title: Ref<string> = ref('');

    const { links, pushToLinks } = useBreadCrumbsLinks();
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    const { submitHandling } = useForm(isEditMode.value);
    const { validate } = useValidate();

    onBeforeMount(async () => {
      if (!route.params.patientId) {
        isEditMode.value = false;
        title.value = 'Создать пациента';
      } else {
        isEditMode.value = true;
        await store.dispatch('patients/get', route.params.patientId);
        title.value = patient.value.human.getFullName();
      }
      await store.dispatch('anthropometry/getAll', route.params.patientId);
      pushToLinks(['/patients'], ['Список пациентов']);
      mount.value = true;

      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(patient, formUpdated, { deep: true });
    });

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submitForm, next);
    });

    const submitForm = async (next?: NavigationGuardNext): Promise<void> => {
      saveButtonClick.value = true;
      if (!validate(form.value)) return;

      for (const item of patient.value.representativeToPatient) {
        item.patient = undefined;
      }

      let heightId: string | undefined = '';
      let weightId: string | undefined = '';

      anthropometries.value.forEach((a: IAnthropometry) => {
        if (a.isHeight()) heightId = a.id;
        if (a.isWeight()) weightId = a.id;
      });
      patient.value.anthropometryData = HeightWeight.toAnthropometryData(patient.value.heightWeight, heightId, weightId, patient.value.id);
      await submitHandling('representatives', patient.value, next);
    };

    return {
      patient,
      form,
      isEditMode,
      links,
      mount,
      rules,
      title,
      submitForm,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';
</style>
