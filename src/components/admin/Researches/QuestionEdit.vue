<template>
  <SelectValueType :selected-type="question.valueType" @select="selectType" />

  <!-- <SetSelect v-if="question.questionVariants.length" :research-result="researchResult" :question="question" @fill="fill" /> -->
  <hr />
  <component :is="component" :question="question" />
</template>

<script setup lang="ts">
import Question from '@/classes/Question';
import DatePropEdit from '@/components/admin/Researches/DatePropEdit.vue';
import NumberPropEdit from '@/components/admin/Researches/NumberPropEdit.vue';
import RadioPropEdit from '@/components/admin/Researches/RadioPropEdit.vue';
import SetPropEdit from '@/components/admin/Researches/SetPropEdit.vue';
import StringPropEdit from '@/components/admin/Researches/StringPropEdit.vue';
import ValueType from '@/services/classes/ValueType';

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
  await Store.Update('questions', props.question);
};

const components = {
  num: NumberPropEdit,
  string: StringPropEdit,
  radio: RadioPropEdit,
  set: SetPropEdit,
  date: DatePropEdit,
  // AdminResearchPageSponsors: AdminResearchPageSponsors,
};
const component = computed(() => {
  if (props.question.valueType.isNumber()) {
    return components['num'];
  }
  if (props.question.valueType.isRadio()) {
    return components['radio'];
  }
  if (props.question.valueType.isString()) {
    return components['string'];
  }
  if (props.question.valueType.isDate()) {
    return components['date'];
  }
  return 'no';
});
</script>

<style lang="scss" scoped></style>
