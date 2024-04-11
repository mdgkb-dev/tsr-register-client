<template>
  <draggable :list="question.answerVariants" item-key="id" @end="updateOrder">
    <template #item="{ element }">
      <div class="container">
        <button class="admin-del" @click="removeAnswerVariant(element.id)" >
          Удалить под-вопрос
        </button>
        <el-input v-model="element.name" @blur="updateAnswerVariant(element)" />
        <!-- <Button text="удалить вариант" @click="removeAnswerVariant(element.id)" /> -->
      </div>
    </template>
  </draggable>
  <div class="tools-buttons"><button class="admin-add" @click="addAnswerVariant()" >+ Добавить под-вопрос</button></div>
  <!-- <Button text="Добавить вариант" @click="addAnswerVariant()" /> -->

  <!-- <div v-for="(element, i) in question.children" :key="element.id" class="container"> -->
    <!-- <div class="container"> -->
      <!-- <button class="admin-del" @click="removeAnswerVariant(element.id)" >
        Удалить под-вопрос
      </button> -->
      <!-- <div class="list-number">{{ i + 1 }}</div> -->
      <!-- <el-input v-model="element.name" @blur="updateAnswerVariant(element)" /> -->
      <!-- <el-input v-model="variant.name" @blur="updateVariant(variant)" /> -->
    <!-- </div> -->
      <!-- <div>
        <QuestionEdit :question="element" />

        <hr />
        <Button text="удалить под-вопрос" @click="removeQuestion(element.id)" />
        <hr />
        <hr />
      </div> -->
    <!-- </template> -->
  <!-- </draggable> -->

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

admin-add {
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
