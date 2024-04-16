<template>
  <div class="q-ch">
    <div class="tools-buttons">
      <StringItem string="Под-вопросы:" font-size="14px" padding="0" justify-content="left" margin="0" width="auto" />
      <button class="admin-add2" @click="addChild">+ Добавить под-вопрос</button>
    </div>

    <draggable :list="question.children" item-key="id" @end="updateOrder">
      <template #item="{ element, index }">
        <div class="container">
          <div class="q-marker"></div>
          <div class="ch-title">
            <StringItem :string="'Под-вопрос ' + (index + 1)" font-size="14px" padding="0" justify-content="left" margin="0 0 5px 5px" />
          </div>
          <el-input v-model="element.name" placeholder="Введите текст вопроса" @blur="" />

          <button class="admin-del" @click="removeQuestion(element.id)">Удалить</button>

          <QuestionEdit :question="element" />
          <!-- <el-input v-model="variant.name" @blur="updateVariant(variant)" /> -->
        </div>
      </template>
    </draggable>
  </div>
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
  ClassHelper.RemoveFromClassById(id, props.question.children);
  sort(props.question.children);
  props.question.children.forEach((q: Question) => {
    Store.Update('questions', q);
  });
};
const updateOrder = async (): Promise<void> => {
  sort(props.question.children);
  props.question.children.forEach((q: Question) => {
    Store.Update('questions', q);
  });
};
</script>

<style lang="scss" scoped>

.q-marker {
  position:absolute;
  left: -32px;
  top: 13px;
  width: 14px;
  height: 14px;
  border-radius: 20px;
  background: #00b5a4;
}

.q-ch {
  width: calc(100% - 50px);
  box-sizing: border-box;
  background: #ffffff;
  overflow: hidden;
  border-radius: 5px;
  border: 1px solid #c3c3c3;
  padding: 10px;
  margin: 30px 0 10px 40px;
}

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

.admin-add2 {
  border: none;
  background: inherit;
  color: #00b5a4;
  transition: 0.3s;
  cursor: pointer;
}

.admin-add2:hover {
  color: darken($color: #00b5a4, $amount: 10%);
}

.admin-del {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: inherit;
  color: #a3a9be;
  transition: 0.3s;
  cursor: pointer;
}

.admin-del:hover {
  color: darken($color: #cf3d19, $amount: 5%);
}

.ch-title {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  justify-content: left;
  align-items: center;
  border: none;
  background: inherit;
  color: #343d5b;
  transition: 0.3s;
  cursor: pointer;
}

.tools-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.container {
  position: relative;
  width: calc(100% - 72px);
  margin: 10px 10px 20px 40px;
  border: 1px solid #c3c3c3;
  border-radius: 5px;
  padding: 40px 10px 10px 10px;
  background: #dff2f8;
  background: #ffffff;
  background: #C7ECEA;
}

.list-number {
  margin: 0 10px;
}

@media screen and (max-width: 400px) {
  .container {
    width: calc(100% - 42px);
    margin: 0px 10px 20px 10px;
  }
}
</style>
