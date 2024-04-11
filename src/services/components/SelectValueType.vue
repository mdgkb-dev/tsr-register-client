<template>
  Выберите тип ответа:
  <el-select :model-value="selectedType.name" placeholder="Тип вопроса" @change="select">
    <el-option v-for="(value, type) in types" :key="value" :label="value" :value="type" />
  </el-select>
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

const select = (t: ValueTypes) => {
  console.log(t);
  emits('select', t);
};
</script>

<style lang="scss" scoped>
.red {
  background: red;
}
</style>
