<template>
  <div v-for="variant in question.answerVariants" :key="variant.id">
    <p>{{ variant.name }}</p>
    <Button text="x" @click="removeAnswerVariant(variant.id)" />
  </div>

  <Button text="Добавить" @click="addAnswerVariant()" />
  <!-- </el-radio> -->
  <!-- <el-form v-if="selectedVariant && selectedVariant.showMoreQuestions" class="line"> -->
  <!--   <el-form-item v-for="additionalQuestion in question.children" :key="additionalQuestion.id" :label="additionalQuestion.name"> -->
  <!--     <component -->
  <!--       :is="additionalQuestion.valueType.getComponentType()" -->
  <!--       :research-result="researchResult" -->
  <!--       :question="additionalQuestion" -->
  <!--       @fill="$emit('fill')" -->
  <!--     /> -->
  <!--   </el-form-item> -->
  <!-- </el-form> -->
</template>

<script setup lang="ts">
import Question from '@/classes/Question';
// import ResearchResult from '@/classes/ResearchResult';
// import InputNumber from '@/services/components/InputNumber.vue';
const props = defineProps({
  question: {
    type: Object as PropType<Question>,
    required: true,
  },
});
const addAnswerVariant = async () => {
  const item = props.question.addAnswerVariant();
  await Store.Create('answerVariants', item);
};
const removeAnswerVariant = async (id?: string) => {
  ClassHelper.RemoveFromClassById(id, props.question.answerVariants);
  const item = props.question.removeAnswerVariant();
  await Store.Remove('answerVariants', item);
};
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
