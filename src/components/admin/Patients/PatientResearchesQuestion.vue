<template>
  <!-- <div class="blur"></div> -->
  <div class="research-info">
    <!-- <div class="patient-name">{{ patient.human.getFullName() }}</div> -->
    <div class="header-container">
      <!-- <div class="researche-title-name">{{ research.name }}</div> -->
      <!-- <div class="researche-counter">Заполнено: {{ researchResult.fillingPercentage }}%</div> -->
      <!-- <div v-if="research.withScores" class="researche-counter">
        Кол-во баллов: {{ researchResult.calculateScores(research.getAnswerVariants()) }}
      </div> -->
    </div>
    <div v-for="res in getCalculationsResults(research)" :key="res.name" class="flex-line4">
      <div v-if="Number.isFinite(res.value)" class="res-name">{{ res.formulaName + ':' }}</div>
      <div v-if="Number.isFinite(res.value)">{{ res.value.toFixed(2) }}</div>
      <div :style="{ color: res.color }">{{ res.result }}</div>
    </div>
    <div class="tools">
      <div class="control-buttons">
        <!-- <div class="left"> -->
        <div class="search">
          <el-input v-model="questionsFilterString" placeholder="Найти вопрос" />
        </div>
        <div class="flex-line">
          <StringItem string="Скрыть&nbsp;заполненные" font-size="14px" padding="0 10px 0 0" />
          <el-switch v-model="showOnlyNotFilled" placeholder="Отобразить только незаполненные" />
        </div>
        <Button button-class="save-button" text="Сохранить" @click="$emit('save', researchResult)" />
      </div>
      <!-- <div class="flex-line3">
        <StringItem string="Отобразить&nbsp;только&nbsp;незаполненные" font-size="14px" padding="0 10px 0 0" />
        <el-switch v-model="showOnlyNotFilled" placeholder="Отобразить только незаполненные" />
      </div> -->
      <!-- <Button
        text="Сохранить"
        :color-swap="false"
        width="100%"
        height="60px"
        font-size="16px"
        border-radius="5px"
        color="#00B5A4"
        background="#C7ECEA"
        background-hover="#C7ECEA"
        :with-icon="false"
        @click="$emit('save', researchResult)"
      ></Button> -->
    </div>
    <div class="scroll-block">
      <CollapseContainer>
        <CollapseItem
          v-for="question in filteredQuestions"
          :key="question.id"
          :tab-id="question.id"
          :active-id="question.id"
          :title="`${question.order + 1}. ${question.name}`"
          :is-collaps="true"
          :change-color="researchResult.getOrCreateAnswer(question).filled"
          background="#DFF2F8"
          background-attention="#EECEAF"
          margin-top="20px"
        >
          <template #inside-content>
            <div :id="question.getIdWithoutDashes()" class="background-container">
              <QuestionComponent :question="question" :research-result="researchResult" @fill="scroll(question.getIdWithoutDashes())" />
            </div>
          </template>
        </CollapseItem>
      </CollapseContainer>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref, ref } from 'vue';

import Formula from '@/classes/Formula';
import FormulaResult from '@/classes/FormulaResult';
import Patient from '@/classes/Patient';
import Question from '@/classes/Question';
import Research from '@/classes/Research';
import ResearchResult from '@/classes/ResearchResult';
import QuestionComponent from '@/components/admin/Patients/QuestionComponent.vue';
import Button from '@/components/Base/Button.vue';
import CollapseContainer from '@/components/Base/Collapse/CollapseContainer.vue';
import CollapseItem from '@/components/Base/Collapse/CollapseItem.vue';
import StringItem from '@/services/components/StringItem.vue';
import Provider from '@/services/Provider/Provider';
import scroll from '@/services/Scroll';

export default defineComponent({
  name: 'PatientResearchesQuestion',
  components: {
    CollapseItem,
    CollapseContainer,
    QuestionComponent,
    Button,
    StringItem,
  },
  emits: ['save', 'cancel'],
  setup() {
    const questionsFilterString: Ref<string> = ref('');
    const showOnlyNotFilled: Ref<boolean> = ref(false);
    const patient: Ref<Patient> = computed(() => Provider.store.getters['patients/item']);
    const research: Ref<Research> = computed(() => Provider.store.getters['researches/item']);
    const researchResult: Ref<ResearchResult> = computed(() => Provider.store.getters['researchesResults/item']);

    const filteredQuestions: ComputedRef<Question[]> = computed(() => {
      return research.value.getFilteredQuestions(questionsFilterString.value, showOnlyNotFilled.value, researchResult.value);
    });

    const birthDateToMonth = (birthDate: string): number => {
      return (new Date().getFullYear() - new Date(birthDate).getFullYear()) * 12;
    };

    const getCalculationsResults = (research: Research): FormulaResult[] => {
      const results: FormulaResult[] = [];

      let item: { [key: string]: number } = {};
      const monthsToResearch = researchResult.value.date.getMilliseconds() - patient.value.human.dateBirth.getMilliseconds();
      const months = birthDateToMonth(monthsToResearch.toString());

      research.questions.forEach((q: Question) => {
        if (q.code) {
          item[q.code] = researchResult.value.getAnswerByQuestionId(q.id as string)?.valueNumber as number;
        }
      });
      research.formulas.forEach((f: Formula) => {
        const res = f.getResult(item, patient.value.human.isMale, months);
        res.formulaName = f.name;
        results.push(res);
      });
      return results;
    };

    return {
      getCalculationsResults,
      questionsFilterString,
      filteredQuestions,
      showOnlyNotFilled,
      researchResult,
      patient,
      research,
      scroll,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';
@import '@/assets/styles/elements/base-style.scss';

.plus-button {
  width: calc(100% - 20px);
  border-radius: 5px;
  color: #00bea5;
  background: #c1efeb;
  height: 38px;
  margin: 0 10px;
}

.save-button {
  width: 120px;
  border-radius: 5px;
  height: 42px;
  color: #006bb4;
  background: #dff2f8;
  margin: 0 10px 0 0;
  font-size: 14px;
}

.xlsx-button {
  width: auto;
  height: 34px;
  border-radius: 5px;
  color: #006bb4;
  background: #dff2f8;
  font-size: 12px;
}

.back-button {
  background: #ffffff;
  margin: 0 10px 0 0;
  height: 42px;
  font-size: 16px;
  border-radius: 5px;
  color: #343e5c;
}

.chart-button {
  width: 63px;
  height: 42px;
  border-radius: 5px;
  color: #343e5c;
  background: #ffffff;
  font-size: 16px;
}

.hidden {
  display: none;
}

.el-form-item {
  margin: 0;
}

.el-divider {
  margin: 10px 0;
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
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  padding: 6px;
}

.slider-body > div {
  object-fit: cover;
}

.slider-item {
  width: 163px;
  height: 40px;
  border: 1px solid #b0a4c0;
  border-radius: $normal-border-radius;
  background: $base-background;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 3px;
  font-size: 14px;
  color: #b0a4c0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.slider-item:hover {
  border: 1px solid #379fff;
  background: $base-background;
  color: #379fff;
}

.slider-item-active {
  width: 163px;
  height: 40px;
  border: 1px solid #379fff;
  border-radius: $normal-border-radius;
  background: $custom-background;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 3px;
  font-size: 14px;
  color: #343e5c;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.slider-item:active {
  border: 1px solid #379fff;
  background: $custom-background;
  color: #343e5c;
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
  transition: 0.3s;
}

.tabs-item:hover {
  width: 105px;
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
}

.tabs-item-active:hover {
  width: 106px;
}

.icon-plus {
  width: 40px;
  height: 40px;
  cursor: pointer;
}

.body {
  width: 100%;
  height: 100%;
  border-right: 1px solid #379fff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
  z-index: 5;
}

.researche-title {
  width: calc(100% - 22px);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  margin: 0 10px;
}

.researche-name {
  min-height: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #343e5c;
  font-size: 14px;
  text-transform: uppercase;
}

.plus-button {
  width: calc(100% - 20px);
  border-radius: 5px;
  color: #00bea5;
  background: #c1efeb;
  height: 60px;
  margin: 0 10px;
}

:deep(.icon-plus) {
  width: 40px;
  height: 40px;
  cursor: pointer;
}

.patient-research {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: calc(100% - 32px);
  height: 40px;
  border-radius: $normal-border-radius;
  border: $light-pink-border;
  background: #ffffff;
  padding: 0 10px;
  margin: 10px 10px 10px 0;
  cursor: pointer;
}

.blur {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000000;
  opacity: 0.3;
  z-index: 20;
}

.research-info {
  width: calc(100% - 32px);
  height: calc(100% - 22px);
  background: #dff2f8;
  margin: 0px 0px 10px 0;
  padding: 0px 10px 10px 10px;
  overflow: hidden;
  overflow-y: auto;
}

.tools {
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
  height: auto;
  padding: 0;
  width: calc(100% - 2px);
  background: #dff2f8;
}

.scroll-block {
  width: 100%;
  height: calc(100% - 60px);
  overflow: hidden;
  overflow-y: auto;
}

.question-item {
  background: #dff2f8;
  border: $light-pink-border;
  border-radius: $normal-border-radius;
  padding: 10px;
  margin-bottom: 10px;
  background: #ffffff;
}

.question-name {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 22px;
  color: #343e5c;
  margin-bottom: 10px;
}

.background-container {
  width: auto;
  padding: 10px;
  margin: 0 10px 10px 10px;
  background: #dff2f8;
  background: #ffffff;
  border-radius: 5px;
  border: 1px solid #c3c3c3;
}

.patient-name {
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 24px;
  height: 40px;
  color: #343e5c;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.researche-title-name {
  font-size: 20px;
  display: block;
  color: #343e5c;
  padding: 10px 0;
}

.researche-counter {
  font-size: 20px;
  color: #379fff;
  display: flex;
  justify-content: right;
  align-items: flex-start;
  text-transform: uppercase;
  white-space: nowrap;
  height: 100%;
}

.control-buttons {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
}

.left {
  width: 300px;
  display: flex;
  justify-content: left;
  align-items: center;
}

.right {
  max-width: 280px;
  display: flex;
  justify-content: right;
  align-items: center;
}

.search {
  display: flex;
  justify-content: left;
  align-items: center;
}

.icon-xlsx {
  width: 40px;
  height: 40px;
  fill: #343e5c;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 10px;
}

.icon-xlsx:hover {
  fill: #379fff;
}

.line-item {
  display: flex;
  justify-content: right;
  align-items: center;
  width: calc(100% - 20px);
  margin: 10px 0;
  max-width: 100%;
  height: 54px;
}

.flex-line {
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 190px;
}

.flex-line2 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.flex-line3 {
  display: flex;
  justify-content: left;
  align-items: center;
  width: 190px;
  height: 40px;
}

.flex-line4 {
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
  height: auto;
  padding: 10px 0;
  color: #00b5a4;
  font-size: 18px;
}

.res-name {
  margin-right: 10px;
}

:deep(.el-timeline) {
  padding: 0 0 0 10px;
}

:deep(.el-timeline-item) {
  padding-bottom: 8px;
}

:deep(.el-timeline-item__node) {
  background: #b0a4c0;
}

:deep(.el-timeline-item__wrapper) {
  padding-left: 20px;
}

@media screen and (max-width: 630px) {
  .control-buttons {
    display: block;
  }
  .research-info {
    width: calc(100% - 22px);
    height: calc(100% - 22px);
    background: #dff2f8;
    margin: 0px 0px 10px 0;
    padding: 0px 10px 10px 10px;
    overflow: hidden;
    overflow-y: auto;
  }
}
</style>
