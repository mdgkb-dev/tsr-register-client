<template>
  <div class="research-info">
    <div class="scroll-block">
      <CollapseContainer>
        <CollapseItem
          v-for="question in research.questions"
          :key="question.id"
          :tab-id="question.id"
          :active-id="question.id"
          :is-collaps="true"
          background="#DFF2F8"
          background-attention="#EECEAF"
          margin-top="20px"
        >
          <template #tools> 1 </template>
          <template #inside-title>
            {{ question.order + 1 }}
            <el-input v-model="question.name" @blur="setName" />
          </template>
          <template #inside-content>
            <div :id="question.getIdWithoutDashes()" class="background-container">
              <QuestionEdit :question="question" />
            </div>
          </template>
        </CollapseItem>
      </CollapseContainer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Research from '@/classes/Research';
import Provider from '@/services/Provider/Provider';

const research: Ref<Research> = computed(() => Provider.store.getters['researches/item']);
// const filteredQuestions: ComputedRef<Question[]> = computed(() => {
//   return research.value.getFilteredQuestions(researchResult.value);
// });

const selectMode = ref(false);

const update = async () => {
  Provider.withHeadLoader(async () => {
    await Provider.store.dispatch('researches/update');
  });
};
const setName = () => {
  // props.question.setName(name.value);
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
