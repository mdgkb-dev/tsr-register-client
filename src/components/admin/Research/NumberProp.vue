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
    variantId: {
      type: String as PropType<string>,
      default: '',
    },
  },
  emits: ['fill'],
  setup(props, { emit }) {
    const answer = props.variantId
      ? props.researchResult.getQuestionVariantAnswer(props.variantId)
      : props.researchResult.getOrCreateAnswer(props.question);
    const filledCheck = (): void => {
      if (!answer) {
        return;
      }
      answer.filled = answer.valueNumber === 0 || !!answer.valueNumber;
      props.researchResult.calculateFilling();
      emit('fill');
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

:deep(.el-input-number__increase) {
  border-radius: 0px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

:deep(.el-input-number__decrease) {
  border-radius: 0px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
</style>
