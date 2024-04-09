<template>
  <draggable :list="question.answerVariants" item-key="id" @end="updateOrder">
    <template #item="{ element }">
      <div>
        <el-input v-model="element.name" @blur="updateAnswerVariant(element)" />
        <Button text="удалить вариант" @click="removeAnswerVariant(element.id)" />
      </div>
    </template>
  </draggable>
  <Button text="Добавить вариант" @click="addAnswerVariant()" />
</template>

<script setup lang="ts">
import draggable from 'vuedraggable';

import AnswerVariant from '@/classes/AnswerVariant';
import Question from '@/classes/Question';
import ClassHelper from '@/services/ClassHelper';
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

const updateOrder = async (): Promise<void> => {
  sort(props.question.answerVariants);
  props.question.answerVariants.forEach((q: AnswerVariant) => {
    Store.Update('answerVariants', q);
  });
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
