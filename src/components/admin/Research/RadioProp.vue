<template>
  <el-radio
    v-for="variant in question.answerVariants"
    :key="variant.id"
    v-model="answer.answerVariantId"
    :label="variant.id"
    @change="filledCheck(variant)"
  >
    {{ variant.name }}, {{ variant.id }}
  </el-radio>

  <div v-if="selectedVariant && selectedVariant.showMoreQuestions">
    <div v-for="additionalQuestion in question.children" :key="additionalQuestion.id">
      <StringProp :question="additionalQuestion" :research-result="researchResult" />
    </div>
  </div>
  <!--    <div v-if="prop.getOthers(registerGroupToPatient.getRegisterPropertyValue(prop))">-->
  <!--      <el-form-item-->
  <!--        v-for="registerPropertyOther in prop.getOthers(registerGroupToPatient.getRegisterPropertyValue(prop, false))"-->
  <!--        :key="registerPropertyOther.id"-->
  <!--        :label="registerPropertyOther.name"-->
  <!--      >-->
  <!--        <el-input-->
  <!--          :model-value="registerGroupToPatient.getRegisterPropertyOthers(registerPropertyOther.id)"-->
  <!--          @input="registerGroupToPatient.setRegisterPropertyOthers($event, registerPropertyOther.id)"-->
  <!--        />-->
  <!--      </el-form-item>-->
  <!--    </div>-->
  <!--    <el-input-->
  <!--      v-if="prop.withOther"-->
  <!--      style="margin-top: 10px"-->
  <!--      placeholder="Другое, указать"-->
  <!--      type="textarea"-->
  <!--      :rows="3"-->
  <!--      :model-value="registerGroupToPatient.getOtherPropertyValue(prop)"-->
  <!--      @input="registerGroupToPatient.setRegisterPropertyValueOther($event, prop)"-->
  <!--    />-->
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

import Answer from '@/classes/Answer';
import AnswerVariant from '@/classes/AnswerVariant';
import Question from '@/classes/Question';
import ResearchResult from '@/classes/ResearchResult';
import StringProp from '@/components/admin/Research/StringProp.vue';

export default defineComponent({
  name: 'RadioProp',
  components: { StringProp },
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
      answer.value = props.researchResult.getAnswer(props.question.id as string);
      if (!answer.value) {
        answer.value = Answer.Create(props.question);
        props.researchResult.addAnswer(answer.value);
      }
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
