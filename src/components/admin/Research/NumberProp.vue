<template>
  <el-form-item>
    <el-input-number :model-value="researchResult.getValue(question, false)" @change="researchResult.setValue($event, question)" />
  </el-form-item>
  {{ researchResult.getValue(question, false) }}
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
  setup() {
    return {};
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