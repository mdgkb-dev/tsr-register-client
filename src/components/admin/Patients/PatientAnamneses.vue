<template>
  <ResearcheContainer>
    <template #header>
      <div v-if="research.id && patientResearch" class="header-container">
        <Button button-class="grey-button" text="Назад" @click="cancelResearchResultsFilling(true)" />
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
      </div>
    </template>

    <template #body>
      <PatientResearchesResultsList
        v-if="research.id && patientResearch && patientResearch.researchId === research.id"
        :research="research"
        :patient-research="patientResearch"
        @select="selectResult"
        @show-chart="toggleChart"
      />
      <PatientResearchesList v-else type="anamnesis" :filter-model="researchesFilter" @select="selectResearch" />
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
    const patientResearch: WritableComputedRef<PatientResearch | undefined> = computed(() =>
      patient.value.getPatientResearch(research.value.id)
    );
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
      Delete,
      patient,
      chartOpened,
      toggleChart,

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

// .button {
//   width: auto;
//   height: 34px;
//   border-radius: 5px;
//   color: #006bb4;
//   font-size: 12px;

//   &-filter {
//     background: #ffffff;
//   }

//   &-download {
//     background: #dff2f8;
//   }
// }

// .back-button {
//   background: #ffffff;
//   margin: 0 10px 0 0;
//   height: 42px;
//   font-size: 16px;
//   border-radius: 5px;
//   color: #343e5c;
// }

// .chart-button {
//   width: 63px;
//   height: 42px;
//   border-radius: 5px;
//   color: #343e5c;
//   background: #ffffff;
//   font-size: 16px;
// }

// .hidden {
//   display: none;
// }

// .el-form-item {
//   margin: 0;
// }

// .el-divider {
//   margin: 10px 0;
// }

// .slider-body {
//   width: 180px;
//   height: auto;
//   border: 1px solid #379fff;
//   border-top-left-radius: $normal-border-radius;
//   border-bottom-left-radius: $normal-border-radius;
//   background: #ffffff;
//   box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
//   display: grid;
//   grid-gap: 6px;
//   grid-template-rows: repeat(0 0px);
//   grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
//   padding: 6px;
// }

// .slider-body > div {
//   object-fit: cover;
// }

// .slider-item {
//   width: 163px;
//   height: 40px;
//   border: 1px solid #b0a4c0;
//   border-radius: $normal-border-radius;
//   background: $base-background;
//   box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 3px;
//   font-size: 14px;
//   color: #b0a4c0;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
// }

// .slider-item:hover {
//   border: 1px solid #379fff;
//   background: $base-background;
//   color: #379fff;
// }

// .slider-item-active {
//   width: 163px;
//   height: 40px;
//   border: 1px solid #379fff;
//   border-radius: $normal-border-radius;
//   background: $custom-background;
//   box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 3px;
//   font-size: 14px;
//   color: #343e5c;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
// }

// .slider-item:active {
//   border: 1px solid #379fff;
//   background: $custom-background;
//   color: #343e5c;
// }

// .tabs-item {
//   width: 101px;
//   height: 51px;
//   border: 1px solid #b0a4c0;
//   border-top-right-radius: $normal-border-radius;
//   border-bottom-right-radius: $normal-border-radius;
//   border-left: none;
//   background: $base-background;
//   box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 3px;
//   font-size: 14px;
//   color: #b0a4c0;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
//   margin-top: 5px;
//   transition: 0.3s;
// }

// .tabs-item:hover {
//   width: 105px;
// }

// .tabs-item-active {
//   position: relative;
//   width: 106px;
//   height: 56px;
//   border: 1px solid #379fff;
//   border-top-right-radius: $normal-border-radius;
//   border-bottom-right-radius: $normal-border-radius;
//   border-left: none;
//   background: $custom-background;
//   box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 3px;
//   font-size: 14px;
//   font-weight: bold;
//   color: #343e5c;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
//   margin-left: 0;
//   z-index: 2;
// }

// .tabs-item-active:hover {
//   width: 106px;
// }

// .icon-plus {
//   width: 40px;
//   height: 40px;
//   cursor: pointer;
// }

// .body {
//   width: 100%;
//   height: 100%;
//   border-right: 1px solid #379fff;
//   box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
//   z-index: 5;
// }

// .researche-title {
//   width: calc(100% - 22px);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 60px;
//   margin: 0 10px;
// }

// .researche-name {
//   min-height: 40px;
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   color: #343e5c;
//   font-size: 14px;
//   text-transform: uppercase;
// }

// .plus-button {
//   width: calc(100% - 20px);
//   border-radius: 5px;
//   color: #00bea5;
//   background: #c1efeb;
//   height: 60px;
//   margin: 0 10px;
// }

// :deep(.icon-plus) {
//   width: 40px;
//   height: 40px;
//   fill: #00bea5;
//   cursor: pointer;
// }

// .patient-research {
//   position: relative;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
//   width: calc(100% - 32px);
//   height: 40px;
//   border-radius: $normal-border-radius;
//   border: $light-pink-border;
//   background: #ffffff;
//   padding: 0 10px;
//   margin: 10px 10px 10px 0;
//   cursor: pointer;
// }

// .blur {
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: #000000;
//   opacity: 0.3;
//   z-index: 20;
// }

// .research-info {
//   position: fixed;
//   top: 49%;
//   left: 50%;
//   width: calc(99% - 22px);
//   height: calc(98% - 22px);
//   transform: translate(-50%, -50%);
//   background: #dff2f8;
//   border: $light-pink-border;
//   border-radius: $normal-border-radius;
//   margin: 10px 10px 0 0;
//   padding: 10px 10px 10px 10px;
//   overflow: hidden;
//   overflow-y: auto;
//   z-index: 21;
// }

// .tools {
//   display: flex;
//   flex-direction: column;
//   justify-content: left;
//   align-items: center;
//   height: auto;
//   padding: 10px 0;
//   width: calc(100% - 2px);
//   background: #dff2f8;
// }

// .scroll-block {
//   width: 100%;
//   height: calc(100% - 220px);
//   overflow: hidden;
//   overflow-y: auto;
// }

// .question-item {
//   background: #dff2f8;
//   border: $light-pink-border;
//   border-radius: $normal-border-radius;
//   padding: 10px;
//   margin-bottom: 10px;
//   background: #ffffff;
// }

// .question-name {
//   width: 100%;
//   height: 40px;
//   display: flex;
//   justify-content: left;
//   align-items: center;
//   font-size: 22px;
//   color: #343e5c;
//   margin-bottom: 10px;
// }

// .background-container {
//   width: auto;
//   padding: 10px;
//   margin: 0 10px 10px 10px;
//   background: #dff2f8;
//   background: #ffffff;
//   border-radius: 5px;
//   border: 1px solid #c3c3c3;
// }

// .patient-name {
//   display: flex;
//   justify-content: left;
//   align-items: center;
//   font-size: 24px;
//   height: 40px;
//   color: #343e5c;
// }

// .header-container {
//   display: flex;
//   justify-content: space-between;
//   align-items: flex-start;
// }

// .researche-title-name {
//   font-size: 20px;
//   display: block;
//   color: #343e5c;
//   padding: 10px 0;
// }

// .researche-counter {
//   font-size: 20px;
//   color: #379fff;
//   display: flex;
//   justify-content: right;
//   align-items: flex-start;
//   text-transform: uppercase;
//   white-space: nowrap;
//   height: 100%;
// }

// .control-buttons {
//   width: 100%;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   // padding-bottom: 10px;
// }

// .left {
//   min-width: 300px;
//   display: flex;
//   justify-content: left;
//   align-items: center;
// }

// .right {
//   max-width: 300px;
//   display: flex;
//   justify-content: right;
//   align-items: center;
// }

// .search {
//   display: flex;
//   justify-content: left;
//   align-items: center;
// }

// .icon-xlsx {
//   width: 40px;
//   height: 40px;
//   fill: #343e5c;
//   cursor: pointer;
//   transition: 0.3s;
//   margin-top: 10px;
// }

// .icon-xlsx:hover {
//   fill: #379fff;
// }

// .line-item {
//   display: flex;
//   justify-content: right;
//   align-items: center;
//   width: calc(100% - 20px);
//   margin: 10px 0;
//   max-width: 100%;
//   height: 54px;
// }

// .flex-line {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
// }

// .flex-line2 {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
// }

// .flex-line3 {
//   display: flex;
//   justify-content: left;
//   align-items: center;
//   width: 100%;
//   height: 60px;
// }

// .flex-line4 {
//   display: flex;
//   justify-content: left;
//   align-items: center;
//   width: 100%;
//   height: auto;
//   padding: 10px 0;
//   color: #00b5a4;
//   font-size: 18px;
// }

// .res-name {
//   margin-right: 10px;
// }

// :deep(.el-timeline) {
//   padding: 0 0 0 10px;
// }

// :deep(.el-timeline-item) {
//   padding-bottom: 8px;
// }

// :deep(.el-timeline-item__node) {
//   background: #b0a4c0;
// }

// :deep(.el-timeline-item__wrapper) {
//   padding-left: 20px;
// }

// @media screen and (max-width: 768px) {
//   .tabs-item {
//     width: 40px;
//     height: 100px;
//   }

//   .tabs-item:hover {
//     width: 44px;
//   }

//   .tabs-item-active {
//     position: relative;
//     width: 45px;
//     height: 100px;
//   }

//   .tabs-item-active:hover {
//     width: 45px;
//   }

//   .tab-item-text {
//     transform: rotate(90deg);
//   }
// }
</style>
