<template>
  <el-input-number v-model="answer.valueNumber" @change="filledCheck" />
  <!--  <el-radio-group-->
  <!--    :model-value="registerGroupToPatient.getMeasureId(prop.id)"-->
  <!--    @change="(measureId) => registerGroupToPatient.setMeasureId(measureId, prop.id)"-->
  <!--  >-->
  <!--    <el-radio v-for="measure in prop.registerPropertyMeasures" :key="measure.id" :label="measure.id">-->
  <!--      {{ measure.name }}-->
  <!--    </el-radio>-->
  <!--  </el-radio-group>-->
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import Question from '@/classes/Question';
import ResearchResult from '@/classes/ResearchResult';

export default defineComponent({
  name: 'NumberProp',
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
    const filledCheck = (): void => {
      answer.filled = answer.valueNumber === 0 || !!answer.valueNumber;
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
