<template>
  <el-input v-if="answer" ref="inputRef" v-model="answer.valueString" @input="filledCheck" />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

import Answer from '@/classes/Answer';
import Question from '@/classes/Question';
import ResearchResult from '@/classes/ResearchResult';

export default defineComponent({
  name: 'StringProp',
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
  emits: ['fill'],
  setup(props, { emit, expose }) {
    const answer: Ref<Answer | undefined> = ref(undefined);
    const inputRef = ref();
    const filledCheck = (input: string): void => {
      if (!answer.value) {
        return;
      }
      answer.value.filled = input.length > 0;
      props.researchResult.calculateFilling();
      emit('fill');
    };

    onBeforeMount(() => {
      answer.value = props.researchResult.getOrCreateAnswer(props.question);
    });

    expose({ inputRef });

    return {
      filledCheck,
      answer,
      inputRef,
    };
  },
});
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
</style>
