<template>
  <hr />
  <draggable :list="question.children" item-key="id" @end="updateOrder">
    <template #item="{ element, index }">
      <div>
        <QuestionEdit :question="element" />

        <hr />
        <Button text="удалить под-вопрос" @click="removeQuestion(element.id)" />
        <hr />
        <hr />
      </div>
    </template>
  </draggable>
  <Button text="Добавить под-вопрос" @click="addChild" />
</template>

<script setup lang="ts">
import draggable from 'vuedraggable';

import Question from '@/classes/Question';
import ValueType from '@/services/classes/ValueType';

const props = defineProps({
  question: {
    type: Object as PropType<Question>,
    required: true,
  },
});

const valueType: Ref<ValueType> = Store.Item('valueTypes');

const selectType = async (itemName: string, question: Question) => {
  await Store.Get('valueTypes', itemName);
  question.setType(valueType.value);
  await Store.Update('questions', props.question);
};

const addChild = async () => {
  console.log('question');
  const item = props.question.addChild();
  await Store.Create('questions', item);
};
const removeQuestion = async (id: string) => {
  ClassHelper.RemoveFromClassById(id, props.question.children);
  await Store.Remove('questions', id);
  sort(props.question.children);
  props.question.children.forEach((q: Question) => {
    Store.Update('questions', q);
  });
};
</script>

<style lang="scss" scoped></style>
