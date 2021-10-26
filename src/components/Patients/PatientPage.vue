<template>
  <div v-if="mount" class="patient-page-container">
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
              <HumanForm :store-name="'patients'" />
            </el-collapse-item>

            <el-collapse-item>
              <template #title>
                <h2 class="collapseHeader">Антропометрия</h2>
              </template>
              <AnthropometryForm />
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
              <DocumentForm :store-module="'patients'" />
            </el-collapse-item>

            <el-collapse-item>
              <template #title><h2 class="collapseHeader">Диагнозы</h2></template>
              <MkbForm :store-module="'patients'" />
            </el-collapse-item>

            <el-collapse-item>
              <template #title>
                <h2 class="collapseHeader">Лекарства</h2>
              </template>
              <DrugForm />
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

import HumanRules from '@/classes/humans/HumanRules';
import MainHeader from '@/classes/shared/MainHeader';
import DocumentForm from '@/components/DocumentForm.vue';
import HumanForm from '@/components/HumanForm.vue';
import MkbForm from '@/components/Mkb/MkbForm.vue';
import AnthropometryForm from '@/components/Patients/AnthropometryForm.vue';
import DisabilityForm from '@/components/Patients/DisabilityForm.vue';
import DrugForm from '@/components/Patients/DrugForm.vue';
import InsuranceForm from '@/components/Patients/InsuranceForm.vue';
import PatientPageInfo from '@/components/Patients/PatientPageInfo.vue';
import PatientToRepresentativeForm from '@/components/Patients/PatientToRepresentativeForm.vue';
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
    PatientRegistersForm,
    DrugForm,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const patient: Ref<IPatient> = computed(() => store.getters['patients/patient']);

    const form = ref();
    const mount: Ref<boolean> = ref(false);
    const rules = {
      human: HumanRules,
    };

    const { links, pushToLinks } = useBreadCrumbsLinks();
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    const { validate } = useValidate();
    const { submitHandling } = useForm(!!route.params.patientId);

    onBeforeMount(async () => {
      let title: string;
      if (!route.params.patientHistoryId) {
        if (!route.params.patientId) {
          await store.commit('patients/resetPatient');
          title = 'Создать пациента';
        } else {
          await store.dispatch('patients/get', route.params.patientId);
          title = patient.value.human.getFullName();
        }
        pushToLinks(['/patients'], ['Список пациентов']);
        if (route.params.mode) {
          store.commit('patients/setEditMode', false);
          store.commit('main/setMainHeader', new MainHeader({ title, links }));
        } else {
          store.commit('patients/setEditMode', true);
          store.commit('main/setMainHeader', new MainHeader({ title, links, save: submitForm }));
          window.addEventListener('beforeunload', beforeWindowUnload);
          watch(patient, formUpdated, { deep: true });
        }
        store.commit('main/setActiveMenu', 'Patients');
      } else {
        await store.dispatch('patients/getHistory', route.params.patientHistoryId);
        pushToLinks([`/patients/history/${route.params.patientId}`], ['История пациента']);
        title = patient.value.human.getFullName();
        store.commit('main/setMainHeader', new MainHeader({ title, links }));
        store.commit('patients/setEditMode', false);
        store.commit('main/setActiveMenu', 'HistoryList');
      }
      mount.value = true;
    });

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submitForm, next);
    });

    const submitForm = async (next?: NavigationGuardNext): Promise<void> => {
      saveButtonClick.value = true;
      if (!validate(form.value)) {
        return;
      }

      for (const item of patient.value.representativeToPatient) {
        item.patient = undefined;
        item.representative = undefined;
        item.representativeType = undefined;
      }

      await submitHandling('patients', patient.value, next);
    };

    return {
      patient,
      form,
      links,
      mount,
      rules,
      submitForm,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';
</style>
