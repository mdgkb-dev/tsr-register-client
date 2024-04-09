<template>
  <Button v-for="(value, type) in types" :key="value" :text="value" :button-class="getButtonClass(type)" @click="select(type)" />
</template>

<script setup lang="ts">
// import Button from '@/services/components/Button';
import ValueTypes from '@/services/types/ValueTypes';

const props = defineProps({
  selectedType: {
    type: Object as PropType<ValueTypes>,
    required: true,
  },
});
const types = {
  [ValueTypes.String]: 'Строка',
  [ValueTypes.Number]: 'Число',
  [ValueTypes.Date]: 'Дата',
  [ValueTypes.Radio]: 'Выбор из одного варианта',
  [ValueTypes.Set]: 'Выбор нескольких вариантов',
  [ValueTypes.Files]: 'Файлы',
};
const emits = defineEmits(['select']);

const getButtonClass = (type: string) => {
  console.log(props.selectedType, type);
  return props.selectedType.name === type ? 'red' : '';
};

const select = (t: ValueTypes) => {
  emits('select', t);
};
</script>

<style lang="scss" scoped>
.red {
  background: red;
}
</style>
