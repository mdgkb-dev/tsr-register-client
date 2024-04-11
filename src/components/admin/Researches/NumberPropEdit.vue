<template></template>

<script setup lang="ts">
import { computed, defineComponent, PropType, Ref } from 'vue';

// import Answer from '@/classes/Answer';
// import Question from '@/classes/Question';
// import ResearchResult from '@/classes/ResearchResult';
// import InputNumber from '@/services/components/InputNumber.vue';
// props: {
//   researchResult: {
//     type: Object as PropType<ResearchResult>,
//     required: true,
//   },
//   question: {
//     type: Object as PropType<Question>,
//     required: true,
//   },
//   variantId: {
//     type: String as PropType<string>,
//     default: '',
//   },
// },
// emits: ['fill'],
// setup(props, { emit }) {
//   const answer: Ref<Answer | undefined> = computed(() => {
//     if (props.variantId !== '') {
//       return props.researchResult.getQuestionVariantAnswer(props.variantId);
//     }
//     return props.researchResult.getOrCreateAnswer(props.question);
//   });
//   const filledCheck = (): void => {
//     if (!answer.value) {
//       return;
//     }
//     answer.value.filled = answer.value.valueNumber === 0 || !!answer.value.valueNumber;
//     props.researchResult.calculateFilling();
//     emit('fill');
//   };
//
//   return {
//     filledCheck,
//     answer,
//   };
// },
// });
</script>

<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';

.register-property-block {
  background-color: #eef1f6;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;

  h3 {
    margin-top: 0;
  }
}

.el-form-item {
  margin: 0;
}

.el-divider {
  margin: 10px 0;
}

:deep(.el-input-number__increase) {
  border-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

:deep(.el-input-number__decrease) {
  border-radius: 0;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
</style>
