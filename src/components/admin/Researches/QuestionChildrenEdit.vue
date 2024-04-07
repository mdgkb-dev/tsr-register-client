<template>
  <SelectValueType :selected-type="question.valueType" @select="selectType" />

  <!-- <SetSelect v-if="question.questionVariants.length" :research-result="researchResult" :question="question" @fill="fill" /> -->
  <hr />
  <component :is="component" :question="question" />
</template>

<script setup lang="ts">
import Question from '@/classes/Question';
import ResearchResult from '@/classes/ResearchResult';
import NumberPropEdit from '@/components/admin/Researches/NumberPropEdit.vue';
import RadioPropEdit from '@/components/admin/Researches/RadioPropEdit.vue';
import StringPropEdit from '@/components/admin/Researches/StringPropEdit.vue';
import ValueType from '@/services/classes/ValueType';
import Provider from '@/services/Provider/Provider';
import ValueTypes from '@/services/types/ValueTypes';

const props = defineProps({
  question: {
    type: Object as PropType<Question>,
    required: true,
  },
});

const valueType: Ref<ValueType> = Store.Item('valueTypes');

const selectType = async (itemName: string) => {
  await Store.Get('valueTypes', itemName);
  props.question.setType(valueType.value);
};

const components = {
  num: NumberPropEdit,
  string: StringPropEdit,
  radio: RadioPropEdit,
  // AdminResearchPageSponsors: AdminResearchPageSponsors,
};
const component = computed(() => {
  if (props.question.valueType.isNumber()) {
    return components['num'];
  }
  if (props.question.valueType.isRadio()) {
    return components['radio'];
  }
  return 'no';
});
</script>

<style lang="scss" scoped></style>
