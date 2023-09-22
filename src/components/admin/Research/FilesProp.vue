<template>
  <Button button-class="plus-button" text="Добавить скан" @click="addFile" />
  <div v-for="answerFile in answer.answerFiles" :key="answerFile.id" class="background-field">
    <FileUploader :file-info="answerFile.fileInfo" @remove="remove(answerFile.id)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

import Answer from '@/classes/Answer';
import Question from '@/classes/Question';
import ResearchResult from '@/classes/ResearchResult';
import Button from '@/components/Base/Button.vue';
import FileUploader from '@/components/FileUploader.vue';
import ClassHelper from '@/services/ClassHelper';

export default defineComponent({
  name: 'FilesProp',
  components: { FileUploader, Button },
  props: {
    researchResult: {
      type: Object as PropType<ResearchResult>,
      required: true,
    },
    question: {
      type: Object as PropType<Question>,
      required: true,
    },
  },
  setup(props) {
    const answer: Ref<Answer | undefined> = ref(undefined);
    onBeforeMount(() => {
      answer.value = props.researchResult.getOrCreateAnswer(props.question);
    });

    const remove = (id: string) => {
      if (!answer.value) {
        return;
      }
      console.log(id, answer.value);
      ClassHelper.RemoveFromClassById(id, answer.value?.answerFiles, answer.value?.answerFilesForDelete);
    };

    const addFile = async () => {
      if (!answer.value) {
        return;
      }
      answer.value.addFile();
    };

    return { answer, remove, addFile };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';

.plus-button {
  width: 100%;
  border-radius: 5px;
  height: 42px;
  color: #00bea5;
  background: #c1efeb;
  margin: 0px 10px 0 0;
  font-size: 14px;
}

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
</style>
