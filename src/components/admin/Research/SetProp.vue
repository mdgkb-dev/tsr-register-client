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
      <StringProp
        v-if="additionalQuestion.valueType.isString() || additionalQuestion.valueType.isText()"
        :research-result="researchResult"
        :question="additionalQuestion"
        @fill="$emit('fill')"
      />
      <NumberProp
        v-if="additionalQuestion.valueType.isNumber()"
        :research-result="researchResult"
        :question="additionalQuestion"
        @fill="$emit('fill')"
      />
      <DataComponentComputed
        v-if="additionalQuestion.valueType.isDate()"
        :research-result="researchResult"
        :question="additionalQuestion"
        @fill="$emit('fill')"
      />
      <!--      <RadioProp v-if="question.valueType.isRadio()" :research-result="researchResult" :question="question" @fill="$emit('fill')" />-->
      <SetProp
        v-if="question.valueType.isSet()"
        :research-result="researchResult"
        :question="additionalQuestion"
        :restrict-others="true"
        @fill="$emit('fill')"
      />
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';

import AnswerVariant from '@/classes/AnswerVariant';
import Question from '@/classes/Question';
import ResearchResult from '@/classes/ResearchResult';
import SelectedAnswerVariant from '@/classes/SelectedAnswerVariant';
import DataComponentComputed from '@/components/admin/Research/DataComponentComputed.vue';
import NumberProp from '@/components/admin/Research/NumberProp.vue';
import StringProp from '@/components/admin/Research/StringProp.vue';

export default defineComponent({
  name: 'SetProp',
  components: {
    StringProp,
    NumberProp,
    DataComponentComputed,
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
    const answer = props.researchResult.getOrCreateAnswer(props.question);
    const showOthers = computed(() => {
      if (props.restrictOthers) {
        return false;
      }
      return answer.selectedAnswerVariants.some((s: SelectedAnswerVariant) => {
        return props.question.answerVariants.some((a: AnswerVariant) => a.id === s.answerVariantId && a.showMoreQuestions);
      });
    });
    const filledCheck = (): void => {
      answer.filled = answer.selectedAnswerVariants.length > 0;
      props.researchResult.calculateFilling();
      emit('fill');
    };
    const selectVariant = (selected: boolean, variantId: string) => {
      answer.setSelectedAnswerVariant(selected, variantId);
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
