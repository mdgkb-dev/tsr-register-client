<template>
  <MenuContainer min-menu-item-width="200px" height="calc(100% - 2px)" background="#DFF2F8">
    <template #menu>
      <div v-for="(menu, i) in menus" :key="menu.id">
        <div :class="{ 'selected-tab': activeMenuIndex === i, tab: activeMenuIndex !== i }" @click="activeMenuIndex = i">
          {{ menu.name }}
        </div>
      </div>
    </template>
    <template #body>
      <component v-bind="menusProperties" :is="menus[activeMenuIndex].component" v-if="mounted" :patient="patient" />
    </template>
  </MenuContainer>
</template>

<script lang="ts">
import { computed, defineAsyncComponent, defineComponent, Ref, ref } from 'vue';
import { NavigationGuardNext } from 'vue-router';

import HumanRules from '@/classes/humans/HumanRules';
import Patient from '@/classes/Patient';
import DisabilityForm from '@/components/admin/Patients/DisabilityForm.vue';
// import DocumentForm from '@/components/admin/Patients/DocumentForm.vue';
import DrugForm from '@/components/admin/Patients/DrugForm.vue';
import InsuranceForm from '@/components/admin/Patients/InsuranceForm.vue';
import MenuContainer from '@/components/admin/Patients/MenuContainer.vue';
import PatientDiagnosis from '@/components/admin/Patients/PatientDiagnosis.vue';
import PatientDocuments from '@/components/admin/Patients/PatientDocuments.vue';
import PatientPageInfo from '@/components/admin/Patients/PatientPageInfo.vue';
import PatientRegisters from '@/components/admin/Patients/PatientRegisters.vue';
import PatientRepresentatives from '@/components/admin/Patients/PatientRepresentatives.vue';
import PatientResearches from '@/components/admin/Patients/PatientResearches.vue';
import HumanForm from '@/components/HumanForm.vue';
import MkbForm from '@/components/Mkb/MkbForm.vue';
import CustomSection from '@/services/classes/page/CustomSection';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';

const PatientRegistersForm = defineAsyncComponent(() => import('@/components/admin/Patients/PatientRegistersForm.vue'));

export default defineComponent({
  name: 'AdminPatientPage',
  components: {
    PatientPageInfo,
    HumanForm,
    InsuranceForm,
    // DocumentForm,
    MkbForm,
    DisabilityForm,
    PatientRepresentatives,
    PatientRegistersForm,
    DrugForm,
    PatientResearches,
    MenuContainer,
    PatientDiagnosis,
    PatientDocuments,
    PatientRegisters,
  },
  setup() {
    const activeMenuIndex: Ref<0> = ref(0);
    const menus: CustomSection[] = [
      CustomSection.Create('info', 'Паспортные данные', 'PatientPageInfo', 0, true),
      CustomSection.Create('diagnosis', 'Диагнозы', 'PatientDiagnosis', 0, true),
      CustomSection.Create('patientResearches', 'Исследования', 'PatientResearches', 0, true),
      CustomSection.Create('representatives', 'Представители', 'PatientRepresentatives', 0, true),
      CustomSection.Create('disability', 'Инвалидность', 'DisabilityForm', 0, true),
      CustomSection.Create('documents', 'Документы', 'PatientDocuments', 0, true),
      CustomSection.Create('insurances', 'Страховки', 'InsuranceForm', 0, false),
      CustomSection.Create('drugs', 'Лекарства', 'PatientDrugs', 0, true),
      CustomSection.Create('registers', 'Регистры', 'PatientRegisters', 0, true),
    ];

    const patient: Ref<Patient> = computed(() => Provider.store.getters['patients/item']);

    const menusProperties = computed(() => {
      if (menus[activeMenuIndex.value].component === 'PatientDiagnosis') {
        return { 'mkb-linker': patient.value };
      }
      return {};
    });

    const customSections: Ref<CustomSection[]> = ref([]);
    const form = ref();
    const mount: Ref<boolean> = ref(false);
    const rules = {
      human: HumanRules,
    };

    // const { links, pushToLinks } = useBreadCrumbsLinks();
    // const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    // const { validate } = useValidate();
    // const { submitHandling } = useForm(!!route.params.patientId);

    const load = async () => {
      await Provider.loadItem();
    };

    Hooks.onBeforeMount(load, {
      adminHeader: {
        title: computed(() => (Provider.route().params['id'] ? patient.value?.human?.getFullName() : 'Добавить пациента')),
        showBackButton: true,
        buttons: [],
      },
    });
    Hooks.onBeforeRouteLeave();

    const submitForm = async (next?: NavigationGuardNext): Promise<void> => {
      // saveButtonClick.value = true;
      // if (!validate(form.value)) {
      //   return;
      // }

      for (const item of patient.value.patientsRepresentatives) {
        // item.patient = undefined;
        // item.representative = undefined;
        // item.representativeType = undefined;
      }

      // await submitHandling('patients', patient.value, next);
    };

    return {
      menusProperties,
      activeMenuIndex,
      patient,
      form,
      menus,
      mounted: Provider.mounted,
      rules,
      submitForm,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';
@import '@/assets/styles/elements/base-style.scss';

.tab {
  font-size: 12px;
  text-transform: uppercase;
  color: #b0a4c0;
  border: 1px solid #999999;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */

  background: $base-background;
  margin: -0.5px;
}

.tab:hover {
  background: $custom-background;
}

.selected-tab {
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  color: $site_dark_gray;
  position: relative;
  border: 1px solid #343d5c;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */

  background: $custom-background;
  margin: -0.5px;
  z-index: 1;
}
</style>
