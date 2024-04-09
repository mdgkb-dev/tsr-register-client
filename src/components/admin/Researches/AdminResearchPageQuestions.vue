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
                  {{ element.order + 1 }}
                  <el-input v-model="element.name" @blur="setName" />
                  <Button text="удалить" @click="removeQuestion(element.id)" />
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
</template>

<script lang="ts" setup>
import draggable from 'vuedraggable';

import Research from '@/classes/Research';
import ClassHelper from '@/services/ClassHelper';
import Provider from '@/services/Provider/Provider';
import sort from '@/services/sort';

const research: Ref<Research> = Store.Item('researches');
// const filteredQuestions: ComputedRef<Question[]> = computed(() => {
//   return research.value.getFilteredQuestions(researchResult.value);
// });

const selectMode = ref(false);

const update = async () => {
  Provider.withHeadLoader(async () => {
    await Store.Update('researches');
  });
};

const setName = () => {
  // props.question.setName(name.value);
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
