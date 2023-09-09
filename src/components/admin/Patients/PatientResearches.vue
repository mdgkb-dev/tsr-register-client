<template>
  <ResearcheContainer>
    <template #header>
      <div v-if="research.id && patientResearch" class="header-container">
        <Button button-class="grey-button" text="Назад" @click="cancelResearchResultsFilling(true)" />
        <TopSliderContainer>
          <template #title>
            <span>{{ research.name }}</span>
            <span v-if="researchResult">&nbsp;Дата: {{ $dateTimeFormatter.format(researchResult.date) }}</span>
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
      </div>
    </template>
    <template #body>
      <template v-if="research.id && patientResearch && patientResearch.researchId === research.id">
        <PatientResearchesResultsList
          :research="research"
          :patient-research="patientResearch"
          @select="selectResult"
          @show-chart="toggleChart"
        />
      </template>
      <template v-else>
        <PatientResearchesList type="researches" :filter-model="researchesFilter" @select="selectResearch" />
      </template>
      <PatientResearchesQuestion
        v-if="researchResult.id"
        :key="researchResult.id"
        :questions-filter-string="questionsFilterString"
        :show-only-not-filled="showOnlyNotFilled"
        @save="saveResult"
        @cancel="cancelResearchResultsFilling"
      />
      <PatientResearchChart v-if="chartOpened" :research="research" :patient-research="patientResearch" @close="toggleChart" />
      <Xlsx />
    </template>
  </ResearcheContainer>
</template>

<script lang="ts">
import { Delete, Document, Edit } from '@element-plus/icons-vue';
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
  name: 'PatientResearches',
  components: {
    PatientResearchesResultsList,
    Xlsx,
    PatientResearchesQuestion,
    PatientResearchesList,
    PatientResearchChart,
    TopSliderContainer,
    Button,
    StringItem,
    ResearcheContainer,
  },
  setup() {
    const researchesPoolsIsToggle: Ref<boolean> = ref(false);
    const showOnlyNotFilled: Ref<boolean> = ref(false);
    const questionsFilterString: Ref<string> = ref('');
    const research: Ref<Research> = computed(() => Provider.store.getters['researches/item']);
    const patientResearch: WritableComputedRef<PatientResearch | undefined> = computed(() =>
      patient.value.getPatientResearch(research.value.id)
    );
    const researchResult: Ref<ResearchResult> = computed(() => Provider.store.getters['researchesResults/item']);

    const patient: Ref<Patient> = computed(() => Provider.store.getters['patients/item']);

    const createPatientResearch = async (research: Research) => {
      if (!patient.value.getPatientResearch(research.id)) {
        const item = PatientResearch.Create(patient.value.id, research);
        patient.value.patientsResearches.push(item);
        await Provider.store.dispatch('patientsResearches/create', item);
      }
      await Provider.store.dispatch('researches/get', research.id);
    };

    const selectResearch = async (item: Research) => {
      await Provider.store.dispatch('researches/get', item.id);
      if (!patientResearch.value) {
        return await createPatientResearch(item);
      }
      Provider.store.commit('researchesResults/set');
      if (patientResearch.value?.researchResults.length === 0) {
        return;
      }
      await selectResult(patientResearch.value?.researchResults[patientResearch.value?.researchResults.length - 1].id as string);
    };

    const selectResult = async (id: string) => {
      await Provider.store.dispatch('researchesResults/get', id);
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

    const toggleResearchesPools = async (toggle: boolean) => {
      if (toggle) {
        await Provider.store.dispatch('researchesPools/getAll');
      }
      researchesPoolsIsToggle.value = toggle;
    };

    const cancelResearchFilling = () => {
      Provider.store.commit('researches/set');
    };

    const cancelResearchResultsFilling = (s: boolean) => {
      chartOpened.value = false;
      Provider.store.commit('researchesResults/set');
      if (s || !research.value.withDates) {
        Provider.store.commit('researches/set');
      }
    };

    onBeforeUnmount(() => {
      Provider.store.commit('researches/set');
      Provider.store.commit('researchesResults/set');
    });

    const chartOpened: Ref<boolean> = ref(false);
    const toggleChart = () => {
      chartOpened.value = !chartOpened.value;
    };

    return {
      researchesFilter: ResearchesFiltersLib.onlyLaboratory(),
      questionsFilterString,
      showOnlyNotFilled,
      chartOpened,
      toggleChart,
      cancelResearchFilling,
      cancelResearchResultsFilling,
      toggleResearchesPools,
      researchesPoolsIsToggle,
      saveResult,
      researchResult,
      selectResult,
      patientResearch,
      selectResearch,
      research,
      createPatientResearch,
      Delete,
      patient,

      Edit,
      Document,
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
</style>
