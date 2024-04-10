<template>
  <div class="research-info">
    <div class="scroll-block">
      <CollapseContainer>
        <draggable :list="research.questions" item-key="id" @end="updateOrder">
          <template #item="{ element }">
            <div>
              <CollapseItem
                :tab-id="element.id"
                :active-id="element.id"
                :is-collaps="true"
                background="#DFF2F8"
                background-attention="#EECEAF"
                margin-top="20px"
              >
                <template #inside-title>
                  <div class="number" >{{ element.order + 1 }}</div>
                  <el-input v-model="element.name" @blur="setName(element)" />
                  <Button button-class="edit-button" icon="settings" icon-class="edit-icon" @click="edit" />
                  <Button button-class="del-button" icon="del" icon-class="edit-icon" @click="removeQuestion(element.id)" />
                </template>
                <template #inside-content>
                  <div :id="element.getIdWithoutDashes()" class="background-container">
                    <QuestionEdit :question="element" />
                  </div>

                  <div>
                    под-вопросы:
                    <QuestionChildrenEdit :question="element" />
                  </div>
                </template>
              </CollapseItem>
            </div>
          </template>
        </draggable>
      </CollapseContainer>
      <Button text="Добавить вопрос" @click="addQuestion()" />
    </div>
  </div>
  <ModalWindow
      v-if="showEditSessionModal"
      :show="showEditSessionModal"
      title="Свойства исследования"
      @close="showEditSessionModal = false"
    >
      <!-- <SessionConstructor :start-time="selectedSession" :session="selectedSession" @close="showEditSessionModal = false" /> -->
      <!-- <Button button-class="del-button" text="Удалить" @click="removeSession" /> -->
    </ModalWindow>
</template>

<script lang="ts" setup>
import draggable from 'vuedraggable';

import Research from '@/classes/Research';
import ClassHelper from '@/services/ClassHelper';
import Provider from '@/services/Provider/Provider';
import sort from '@/services/sort';


const research: Ref<Research> = Store.Item('researches');
const showEditSessionModal = ref(false);

// const emits = defineEmits(['edit']);

// const edit = async () => {
//   emits('edit');
// };

const edit = () => {
  // selectedSession.value = session;
  showEditSessionModal.value = true;
};

const setName = (question: Question) => {
  Provider.withHeadLoader(async () => {
    await Store.Update('questions', question);
  });
};
const addQuestion = async () => {
  const item = research.value.addQuestion();
  await Store.Create('questions', item);
};

const addChild = async (question: Question) => {
  const item = question.addChild();
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
  fill: #1E77CD;
}

:deep(.edit-icon) {
  width: 28px;
  height: 28px;
}

.number {
  margin: 0 10px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 32px;
  max-width: 32px;
  min-height: 32px;
  max-height: 32px;
  border-radius: 20px;
  background: #1E77CD;
  color:#ffffff;
  font-size: 14px;
}

.research-info {
  width: calc(100% - 22px);
  height: calc(100% - 22px);
  background: #dff2f8;
  margin: 0;
  padding: 0px 10px 10px 10px;
}
.scroll-block {
  width: 100%;
  height: calc(100% - 60px);
  overflow: hidden;
  overflow-y: auto;
}

.background-container {
  width: auto;
  padding: 10px;
  margin: 0 10px 10px 10px;
  background: #dff2f8;
  background: #ffffff;
  border-radius: 5px;
  border: 1px solid #c3c3c3;
}

@media screen and (max-width: 630px) {
  .research-info {
    margin: 0 0 10px 0;
  }
}
</style>
