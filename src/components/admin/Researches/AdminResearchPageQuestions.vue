<template>
  <div class="research-info">
    <div class="scroll-block">
      <div class="st">
        <StringItem
          :string="'Вопросов: ' + research.questions.length"
          font-size="14px"
          padding="0"
          justify-content="left"
          margin="0"
          width="auto"
        />
        <button class="admin-add2" @click="addQuestion()">+ Добавить вопрос</button>
      </div>
      <CollapseContainer>
        <draggable :list="research.questions" item-key="id" @end="updateOrder">
          <template #item="{ element }">
            <div>
              <CollapseItem
                :tab-id="element.id"
                :active-id="element.id"
                :is-collaps="true"
                background="#F1F2F7"
                background-attention="#F1F2F7"
              >
                <template #inside-title>
                  <div class="number">
                    {{ element.order + 1 }}
                    <svg class="icon-move">
                      <use xlink:href="#move" />
                    </svg>
                  </div>
                  <div class="q-text" @click.stop>
                    <el-input v-model="element.name" placeholder="Введите текст вопроса" @focus.prevent @blur="setName(element)" />
                  </div>
                  <Button button-class="del-button" icon="del" icon-class="edit-icon" @click="removeQuestion(element.id)" />
                </template>
                <template #inside-content>
                  <div :id="element.getIdWithoutDashes()" class="background-container">
                    <QuestionEdit :question="element" />
                  </div>
                  <div>
                    <QuestionChildrenEdit :question="element" />
                  </div>
                </template>
              </CollapseItem>
            </div>
          </template>
        </draggable>
      </CollapseContainer>
    </div>
  </div>
  <Move />
</template>

<script lang="ts" setup>
import draggable from 'vuedraggable';

import Research from '@/classes/Research';
import Move from '@/services/assets/svg/Move.svg';
import ClassHelper from '@/services/ClassHelper';
import Provider from '@/services/Provider/Provider';
import sort from '@/services/sort';

const research: Ref<Research> = Store.Item('researches');

const setName = (question: Question) => {
  Provider.withHeadLoader(async () => {
    await Store.Update('questions', question);
  });
};
const addQuestion = async () => {
  const item = research.value.addQuestion();
  await Store.Create('questions', item);
};

const removeQuestion = async (id: string) => {
  ClassHelper.RemoveFromClassById(id, research.value.questions);
  await Store.Remove('questions', id);
  research.value.setQuestionsOrder();
  sort(research.value.questions);
  research.value.questions.forEach((q: Question) => {
    Store.Update('questions', q);
  });
};
const updateOrder = async (): Promise<void> => {
  sort(research.value.questions);
  research.value.questions.forEach((q: Question) => {
    Store.Update('questions', q);
  });
};
</script>

<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';
@import '@/assets/styles/elements/base-style.scss';

.number:hover > .icon-move {
  visibility: visible;
}

@keyframes ripple {
  0% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.15, 1.15);
  }
}

.icon-move {
  position: absolute;
  left: 8px;
  top: 8px;
  visibility: hidden;
  width: 24px;
  height: 24px;
  fill: #dff2f8;
  stroke: #747474;
  animation-name: ripple;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}

.st {
  position: sticky;
  top: 0px;
  z-index: 10;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  background: #dff2f8;
  border-bottom: 1px solid #c3c3c3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
  padding: 0 10px;
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

.q-text {
  width: 100%;
}

.icon-edit {
  width: 24px;
  height: 24px;
  fill: #006bb4;
  cursor: pointer;
  transition: 0.3s;
}

.icon-session-edit:hover {
  fill: #379fff;
  transform: scale(1.2);
}

.del-button {
  width: 42px;
  height: 42px;
  border-radius: 5px;
  background: #ffffff;
  color: #343e5c;
  border: none;
  margin: 0 5px 0 10px;
  fill: #c4c4c4;
}

.del-button:hover {
  fill: red;
}

.edit-button {
  width: 42px;
  height: 42px;
  border-radius: 5px;
  background: #ffffff;
  color: #343e5c;
  border: none;
  margin: 0 0 0 10px;
  fill: #c4c4c4;
}

.edit-button:hover {
  fill: #1e77cd;
}

:deep(.edit-icon) {
  width: 28px;
  height: 28px;
}

.number {
  position: relative;
  margin: 0 10px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 40px;
  max-width: 40px;
  min-height: 40px;
  max-height: 40px;
  border-radius: 5px;
  background: #ffffff;
  font-size: 14px;
}

.research-info {
  position: relative;
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  background: #dff2f8;
  margin: 0;
  padding: 0px;
}
.scroll-block {
  position: relative;
  width: 100%;
  height: calc(100% - 60px);
  overflow: hidden;
  overflow-y: auto;
}

.background-container {
  width: auto;
  padding: 0;
  margin: 0 10px 10px 10px;
  // background: #dff2f8;
  // background: #ffffff;
  // border-radius: 5px;
  // border: 1px solid #c3c3c3;
}

@media screen and (max-width: 630px) {
  .research-info {
    margin: 0 0 10px 0;
  }
}
</style>
