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
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import Question from '@/classes/Question';
import ResearchResult from '@/classes/ResearchResult';
import dateFormat from '@/services/DateMask';

export default defineComponent({
  name: 'DataComponentComputed',
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
    const answer = props.researchResult.getOrCreateAnswer(props.question);

    const filledCheck = (): void => {
      answer.filled = answer.valueNumber === 0 || !!answer.valueNumber;
      props.researchResult.calculateFilling();
      emit('fill');
    };

    return {
      filledCheck,
      dateFormat,
      answer,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';
</style>
