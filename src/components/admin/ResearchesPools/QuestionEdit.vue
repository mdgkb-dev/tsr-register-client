<template>
  <!-- <SelectValueType :selected-type="question.valueType" @select="selectType" /> -->
  <!-- <SetSelect v-if="question.questionVariants.length" :research-result="researchResult" :question="question" @fill="fill" /> -->
  <!-- <component :is="component" :question="question" /> -->


</template>

<script setup lang="ts">
import { computed, PropType, Ref } from 'vue';

import Question from '@/classes/Question';
import ResearchResult from '@/classes/ResearchResult';
import NumberPropEdit from '@/components/admin/Researches/NumberPropEdit.vue';
import ValueType from '@/services/classes/ValueType';
import Provider from '@/services/Provider/Provider';
import ValueTypes from '@/services/types/ValueTypes';

const props = defineProps({
  question: {
    type: Object as PropType<Question>,
    required: true,
  },
});

const researchResult: Ref<ResearchResult> = computed(() => Provider.store.getters['researchesResults/item']);
const valueType: Ref<ValueType> = computed(() => Provider.store.getters['valueTypes/item']);
const changeName = () => {};
const selectType = (item: ValueTypes) => {
  Provider.store.dispatch('valueTypes/get', item);
  props.question.setType(valueType.value);
};
const components = {
  num: NumberPropEdit,
  // AdminResearchPageSponsors: AdminResearchPageSponsors,
};
const component = computed(() => {
  if (props.question.valueType.isNumber()) {
    return components['num'];
  }
  return 'no';
});
</script>

<style lang="scss" scoped></style>
