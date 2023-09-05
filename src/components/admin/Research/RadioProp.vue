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
      <component
        :is="additionalQuestion.valueType.getComponentType()"
        :research-result="researchResult"
        :question="additionalQuestion"
        @fill="$emit('fill')"
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
import NumberProp from '@/components/admin/Research/NumberProp.vue';
import SetProp from '@/components/admin/Research/SetProp.vue';
import StringProp from '@/components/admin/Research/StringProp.vue';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'RadioProp',
  components: { NumberProp, StringProp, DataComponentComputed, SetProp },
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
  setup(props, { emit }) {
    const selectedVariant: Ref<AnswerVariant | undefined> = ref(undefined);
    const answer: Ref<Answer | undefined> = ref(undefined);
    const filledCheck = (variant: AnswerVariant): void => {
      // TODO: временно
      if (Provider.route().params['id'] && answer.value) {
        answer.value.patientId = Provider.route().params['id'] as string;
      }
      if (!answer.value) {
        return;
      }
      selectVariant(variant);
      answer.value.filled = answer.value.answerVariantId === variant.id;
      props.researchResult.calculateFilling();
      emit('fill');
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

:deep(.el-input__inner) {
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

:deep(.el-input__icon) {
  color: $site_dark_gray;
}

:deep(.el-form-item__label) {
  color: $site_light_pink;
  padding: 0 !important;
  text-transform: uppercase;
  margin-left: 5px;
  font-size: 14px;
  margin-bottom: 6px;
}
</style>
