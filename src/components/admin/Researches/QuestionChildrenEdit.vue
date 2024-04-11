<template>
  <!-- <hr /> -->
  <!-- <draggable :list="question.children" item-key="id" @end="updateOrder"> -->
    <!-- <template #item="{ element, index }"> -->
    <div v-for="(element, i) in question.children" :key="element.id" class="container">
    <!-- <div class="container"> -->
      <button class="admin-del" @click="removeQuestion(element.id)" >
        Удалить под-вопрос
      </button>
      <div class="list-number">{{ i + 1 }}</div>
      <QuestionEdit :question="element" />
      <!-- <el-input v-model="variant.name" @blur="updateVariant(variant)" /> -->
    </div>
      <!-- <div>
        <QuestionEdit :question="element" />

        <hr />
        <Button text="удалить под-вопрос" @click="removeQuestion(element.id)" />
        <hr />
        <hr />
      </div> -->
    <!-- </template> -->
  <!-- </draggable> -->

  <div class="tools-buttons"><button class="admin-add" @click="addChild" >+ Добавить под-вопрос</button></div>

  <!-- <Button text="Добавить под-вопрос" @click="addChild" /> -->
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
  await Store.Remove('questions', id);
  console.log(id);
  ClassHelper.RemoveFromClassById(id, props.question.children);
  console.log(id);
  sort(props.question.children);
  props.question.children.forEach((q: Question) => {
    Store.Update('questions', q);
  });
};
</script>

<style lang="scss" scoped>
.admin-add {
  border: none;
  background: inherit;
  color: #1979cf;
  margin: 10px;
  padding: 0 10px;
  transition: 0.3s;
  cursor: pointer;
}

.admin-add:hover {
  color: darken($color: #1979cf, $amount: 10%);
  background: inherit;
}

// .admin-add2 {
//   border: none;
//   background: inherit;
//   color: #00b5a4;
//   transition: 0.3s;
//   cursor: pointer;
// }

// .admin-add2:hover {
//   color: darken($color: #00b5a4, $amount: 10%);
// }

.admin-del {
  position: absolute;
  top: 10px;
  right: 36px;
  border: none;
  background: inherit;
  color: #a3a9be;
  transition: 0.3s;
  cursor: pointer;
}

.admin-del:hover {
  color: darken($color: #cf3d19, $amount: 5%);
}

// .admin-del2 {
//   border: none;
//   background: inherit;
//   color: #a3a9be;
//   transition: 0.3s;
//   cursor: pointer;
// }

// .admin-del2:hover {
//   color: darken($color: #cf3d19, $amount: 5%);
// }

.tools-buttons {
  display: flex;
  justify-content: right;
  align-items: center;
}

.container {
  position: relative;
  width: calc(100% - 62px);
  margin: 0px 20px 20px 20px;
  border: 1px solid #c3c3c3;
  border-radius: 5px;
  padding: 40px 10px 10px 10px;
  background: #dff2f8;
}


.list-number {
  position: absolute;
  top: 7px;
  right: 10px;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  background: #1979cf;
  border-radius: 20px;
}


@media screen and (max-width: 400px) {
  .container {
    width: calc(100% - 42px);
    margin: 0px 10px 20px 10px;
  }
}
</style>
