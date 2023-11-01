<template>
  <PatientResearchesResultsList
    v-if="research.id && research.withDates && patientResearch.id"
    :research="research"
    :patient-research="patientResearch"
    @select="selectResult"
    @add-result="addResult"
    @save="$emit('save')"
  />
  <PatientResearchesQuestion v-if="researchResult.id" :key="researchResult.id" />
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, onBeforeUnmount, Ref } from 'vue';

import Patient from '@/classes/Patient';
import PatientResearch from '@/classes/PatientResearch';
import Research from '@/classes/Research';
import ResearchResult from '@/classes/ResearchResult';
import PatientResearchesQuestion from '@/components/admin/Patients/PatientResearchesQuestion.vue';
import PatientResearchesResultsList from '@/components/admin/Patients/PatientResearchesResultsList.vue';
import Provider from '@/services/Provider/Provider';
import scroll from '@/services/Scroll';

export default defineComponent({
  name: 'PatientResearchComponent',
  components: {
    PatientResearchesResultsList,
    PatientResearchesQuestion,
  },
  emits: ['save'],
  setup() {
    const research: Ref<Research> = computed(() => Provider.store.getters['researches/item']);
    const patientResearch: ComputedRef<PatientResearch> = computed(() => Provider.store.getters['patientsResearches/item']);
    const researchResult: Ref<ResearchResult> = computed(() => Provider.store.getters['researchesResults/item']);

    const patient: Ref<Patient> = computed(() => Provider.store.getters['patients/item']);

    onBeforeMount(async () => {
      Provider.store.commit('researchesResults/set');
      await getPatientResearch(research.value);
      if (patientResearch.value.researchResults.length > 0) {
        return await selectResult(patientResearch.value.getLastResult()?.id as string);
      } else if (!research.value.withDates) {
        return await addResult();
      }
    });

    const createPatientResearch = async (research: Research) => {
      const item = PatientResearch.Create(patient.value.id, research);
      await Provider.store.dispatch('patientsResearches/create', item);
      await Provider.store.commit('patientsResearches/set', item);
    };

    const getPatientResearch = async (research: Research) => {
      await Provider.store.dispatch('patientsResearches/getPatientResearch', { researchId: research.id, patientId: patient.value.id });
      if (!patientResearch.value.id) {
        await createPatientResearch(research);
      }
    };

    const selectResult = async (id: string) => {
      await Provider.store.dispatch('researchesResults/get', id);
    };

    const addResult = async (): Promise<void> => {
      const item = ResearchResult.Create(research.value, patientResearch.value.id);
      patientResearch.value?.researchResults.push(item);
      await Provider.store.dispatch('researchesResults/create', item);
      Provider.store.commit('researchesResults/set', item);
    };

    onBeforeUnmount(() => {
      Provider.store.commit('researches/set');
      Provider.store.commit('researchesResults/set');
      Provider.store.commit('patientsResearches/set');
    });

    return {
      addResult,
      researchResult,
      selectResult,
      patientResearch,
      research,
      createPatientResearch,
      patient,
      scroll,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';
@import '@/assets/styles/elements/base-style.scss';

.header-container {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.grey-button {
  width: 120px;
  border-radius: 5px;
  height: 42px;
  color: #006bb4;
  background: #f5f5f5;
  margin: 0 10px;
  font-size: 14px;
}

.edit-button {
  display: none;
  min-width: 40px;
  max-width: 40px;
  height: 40px;
  border-radius: 5px;
  color: #006bb4;
  background: #f5f5f5;
}

.flex-line {
  height: 42px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.search {
  display: flex;
  justify-content: left;
  align-items: center;
}

:deep(.edit-icon) {
  width: 28px;
  height: 28px;
  fill: #006bb4;
}

@media screen and (max-width: 768px) {
  .grey-button {
    display: none;
  }

  .edit-button {
    display: flex;
  }
}
</style>
