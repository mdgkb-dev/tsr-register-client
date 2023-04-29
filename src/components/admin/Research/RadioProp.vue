<template>
  <el-radio
    v-for="variant in question.answerVariants"
    :key="variant.id"
    v-model="answer.answerVariantId"
    :label="variant.id"
    @change="filledCheck(variant)"
  >
    {{ variant.name }}
  </el-radio>
  <el-form v-if="selectedVariant && selectedVariant.showMoreQuestions" class="line">
    <el-form-item v-for="additionalQuestion in question.children" :key="additionalQuestion.id" :label="additionalQuestion.name">
      <StringProp
        v-if="additionalQuestion.valueType.isString() || additionalQuestion.valueType.isText()"
        :research-result="researchResult"
        :question="additionalQuestion"
      />
      <DataComponentComputed
        v-if="additionalQuestion.valueType.isDate()"
        :research-result="researchResult"
        :question="additionalQuestion"
      />
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

import Answer from '@/classes/Answer';
import AnswerVariant from '@/classes/AnswerVariant';
import Question from '@/classes/Question';
import ResearchResult from '@/classes/ResearchResult';
import DataComponentComputed from '@/components/admin/Research/DataComponentComputed.vue';
import StringProp from '@/components/admin/Research/StringProp.vue';

export default defineComponent({
  name: 'RadioProp',
  components: { StringProp, DataComponentComputed },
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
    const selectedVariant: Ref<AnswerVariant | undefined> = ref(undefined);
    const answer: Ref<Answer | undefined> = ref(undefined);
    const filledCheck = (variant: AnswerVariant): void => {
      if (!answer.value) {
        return;
      }
      selectVariant(variant);
      answer.value.filled = answer.value.answerVariantId === variant.id;
      props.researchResult.calculateFilling();
    };

    const selectVariant = (variant?: AnswerVariant): void => {
      selectedVariant.value = variant;
    };

    onBeforeMount(() => {
      answer.value = props.researchResult.getOrCreateAnswer(props.question);
      selectVariant(props.question.answerVariants.find((a: AnswerVariant) => a.id === answer.value?.answerVariantId));
    });

    return {
      selectedVariant,
      filledCheck,
      answer,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';
@import '@/assets/styles/elements/base-style.scss';
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

:deep(.el-form-item) {
  display: block;
  width: 100%;
  margin-bottom: 16px;
}

:deep(.el-form-item__content) {
  width: 100%;
}

:deep(.el-input__inner) {
  border-radius: 40px;
  padding-left: 25px;
  height: 32px;
  width: 100%;
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 15px;
  color: $site_dark_gray;
}

:deep(.el-input__inner::placeholder) {
  color: $site_light_pink;
}

:deep(.el-select .el-input .el-select__caret) {
  color: #343e5c;
  font-size: 15px;
  font-weight: bold;
  margin-right: 5px;
}

.el-select {
  width: 100%;
}

:deep(.el-input__prefix) {
  left: 230px;
  top: -3px;
}

:deep(.el-date-editor.el-input, .el-date-editor.el-input__inner) {
  width: 100%;
}

:deep(.el-input__icon) {
  color: $site_dark_gray;
}

:deep(.el-input__suffix) {
  top: -3px;
}

:deep(.el-form-item__label) {
  color: $site_light_pink;
  padding: 0 !important;
  text-transform: uppercase;
  margin-left: 5px;
  font-size: 14px;
  margin-bottom: 6px;
}

:deep(.el-input__prefix) {
  left: auto;
  right: 10px;
}

:deep(.el-textarea__inner) {
  color: $site_dark_gray;
  padding-left: 25px;
}

:deep(.el-textarea__inner::placeholder) {
  color: $site_light_pink;
}

.option-field {
  margin-top: 20px;
}

.line {
  max-width: 300px;
}
</style>
