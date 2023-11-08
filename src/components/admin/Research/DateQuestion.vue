<template>
  <el-date-picker
    ref="datePick"
    v-model="answer.valueDate"
    type="date"
    format="DD.MM.YYYY"
    placeholder="Выберите дату"
    @keydown="dateFormat"
    @change="filledCheck"
    @visible-change="false"
  />
  <span v-if="question.ageCompare" style="margin-left: 10px">
    {{ patient.human.getAge(answer.valueDate) }}
  </span>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, PropType } from 'vue';

import Answer from '@/classes/Answer';
import Patient from '@/classes/Patient';
import Question from '@/classes/Question';
import ResearchResult from '@/classes/ResearchResult';
import dateFormat from '@/services/DateMask';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'DateQuestion',
  props: {
    researchResult: {
      type: Object as PropType<ResearchResult>,
      required: true,
    },
    question: {
      type: Object as PropType<Question>,
      required: true,
    },
  },
  emits: ['fill'],
  setup(props, { emit }) {
    const patient: ComputedRef<Patient> = computed(() => Provider.store.getters['patients/item']);
    const answer: ComputedRef<Answer> = computed(() => props.researchResult.getOrCreateAnswer(props.question));

    const filledCheck = (): void => {
      answer.value.filled = answer.value.valueNumber === 0 || !!answer.value.valueNumber;
      props.researchResult.calculateFilling();
      emit('fill');
    };

    return {
      filledCheck,
      dateFormat,
      answer,
      patient,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';
</style>
