<template>
  <el-checkbox
    v-for="variant in question.answerVariants"
    :key="variant.id"
    :label="variant.name"
    :model-value="answer.getSelectedAnswerVariant(variant.id)"
    @change="(selected) => selectVariant(selected, variant.id)"
  >
    {{ variant.name }}
  </el-checkbox>
  <el-form v-if="showOthers" class="line">
    <el-form-item v-for="additionalQuestion in question.children" :key="additionalQuestion.id" :label="additionalQuestion.name">
      <SetProp
        :is="additionalQuestion.valueType.getComponentType()"
        v-if="additionalQuestion.valueType.getComponentType() === 'SetProp'"
        :research-result="researchResult"
        :question="additionalQuestion"
        @fill="$emit('fill')"
      />
      <component :is="additionalQuestion.valueType.getComponentType()" v-else :research-result="researchResult" :question="additionalQuestion" @fill="$emit('fill')" />
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref, ref } from 'vue';

import Answer from '@/classes/Answer';
import AnswerVariant from '@/classes/AnswerVariant';
import Question from '@/classes/Question';
import ResearchResult from '@/classes/ResearchResult';
import SelectedAnswerVariant from '@/classes/SelectedAnswerVariant';
import DateQuestion from '@/components/admin/Research/DateQuestion.vue';
import NumberProp from '@/components/admin/Research/NumberProp.vue';
import StringProp from '@/components/admin/Research/StringProp.vue';

export default defineComponent({
  name: 'SetProp',
  components: {
    StringProp,
    NumberProp,
    DateQuestion,
  },
  props: {
    researchResult: {
      type: Object as PropType<ResearchResult>,
      required: true,
    },
    question: {
      type: Object as PropType<Question>,
      required: true,
    },
    restrictOthers: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  emits: ['update:modelValue', 'fill'],
  setup(props, { emit }) {
    const answer: Ref<Answer> = ref(props.researchResult.getOrCreateAnswer(props.question));
    const showOthers = computed(() => {
      if (props.restrictOthers) {
        return false;
      }
      return answer.value.selectedAnswerVariants.some((s: SelectedAnswerVariant) => {
        return props.question.answerVariants.some((a: AnswerVariant) => a.id === s.answerVariantId && a.showMoreQuestions);
      });
    });
    const filledCheck = (): void => {
      answer.value.filled = answer.value.selectedAnswerVariants.length > 0;
      props.researchResult.calculateFilling();
      emit('fill');
    };
    const selectVariant = (selected: boolean, variantId: string) => {
      answer.value.setSelectedAnswerVariant(selected, variantId);
      filledCheck();
    };

    return {
      selectVariant,
      filledCheck,
      answer,
      showOthers,
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
