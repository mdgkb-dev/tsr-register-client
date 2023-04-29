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
  <!--    <div v-for="registerPropertySet in prop.registerPropertySets" :key="registerPropertySet.id">-->
  <!--      <template v-if="registerGroupToPatient.getRegisterPropertyValueSet(registerPropertySet.id)">-->
  <!--        <el-form-item-->
  <!--          v-for="registerPropertyOther in registerPropertySet.registerPropertyOthers"-->
  <!--          :key="registerPropertyOther.id"-->
  <!--          :label="registerPropertyOther.name"-->
  <!--        >-->
  <!--          <el-input-->
  <!--            :model-value="registerGroupToPatient.getRegisterPropertyOthers(registerPropertyOther.id)"-->
  <!--            @input="registerGroupToPatient.setRegisterPropertyOthers($event, registerPropertyOther.id)"-->
  <!--          />-->
  <!--        </el-form-item>-->
  <!--      </template>-->
  <!--    </div>-->
  <!--  </el-form-item>-->
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import Question from '@/classes/Question';
import ResearchResult from '@/classes/ResearchResult';

export default defineComponent({
  name: 'SetProp',
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
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const answer = props.researchResult.getOrCreateAnswer(props.question);
    const filledCheck = (): void => {
      answer.filled = answer.selectedAnswerVariants.length > 0;
      props.researchResult.calculateFilling();
    };
    const selectVariant = (selected: boolean, variantId: string) => {
      answer.setSelectedAnswerVariant(selected, variantId);
      filledCheck();
    };
    return {
      selectVariant,
      filledCheck,
      answer,
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
