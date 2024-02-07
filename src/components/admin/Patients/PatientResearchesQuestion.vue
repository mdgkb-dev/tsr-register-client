<template>
  <div class="research-info">
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
              <QuestionComponent :question="question" :research-result="researchResult" />
            </div>
          </template>
        </CollapseItem>
      </CollapseContainer>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref } from 'vue';

import Formula from '@/classes/Formula';
import FormulaResult from '@/classes/FormulaResult';
import Patient from '@/classes/Patient';
import Question from '@/classes/Question';
import Research from '@/classes/Research';
import ResearchResult from '@/classes/ResearchResult';
import QuestionComponent from '@/components/admin/Patients/QuestionComponent.vue';
import CollapseContainer from '@/services/components/Collapse/CollapseContainer.vue';
import CollapseItem from '@/services/components/Collapse/CollapseItem.vue';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'PatientResearchesQuestion',
  components: {
    CollapseItem,
    CollapseContainer,
    QuestionComponent,
  },
  emits: ['fill'],
  setup() {
    const patient: Ref<Patient> = computed(() => Provider.store.getters['patients/item']);
    const research: Ref<Research> = computed(() => Provider.store.getters['researches/item']);
    const researchResult: Ref<ResearchResult> = computed(() => Provider.store.getters['researchesResults/item']);

    const filteredQuestions: ComputedRef<Question[]> = computed(() => {
      return research.value.getFilteredQuestions(researchResult.value);
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
      filteredQuestions,
      researchResult,
      patient,
      research,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';
@import '@/assets/styles/elements/base-style.scss';

.research-info {
  width: calc(100% - 22px);
  height: calc(100% - 22px);
  background: #dff2f8;
  margin: 0;
  padding: 0px 10px 10px 10px;
}

.scroll-block {
  width: 100%;
  height: calc(100% - 60px);
  overflow: hidden;
  overflow-y: auto;
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

@media screen and (max-width: 630px) {
  .research-info {
    margin: 0 0 10px 0;
  }
}
</style>
