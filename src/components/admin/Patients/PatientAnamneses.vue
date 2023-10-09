<template>
  <ResearcheContainer>
    <template #header>
      <div v-if="research.id && patientResearch" class="header-container">
        <Button button-class="grey-button" text="Назад" @click="cancelResearchResultsFilling(true)" />
        <Button icon="back" button-class="edit-button" icon-class="edit-icon" @click="cancelResearchResultsFilling(true)" />
        <TopSliderContainer>
          <template #title>
            <span>{{ research.name }}</span>
            <span v-if="research.withScores"> &nbsp;(Баллов: {{ researchResult.calculateScores(research.getAnswerVariants()) }})</span>
          </template>
          <div v-if="research.withScores" class="flex-line">
            <StringItem string="Кол-во баллов:" font-size="14px" padding="0 10px 0 0" />
            <StringItem :string="researchResult.calculateScores(research.getAnswerVariants())" font-size="14px" padding="0 10px 0 0" />
          </div>
          <div class="flex-line">
            <StringItem string="Скрыть&nbsp;заполненные" font-size="14px" padding="0 10px 0 0" />
            <el-switch v-model="showOnlyNotFilled" placeholder="Отобразить только незаполненные" />
          </div>
          <div class="search">
            <el-input v-model="questionsFilterString" placeholder="Найти вопрос" />
          </div>
          <!-- <div v-for="res in getCalculationsResults(research)" :key="res.name" class="flex-line4">
              <div v-if="Number.isFinite(res.value)" class="res-name">{{ res.formulaName + ':' }}</div>
              <div v-if="Number.isFinite(res.value)">{{ res.value.toFixed(2) }}</div>
              <div :style="{ color: res.color }">{{ res.result }}</div>
            </div> -->
        </TopSliderContainer>
        <Button button-class="grey-button" text="Сохранить" @click="saveResult(researchResult)" />
        <Button icon="save" button-class="edit-button" icon-class="edit-icon" @click="saveResult(researchResult)" />
      </div>
    </template>

    <template #body>
      <PatientResearchesResultsList
        v-if="research.id && research.withDates && patientResearch && patientResearch.researchId === research.id"
        :research="research"
        :patient-research="patientResearch"
        @select="selectResult"
        @show-chart="toggleChart"
      />
      <PatientResearchesList v-else-if="!research.id" type="anamnesis" :filter-model="researchesFilter" @select="selectResearch" />
      <PatientResearchesQuestion
        v-if="researchResult.id"
        :key="researchResult.id"
        :questions-filter-string="questionsFilterString"
        :show-only-not-filled="showOnlyNotFilled"
        @save="saveResult"
        @cancel="cancelResearchResultsFilling"
      />
      <PatientResearchChart v-if="chartOpened" :research="research" :patient-research="patientResearch" @close="toggleChart" />
    </template>
  </ResearcheContainer>
  <!-- </div> -->
  <!-- </template>
  </RightTabsContainer> -->

  <Xlsx />
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, Ref, ref, WritableComputedRef } from 'vue';

import Xlsx from '@/assets/svg/Xlsx.svg';
import Patient from '@/classes/Patient';
import PatientResearch from '@/classes/PatientResearch';
import Research from '@/classes/Research';
import ResearchResult from '@/classes/ResearchResult';
import PatientResearchChart from '@/components/admin/Patients/PatientResearchChart.vue';
import PatientResearchesList from '@/components/admin/Patients/PatientResearchesList.vue';
import PatientResearchesQuestion from '@/components/admin/Patients/PatientResearchesQuestion.vue';
import PatientResearchesResultsList from '@/components/admin/Patients/PatientResearchesResultsList.vue';
import Button from '@/components/Base/Button.vue';
import ResearchesFiltersLib from '@/libs/filters/ResearchesFiltersLib';
import ResearcheContainer from '@/services/components/ResearcheContainer.vue';
import StringItem from '@/services/components/StringItem.vue';
import TopSliderContainer from '@/services/components/TopSliderContainer.vue';
import Provider from '@/services/Provider/Provider';
import scroll from '@/services/Scroll';

export default defineComponent({
  name: 'PatientAnamneses',
  components: {
    PatientResearchesResultsList,
    Xlsx,
    PatientResearchesQuestion,
    Button,
    ResearcheContainer,
    StringItem,
    PatientResearchesList,
    TopSliderContainer,
    PatientResearchChart,
  },
  setup() {
    const researchesPoolsIsToggle: Ref<boolean> = ref(false);
    const questionsFilterString: Ref<string> = ref('');
    const showOnlyNotFilled: Ref<boolean> = ref(false);

    const researches: Ref<Research[]> = computed(() => Provider.store.getters['researches/items']);
    const research: Ref<Research> = computed(() => Provider.store.getters['researches/item']);
    const patientResearch: WritableComputedRef<PatientResearch | undefined> = computed(() => patient.value.getPatientResearch(research.value.id));
    const researchResult: Ref<ResearchResult> = computed(() => Provider.store.getters['researchesResults/item']);

    const patient: Ref<Patient> = computed(() => Provider.store.getters['patients/item']);

    const selectOrAddResult = async (research: Research) => {
      if (!research.withDates && patientResearch.value) {
        if (patientResearch.value.researchResults.length > 0) {
          await selectResult(patientResearch.value.researchResults[0].id as string);
        } else {
          await addResult(research, patientResearch.value.id);
        }
      }
    };

    const createPatientResearch = async (research: Research) => {
      console.log('createPatientRes');

      if (!patient.value.getPatientResearch(research.id)) {
        const item = PatientResearch.Create(patient.value.id, research);
        patient.value.patientsResearches.push(item);
        await Provider.store.dispatch('patientsResearches/create', item);
      }
      await Provider.store.dispatch('researches/get', research.id);
      await selectOrAddResult(research);
    };

    const selectResearch = async (item: Research) => {
      if (!patientResearch.value) {
        return await createPatientResearch(item);
      }
      Provider.store.commit('researches/set');
      Provider.store.commit('researchesResults/set');
      await selectOrAddResult(research.value);

      await Provider.store.dispatch('researches/get', item.id);
    };

    const selectResult = async (id: string) => {
      console.log(id, 'select Resul');

      await Provider.store.dispatch('researchesResults/get', id);
    };

    const addResult = async (research: Research, patientResearchId?: string): Promise<void> => {
      const item = ResearchResult.Create(research, patientResearchId);
      patientResearch.value?.researchResults.push(item);
      await Provider.store.dispatch('researchesResults/createWithoutReset', item);
      Provider.store.commit('researchesResults/set', item);
    };

    const saveResult = async (result: ResearchResult): Promise<void> => {
      await Provider.store.dispatch('researchesResults/update', result);
      if (patientResearch.value) {
        patientResearch.value.recalculate(result);
        await Provider.store.dispatch('patientsResearches/update', patientResearch.value);
      }
      if (!research.value.withDates) {
        Provider.store.commit('researchesResults/set');
        Provider.store.commit('researches/set');
      }
    };

    const toggle = async (toggle: boolean) => {
      if (toggle) {
        await Provider.store.dispatch('researchesPools/getAll');
      }
      researchesPoolsIsToggle.value = toggle;
    };

    const cancelResearchFilling = () => {
      Provider.store.commit('researches/set');
    };

    const cancelResearchResultsFilling = (s: boolean) => {
      Provider.store.commit('researchesResults/set');
      if (s || !research.value.withDates) {
        Provider.store.commit('researches/set');
      }
    };

    const chartOpened: Ref<boolean> = ref(false);
    const toggleChart = () => {
      chartOpened.value = !chartOpened.value;
    };

    onBeforeUnmount(() => {
      Provider.store.commit('researches/set');
      Provider.store.commit('researchesResults/set');
    });

    return {
      researchesFilter: ResearchesFiltersLib.onlyAnamneses(),
      questionsFilterString,
      showOnlyNotFilled,
      cancelResearchFilling,
      cancelResearchResultsFilling,
      toggleResearchesPools: toggle,
      researchesPoolsIsToggle,
      saveResult,
      addResult,
      researchResult,
      selectResult,
      patientResearch,
      selectResearch,
      researches,
      researchesPools: researches,
      research,
      createPatientResearch,
      patient,
      chartOpened,
      toggleChart,
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
