import { Component } from 'vue';

import DateQuestion from '@/components/admin/Research/DateQuestion.vue';
import FilesProp from '@/components/admin/Research/FilesProp.vue';
import NumberProp from '@/components/admin/Research/NumberProp.vue';
import RadioProp from '@/components/admin/Research/RadioProp.vue';
import SetProp from '@/components/admin/Research/SetProp.vue';
import StringProp from '@/components/admin/Research/StringProp.vue';
import ValueTypes from '@/services/types/ValueTypes';

const ValueTypesComponentsMap: Record<ValueTypes, Component> = {
  string: StringProp,
  text: StringProp,
  number: NumberProp,
  date: DateQuestion,
  radio: RadioProp,
  set: SetProp,
  boolean: SetProp,
  files: FilesProp,
};

export default ValueTypesComponentsMap;
