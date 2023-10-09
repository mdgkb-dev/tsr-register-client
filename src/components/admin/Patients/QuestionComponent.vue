<template>
  <SetSelect v-if="question.questionVariants.length" :research-result="researchResult" :question="question" @fill="$emit('fill')" />
  <component :is="question.valueType.getComponentType()" v-else :research-result="researchResult" :question="question" @fill="$emit('fill')" />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import Question from '@/classes/Question';
import ResearchResult from '@/classes/ResearchResult';
import DateQuestion from '@/components/admin/Research/DateQuestion.vue';
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
    DateQuestion,
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
