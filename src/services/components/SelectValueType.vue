<template>
  <Button v-for="(value, type) in types" :key="value" :text="value" @click="select(type)" />
</template>

<script setup lang="ts">
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
  [ValueTypes.Radio]: 'Выбор из одного варианта',
  [ValueTypes.Set]: 'Выбор нескольких вариантов',
};
const emits = defineEmits(['select']);

const select = (t: ValueTypes) => {
  emits('select', t);
};
</script>

<style lang="scss" scoped></style>
