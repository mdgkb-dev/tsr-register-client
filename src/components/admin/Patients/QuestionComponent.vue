<template>
  <StringProp v-if="question.valueType.isString() || question.valueType.isText()" :research-result="researchResult" :question="question" />
  <DataComponentComputed v-if="question.valueType.isDate()" :research-result="researchResult" :question="question" />
  <RadioProp v-if="question.valueType.isRadio()" :research-result="researchResult" :question="question" />
  <SetProp v-if="question.valueType.isSet()" :research-result="researchResult" :question="question" />
  <NumberProp v-if="question.valueType.isNumber() & question.name !== 'Аллергены'" :research-result="researchResult" :question="question" />
  <div v-if="question.name === 'Аллергены'"><SetSelect :research-result="researchResult" :question="question" /></div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import Question from '@/classes/Question';
import ResearchResult from '@/classes/ResearchResult';
import DataComponentComputed from '@/components/admin/Research/DataComponentComputed.vue';
import NumberProp from '@/components/admin/Research/NumberProp.vue';
import RadioProp from '@/components/admin/Research/RadioProp.vue';
import SetProp from '@/components/admin/Research/SetProp.vue';
import StringProp from '@/components/admin/Research/StringProp.vue';
import SetSelect from '@/components/admin/Research/SetSelect.vue';

export default defineComponent({
  name: 'QuestionComponent',
  components: {
    SetProp,
    RadioProp,
    NumberProp,
    DataComponentComputed,
    StringProp,
    SetSelect,
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
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped></style>
