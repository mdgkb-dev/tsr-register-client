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
            <el-input v-model="question.name" @blur="setName"></el-input>
          </template>
          <template #inside-content>
            <QuestionEdit :question="question" />
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

.tools-panel {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: right;
  align-items: center;
  padding: 13px 0 0 0;
}

:deep(.icon-download) {
  width: 24px;
  height: 24px;
  cursor: pointer;
  stroke: #006bb4;
  fill: none;
}

:deep(.icon-aright) {
  width: 24px;
  height: 24px;
  cursor: pointer;
  fill: #006bb4;
}

.download-button {
  width: 52px;
  height: 52px;
  color: #006bb4;
  background: #ffffff;
  margin: 0px;
}

.download-button:hover {
  background: #dff2f8;
}

.button-download-field {
  width: 250px;
  height: 50px;
  background: #ffffff;
  border: 1px solid #006bb4;
  border-left: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

.field {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.save-button {
  width: 100%;
  border-radius: 5px;
  height: 42px;
  color: #006bb4;
  background: #dff2f8;
  margin: 0 5px;
  font-size: 14px;
}

.select-field {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #c4c4c4;
  opacity: 0.2;
  width: 100%;
  height: 100%;
}

.selected-field {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.check-icon {
  width: 40px;
  height: 40px;
  fill: #00b5a4;
  fill-opacity: 0.6;
}
</style>
