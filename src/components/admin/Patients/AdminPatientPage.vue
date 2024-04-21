<template>
  <MenuContainer v-if="mounted" min-menu-item-width="160px" background="#DFF2F8">
    <template #menu>
      <div v-for="menu in customSections" :key="menu.id">
        <div :class="{ 'selected-tab': activeMenu.id === menu.id, tab: activeMenu.id !== menu.id }"
          @click="changeMenu(menu.id)">
          {{ menu.name }}
        </div>
      </div>
    </template>
    <template #body>
      <component v-bind="menusProperties" :is="activeMenu.component" :key="componentKey" />
    </template>
  </MenuContainer>
</template>

<script lang="ts">
import { ElMessageBox } from 'element-plus';
import { computed, ComputedRef, defineAsyncComponent, defineComponent, Ref, ref } from 'vue';

import HumanRules from '@/classes/humans/HumanRules';
import Patient from '@/classes/Patient';
import DisabilityForm from '@/components/admin/Patients/DisabilityForm.vue';
import DrugForm from '@/components/admin/Patients/DrugForm.vue';
import InsuranceForm from '@/components/admin/Patients/InsuranceForm.vue';
import PatientAnamneses from '@/components/admin/Patients/PatientAnamneses.vue';
import PatientCommissions from '@/components/admin/Patients/PatientCommissions/PatientCommissions.vue';
import PatientDiagnosis from '@/components/admin/Patients/PatientDiagnosis/PatientDiagnosis.vue';
import PatientDocuments from '@/components/admin/Patients/PatientDocuments.vue';
import PatientHistories from '@/components/admin/Patients/PatientHistories.vue';
import PatientPageInfo from '@/components/admin/Patients/PatientPageInfo.vue';
import PatientRegisters from '@/components/admin/Patients/PatientRegisters.vue';
import PatientRepresentatives from '@/components/admin/Patients/PatientRepresentatives.vue';
import PatientResearches from '@/components/admin/Patients/PatientResearches.vue';
import HumanForm from '@/components/HumanForm.vue';
import MkbForm from '@/components/Mkb/MkbForm.vue';
import CustomSection from '@/services/classes/page/CustomSection';
import InputNumber from '@/services/components/InputNumber.vue';
import MenuContainer from '@/services/components/MenuContainer.vue';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';

const PatientRegistersForm = defineAsyncComponent(() => import('@/components/admin/Patients/PatientRegistersForm.vue'));

export default defineComponent({
  name: 'AdminPatientPage',
  components: {
    PatientPageInfo,
    HumanForm,
    InsuranceForm,
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
    PatientHistories,
    PatientCommissions,
    PatientAnamneses,
    InputNumber,
  },
  setup() {
    const componentKey = ref(0);
    const customSections: ComputedRef<CustomSection[]> = computed(() => Provider.store.getters['customSections/items']);
    // const menus: CustomSection[] = [
    //   CustomSection.Create('info', 'Паспортные данные', 'PatientPageInfo', 0, true),
    //   CustomSection.Create('diagnosis', 'Диагнозы', 'PatientDiagnosis', 0, true),
    //   CustomSection.Create('anamneses', 'Анамнез', 'PatientAnamneses', 0, true),
    //   CustomSection.Create('patientResearches', 'Исследования', 'PatientResearches', 0, true),
    //   CustomSection.Create('representatives', 'Представители', 'PatientRepresentatives', 0, true),
    //   CustomSection.Create('disability', 'Инвалидность', 'DisabilityForm', 0, true),
    //   CustomSection.Create('documents', 'Документы', 'PatientDocuments', 0, true),
    //   // CustomSection.Create('insurances', 'Страховки', 'InsuranceForm', 0, false),
    //   // CustomSection.Create('drugs', 'Лекарства', 'PatientDrugs', 0, true),
    //   CustomSection.Create('commission', 'Врачебные комиссии', 'PatientCommissions', 0, true),
    //   CustomSection.Create('registers', 'Регистры', 'PatientRegisters', 0, true),
    //   // CustomSection.Create('histories', 'История изменений', 'PatientHistories', 0, true),
    // ];
    const activeMenu: Ref<CustomSection> = ref(customSections.value[0]);

    const mounted = ref(false)
    const patient: Ref<Patient> = computed(() => Provider.store.getters['patients/item']);
    const menusProperties = computed(() => {
      if (activeMenu.value.component === 'PatientDiagnosis') {
        return { 'mkb-linker': patient.value };
      }
      return {};
    });

    const form = ref();
    const rules = {
      human: HumanRules,
    };

    const setMenuFromRoute = () => {
      let menu = Provider.route().query.menu as string;
      if (!menu) {
        menu = customSections.value[0].id;
      }
      changeMenu(menu);
    };

    const changeMenu = (customSectionId: string) => {
      const section = customSections.value.find((m: CustomSection) => m.id === customSectionId);
      if (!section) {
        return;
      }
      activeMenu.value = section;
      Provider.router.replace({ query: { menu: section.id as string } });
      componentKey.value += 1;
    };

    const load = async () => {
      await Provider.store.dispatch('customSections/getAll', { withCache: true });
      setMenuFromRoute();
      const id = Provider.route().params['id']
      if (id) {
        mounted.value = true
        return await Store.Get('patients', id);
      }
      const patient = new Patient();
      await Provider.store.dispatch('patients/create', patient);
    };

    const remove = async () => {
      ElMessageBox.confirm('Вы уверены, что хотите удалить пациента?', {
        distinguishCancelAndClose: true,
        confirmButtonText: 'Удалить',
        cancelButtonText: 'Отмена',
      }).then(async () => {
        await Provider.store.dispatch('patients/remove', Provider.route().params['id']);
        await Provider.router.push('/admin/patients');
      });
    };

    Hooks.onBeforeMount(load, {
      adminHeader: {
        title: computed(() => patient.value?.human?.getFullName()),
        showBackButton: true,
        buttons: [{ text: 'Удалить пациента', type: 'warning-button', action: remove }],
      },
    });
    Hooks.onBeforeRouteLeave();

    return {
      componentKey,
      changeMenu,
      menusProperties,
      activeMenu,
      patient,
      form,
      // menus,
      mounted,
      rules,
      customSections,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';
@import '@/assets/styles/elements/base-style.scss';

.field {
  width: 100%;
  height: 100%;
  background: red;
  padding: 10px;
}

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
  text-align: center;

  -webkit-user-select: none;
  /* Safari */
  -ms-user-select: none;
  /* IE 10 and IE 11 */
  user-select: none;
  /* Standard syntax */

  background: #f5f5f5;
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
  text-align: center;
  cursor: pointer;

  -webkit-user-select: none;
  /* Safari */
  -ms-user-select: none;
  /* IE 10 and IE 11 */
  user-select: none;
  /* Standard syntax */

  background: $custom-background;
  margin: -0.5px;
  z-index: 1;
}
</style>
