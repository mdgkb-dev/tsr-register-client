<template>
  <div class="q-ch">
    <div class="tools-buttons">
      <StringItem string="Под-вопросы:" font-size="14px" padding="0" justify-content="left" margin="0" width="auto"/> 
      <button class="admin-add2" @click="addChild" >+ Добавить под-вопрос</button>
    </div>
    
  <!-- <hr /> -->
  <!-- <draggable :list="question.children" item-key="id" @end="updateOrder"> -->
    <!-- <template #item="{ element, index }"> -->
    <div v-for="(element, i) in question.children" :key="element.id" class="container">
      <div class="ch-title" >
        <StringItem :string="'Под-вопрос ' + (i + 1)" font-size="14px" padding="0" justify-content="left" margin="0 0 5px 5px"/> 
      </div>
      <el-input v-model="element.name" @blur="" placeholder="Введите текст вопроса" />

      <button class="admin-del" @click="removeQuestion(element.id)" >
        Удалить
      </button>
      
      <QuestionEdit :question="element" />
      <!-- <el-input v-model="variant.name" @blur="updateVariant(variant)" /> -->
    </div>
    <!-- </template> -->
  <!-- </draggable> -->
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
  color: #343D5B;
  transition: 0.3s;
  cursor: pointer;
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
}


.list-number {
  // position: absolute;
  // top: 7px;
  // right: 10px;
  // min-width: 24px;
  // min-height: 24px;
  // max-width: 24px;
  // max-height: 24px;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  // color: #ffffff;
  // background: #1979cf;
  // border-radius: 20px;

  margin: 0 10px;
}


@media screen and (max-width: 400px) {
  .container {
    width: calc(100% - 42px);
    margin: 0px 10px 20px 10px;
  }
}
</style>
