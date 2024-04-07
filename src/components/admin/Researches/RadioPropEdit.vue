<template>
  <div v-for="variant in question.answerVariants" :key="variant.id">
    <el-input v-model="variant.name" @blur="updateAnswerVariant(variant)" />
    <Button text="x" @click="removeAnswerVariant(variant.id)" />
  </div>

  <Button text="Добавить" @click="addAnswerVariant()" />
  <div v-if="selectedVariant && selectedVariant.showMoreQuestions" class="line">
    <div v-for="additionalQuestion in question.children" :key="additionalQuestion.id" :label="additionalQuestion.name">
      <component
        :is="additionalQuestion.valueType.getComponentType()"
        :research-result="researchResult"
        :question="additionalQuestion"
        @fill="$emit('fill')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import AnswerVariant from '@/classes/AnswerVariant';
import Question from '@/classes/Question';
import ClassHelper from '@/services/ClassHelper';
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
  await Store.Remove('answerVariants', id);
};
const updateAnswerVariant = async (item?: AnswerVariant) => {
  await Store.Update('answerVariants', item);
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
