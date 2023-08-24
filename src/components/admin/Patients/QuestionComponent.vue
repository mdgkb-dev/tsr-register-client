<template>
  <StringProp
    v-if="question.valueType.isString() || question.valueType.isText()"
    :research-result="researchResult"
    :question="question"
    @fill="$emit('fill')"
  />
  <FilesProp v-if="question.valueType.isFiles()" :research-result="researchResult" :question="question" @fill="$emit('fill')" />
  <DataComponentComputed v-if="question.valueType.isDate()" :research-result="researchResult" :question="question" @fill="$emit('fill')" />
  <RadioProp v-if="question.valueType.isRadio()" :research-result="researchResult" :question="question" @fill="$emit('fill')" />
  <SetProp v-if="question.valueType.isSet()" :research-result="researchResult" :question="question" @fill="$emit('fill')" />
  <NumberProp
    v-if="question.valueType.isNumber() & (question.name !== 'Аллергены')"
    :research-result="researchResult"
    :question="question"
    @fill="$emit('fill')"
  />
  <SetSelect v-if="question.questionVariants.length" :research-result="researchResult" :question="question" @fill="$emit('fill')" />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import Question from '@/classes/Question';
import ResearchResult from '@/classes/ResearchResult';
import DataComponentComputed from '@/components/admin/Research/DataComponentComputed.vue';
import FilesProp from '@/components/admin/Research/FilesProp.vue';
import NumberProp from '@/components/admin/Research/NumberProp.vue';
import RadioProp from '@/components/admin/Research/RadioProp.vue';
import SetProp from '@/components/admin/Research/SetProp.vue';
import SetSelect from '@/components/admin/Research/SetSelect.vue';
import StringProp from '@/components/admin/Research/StringProp.vue';

export default defineComponent({
  name: 'QuestionComponent',
  components: {
    SetProp,
    RadioProp,
    NumberProp,
    DataComponentComputed,
    StringProp,
    SetSelect,
    FilesProp,
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
  emits: ['fill'],
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped></style>
