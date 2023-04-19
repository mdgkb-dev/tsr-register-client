<template>
  <div v-if="mounted" class="patient-page-container">
    <span v-for="(menu, i) in menus" :key="menu.id">
      <button @click="activeMenuIndex = i">{{ menu.name }}</button>
    </span>
    <component :is="menus[activeMenuIndex].component" :patient="patient" />
    <!--    <el-row><PatientPageInfo :patient="patient" /></el-row>-->
    <!--    <el-row>-->
    <!--      <el-collapse>-->
    <!--        <el-form-->
    <!--          ref="form"-->
    <!--          :status-icon="true"-->
    <!--          :inline-message="true"-->
    <!--          :model="patient"-->
    <!--          :rules="rules"-->
    <!--          label-width="25%"-->
    <!--          label-position="left"-->
    <!--          @submit.prevent="submitForm"-->
    <!--        >-->
    <!--          <div>-->
    <!--          t  <el-collapse-item>-->
    <!--              <template #title>-->
    <!--                <h2 class="collapseHeader">Паспортные данные</h2>-->
    <!--              </template>-->
    <!--              <HumanForm store-name="patients" :addresses="patient.getParentsAddresses()" />-->
    <!--            </el-collapse-item>-->

    <!--            &lt;!&ndash;                        <el-collapse-item>&ndash;&gt;-->
    <!--            &lt;!&ndash;                          <template #title>&ndash;&gt;-->
    <!--            &lt;!&ndash;                            <h2 class="collapseHeader">Антропометрия</h2>&ndash;&gt;-->
    <!--            &lt;!&ndash;                          </template>&ndash;&gt;-->
    <!--            &lt;!&ndash;                          <AnthropometryForm />&ndash;&gt;-->
    <!--            &lt;!&ndash;                        </el-collapse-item>&ndash;&gt;-->

    <!--            &lt;!&ndash;            <el-collapse-item>&ndash;&gt;-->
    <!--            &lt;!&ndash;              <template #title>&ndash;&gt;-->
    <!--            &lt;!&ndash;                <h2 class="collapseHeader">Страховки</h2>&ndash;&gt;-->
    <!--            &lt;!&ndash;              </template>&ndash;&gt;-->
    <!--            &lt;!&ndash;              <InsuranceForm />&ndash;&gt;-->
    <!--            &lt;!&ndash;            </el-collapse-item>&ndash;&gt;-->

    <!--            &lt;!&ndash;            <el-collapse-item>&ndash;&gt;-->
    <!--            &lt;!&ndash;              <template #title>&ndash;&gt;-->
    <!--            &lt;!&ndash;                <h2 class="collapseHeader">Документы</h2>&ndash;&gt;-->
    <!--            &lt;!&ndash;              </template>&ndash;&gt;-->
    <!--            &lt;!&ndash;              <DocumentForm :store-module="'patients'" />&ndash;&gt;-->
    <!--            &lt;!&ndash;            </el-collapse-item>&ndash;&gt;-->

    <!--            <el-collapse-item>-->
    <!--              <template #title><h2 class="collapseHeader">Диагнозы</h2></template>-->
    <!--              <MkbForm :mkb-linker="patient" />-->
    <!--              <div v-for="mkb in patient.getMkbItems()" :key="mkb.mkbItem.id">-->
    <!--                {{ mkb.mkbItem.name }}-->
    <!--              </div>-->
    <!--            </el-collapse-item>-->

    <!--            &lt;!&ndash;            <el-collapse-item>&ndash;&gt;-->
    <!--            &lt;!&ndash;              <template #title>&ndash;&gt;-->
    <!--            &lt;!&ndash;                <h2 class="collapseHeader">Лекарства</h2>&ndash;&gt;-->
    <!--            &lt;!&ndash;              </template>&ndash;&gt;-->
    <!--            &lt;!&ndash;              <DrugForm />&ndash;&gt;-->
    <!--            &lt;!&ndash;            </el-collapse-item>&ndash;&gt;-->

    <!--            &lt;!&ndash;            <el-collapse-item>&ndash;&gt;-->
    <!--            &lt;!&ndash;              <template #title><h2 class="collapseHeader">Инвалидность</h2></template>&ndash;&gt;-->
    <!--            &lt;!&ndash;              <DisabilityForm />&ndash;&gt;-->
    <!--            &lt;!&ndash;            </el-collapse-item>&ndash;&gt;-->

    <!--            <el-collapse-item>-->
    <!--              <template #title><h2 class="collapseHeader">Законные представители</h2></template>-->
    <!--              <PatientToRepresentativeForm :patient="patient" />-->
    <!--            </el-collapse-item>-->
    <!--            <el-collapse-item>-->
    <!--              <template #title><h2 class="collapseHeader">Регистры</h2></template>-->
    <!--              <PatientRegistersForm :patient="patient" />-->
    <!--            </el-collapse-item>-->
    <!--          </div>-->
    <!--        </el-form>-->
    <!--      </el-collapse>-->
    <!--    </el-row>-->
  </div>
</template>

<script lang="ts">
import { computed, defineAsyncComponent, defineComponent, Ref, ref } from 'vue';
import { NavigationGuardNext } from 'vue-router';

import HumanRules from '@/classes/humans/HumanRules';
import Patient from '@/classes/Patient';
import DisabilityForm from '@/components/admin/Patients/DisabilityForm.vue';
import DrugForm from '@/components/admin/Patients/DrugForm.vue';
import InsuranceForm from '@/components/admin/Patients/InsuranceForm.vue';
import PatientPageInfo from '@/components/admin/Patients/PatientPageInfo.vue';
import PatientResearches from '@/components/admin/Patients/PatientResearches.vue';
import PatientToRepresentativeForm from '@/components/admin/Patients/PatientToRepresentativeForm.vue';
import DocumentForm from '@/components/DocumentForm.vue';
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
    DocumentForm,
    MkbForm,
    DisabilityForm,
    PatientToRepresentativeForm,
    PatientRegistersForm,
    DrugForm,
    PatientResearches,
  },
  setup() {
    const activeMenuIndex: Ref<0> = ref(0);
    const menus: CustomSection[] = [
      CustomSection.Create('patientResearches', 'Исследования', 'PatientResearches'),
      CustomSection.Create('info', 'Паспортные данные', 'PatientPageInfo'),
      // CustomSection.Create('insurances', 'Страховки', 'InsuranceForm'),
      // CustomSection.Create('documents', 'Документы', 'PatientDocuments'),
      // CustomSection.Create('documents', 'Диагнозы', 'PatientDiagnosis'),
      // CustomSection.Create('drugs', 'Лекарства', 'PatientDrugs'),
      // CustomSection.Create('disability', 'Инвалидность', 'Disability'),
      // CustomSection.Create('representatives', 'Представители', 'PatientRepresentatives'),
    ];

    const patient: Ref<Patient> = computed(() => Provider.store.getters['patients/item']);
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
        buttons: [{ action: Hooks.submit() }],
      },
    });
    Hooks.onBeforeRouteLeave();

    const submitForm = async (next?: NavigationGuardNext): Promise<void> => {
      // saveButtonClick.value = true;
      // if (!validate(form.value)) {
      //   return;
      // }

      for (const item of patient.value.representativeToPatient) {
        // item.patient = undefined;
        // item.representative = undefined;
        // item.representativeType = undefined;
      }

      // await submitHandling('patients', patient.value, next);
    };

    return {
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
</style>
