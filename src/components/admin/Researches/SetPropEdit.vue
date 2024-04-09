<template>
  <AnswerVariantsEdit :question="question" />
</template>

<script setup lang="ts">
import Question from '@/classes/Question';
const props = defineProps({
  question: {
    type: Object as PropType<Question>,
    required: true,
  },
});
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
