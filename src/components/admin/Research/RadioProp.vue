<template>
  <el-radio
    v-for="variant in question.answerVariants"
    :key="variant.id"
    v-model="answer.answerVariantId"
    :label="variant.id"
    @change="filledCheck(variant.id)"
  >
    {{ variant.name }}
  </el-radio>
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
import { defineComponent, PropType } from 'vue';

import Question from '@/classes/Question';
import ResearchResult from '@/classes/ResearchResult';

export default defineComponent({
  name: 'RadioProp',
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
    const answer = props.researchResult.getAnswer(props.question.id as string);
    const filledCheck = (variantId: string): void => {
      answer.filled = answer.answerVariantId === variantId;
      props.researchResult.calculateFilling();
    };
    return {
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
