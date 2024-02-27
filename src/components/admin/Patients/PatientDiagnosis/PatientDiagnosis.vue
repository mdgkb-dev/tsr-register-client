<template>
  <RightTabsContainer :is-toggle="isToggle" slider-on-width="180px" @toggle="toggle">
    <template #icon>
      <svg class="icon-plus">
        <use xlink:href="#plus"></use>
      </svg>
    </template>
    <template #slider-body>
      <div class="slider-body">
        <RemoteSearch key-value="mkbItem" placeholder="Начните вводить название диагноза" @select="addMkbItem" />
      </div>
    </template>
    <template #tabs>
      <div
        v-for="patientDiagnosis in patient.patientDiagnosis"
        :key="patientDiagnosis.id"
        :class="{
          'tabs-item-active': selectedPatientDiagnosisId === patientDiagnosis.id,
          'tabs-item': selectedPatientDiagnosisId !== patientDiagnosis.id,
        }"
        @click="selectPatientDiagnosis(patientDiagnosis.id)"
      >
        <div class="tab-item-text">
          {{ patientDiagnosis.mkbItem.getCode() }}
        </div>
      </div>
    </template>
    <template #body>
      <div class="body">
        <PatientDiagnosisForm />
      </div>
    </template>
  </RightTabsContainer>
  <svg width="0" height="0" class="hidden">
    <symbol id="plus" stroke="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M17.5 11.0714H11.0714V17.5H8.92857V11.0714H2.5V8.92857H8.92857V2.5H11.0714V8.92857H17.5V11.0714Z"></path>
    </symbol>
  </svg>

  <svg width="0" height="0" class="hidden">
    <symbol id="back" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21">
      <path
        d="M7.33333 7.8C13.901 7.20467 18.1253 9.738 20 15.4C16.4217 11.4227 11.9681 10.6905 7.33333 12.8667V16.6667L1 10.3333L7.33333 4V7.8Z"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </symbol>
  </svg>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';

import MkbItem from '@/classes/MkbItem';
import Patient from '@/classes/Patient';
import PatientDiagnosis from '@/classes/PatientDiagnosis';
import PatientDiagnosisForm from '@/components/admin/Patients/PatientDiagnosis/PatientDiagnosisForm.vue';
import RemoteSearch from '@/services/components/RemoteSearch.vue';
import ISearchObject from '@/interfaces/ISearchObject';
import ClassHelper from '@/services/ClassHelper';
import RightTabsContainer from '@/services/components/RightTabsContainer.vue';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'PatientDiagnosis',
  components: {
    RemoteSearch,
    RightTabsContainer,
    PatientDiagnosisForm,
  },

  setup() {
    const isToggle: Ref<boolean> = ref(false);
    const patient: ComputedRef<Patient> = computed(() => Provider.store.getters['patients/item']);
    const selectedPatientDiagnosisId: Ref<string> = ref('');
    const toggle = async (toggle: boolean) => {
      isToggle.value = toggle;
    };

    let expandRowKeys: Ref<(string | undefined)[]> = ref([]);
    const searchFormRef = ref();
    const isEditMode: ComputedRef<boolean> = computed<boolean>(() => Provider.store.getters['patients/isEditMode']);
    const mkbItem: ComputedRef<MkbItem> = computed<MkbItem>(() => Provider.store.getters['mkbItems/item']);

    onBeforeMount(() => {
      const diagnosis = patient.value.getMkbItems();
      if (diagnosis.length > 0) {
        selectPatientDiagnosis(diagnosis[diagnosis.length - 1].id as string);
      }
    });

    const addMkbItem = async (event: ISearchObject): Promise<void> => {
      await Provider.store.dispatch('mkbItems/get', event.value);
      patient.value.addMkbItem(mkbItem.value);
      const diagnosisLinks = patient.value.getMkbItems();
      await Provider.store.dispatch('patientsDiagnosis/create', diagnosisLinks[diagnosisLinks.length - 1]);
      selectPatientDiagnosis(diagnosisLinks[diagnosisLinks.length - 1].id as string);
      isToggle.value = false;
    };

    const removePatientDiagnosis = async (id: string): Promise<void> => {
      ClassHelper.RemoveFromClassById(id, patient.value.patientDiagnosis, []);
      await Provider.store.dispatch('patientsDiagnosis/remove', id);
    };

    const updatePatientDiagnosis = async (patientDiagnosis: PatientDiagnosis) => {
      await Provider.store.dispatch('patientsDiagnosis/update', patientDiagnosis);
    };

    const selectPatientDiagnosis = (patientDiagnosisId?: string): void => {
      const findDiagnosis = patient.value.patientDiagnosis.find((p: PatientDiagnosis) => p.id === patientDiagnosisId);
      selectedPatientDiagnosisId.value = findDiagnosis?.id ?? '';
      Provider.store.commit('patientsDiagnosis/set', findDiagnosis);
    };

    return {
      isToggle,
      selectPatientDiagnosis,
      selectedPatientDiagnosisId,
      toggle,
      updatePatientDiagnosis,
      removePatientDiagnosis,
      searchFormRef,
      expandRowKeys,
      isEditMode,
      addMkbItem,
      patient,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';
@import '@/assets/styles/elements/base-style.scss';

.icon-plus {
  width: 40px;
  height: 40px;
  cursor: pointer;
}

.slider-body {
  width: 180px;
  height: auto;
  border: 1px solid #379fff;
  border-top-left-radius: $normal-border-radius;
  border-bottom-left-radius: $normal-border-radius;
  background: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
  display: grid;
  grid-gap: 6px;
  grid-template-rows: repeat(0 0px);
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  padding: 6px;
}

.slider-body > div {
  object-fit: cover;
}

.tabs-item {
  width: 101px;
  height: 51px;
  border: 1px solid #b0a4c0;
  border-top-right-radius: $normal-border-radius;
  border-bottom-right-radius: $normal-border-radius;
  border-left: none;
  background: $base-background;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 3px;
  font-size: 14px;
  color: #b0a4c0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 5px;
  cursor: pointer;
}

.tabs-item-active {
  position: relative;
  width: 106px;
  height: 56px;
  border: 1px solid #379fff;
  border-top-right-radius: $normal-border-radius;
  border-bottom-right-radius: $normal-border-radius;
  border-left: none;
  background: $custom-background;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 3px;
  font-size: 14px;
  font-weight: bold;
  color: #343e5c;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-left: 0;
  z-index: 2;
  cursor: default;
}

.body {
  width: 100%;
  height: 100%;
  border-right: 1px solid #379fff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
  z-index: 5;
}

.hidden {
  display: none;
}

@media screen and (max-width: 768px) {
  .tabs-item {
    width: 40px;
    height: 100px;
  }

  .tabs-item:hover {
    width: 44px;
  }

  .tabs-item-active {
    position: relative;
    width: 45px;
    height: 100px;
  }

  .tabs-item-active:hover {
    width: 45px;
  }

  .tab-item-text {
    transform: rotate(90deg);
  }
}
</style>
