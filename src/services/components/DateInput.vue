<template>
  <div
    class="style-container"
    :style="{
      width: width,
      position: 'relative',
    }"
  >
    <el-input v-model="date" :placeholder="placeholder" @change="changeHandler" @input="inputHandler" />
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { defineComponent, PropType, Ref, ref } from 'vue';

import dateFormat from '@/services/DateMask';

export default defineComponent({
  name: 'DateInput',
  props: {
    modelValue: {
      type: Date,
      required: true,
    },
    placeholder: {
      type: String,
      default: 'Укажите дату',
    },
    width: { type: String as PropType<string>, required: false, default: 'auto' },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const modelValueString = props.modelValue.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const date: Ref<string> = ref(modelValueString);

    const changeHandler = (value: string) => {
      if (value.length < 8) {
        date.value = modelValueString;
        ElMessage({ type: 'error', message: 'Неверный формат даты' });
        return;
      }
      const dateParts = value.split('.');
      const dateObj = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
      const newDate = new Date(dateObj);
      const userTimezoneOffset = newDate.getTimezoneOffset() * 60000;
      emit('update:modelValue', new Date(newDate.getTime() - userTimezoneOffset));
      emit('change');
    };
    const inputHandler = (value: string) => {
      date.value = value.replace(/[^0-9.]/g, '');
      if ((date.value.length == 3 || date.value.length == 6) && date.value[date.value.length - 1] !== '.') {
        date.value = date.value.substring(0, date.value.length - 1) + '.' + date.value.substring(date.value.length - 1);
      }
      if (date.value.length > 10) {
        date.value = date.value.substring(0, date.value.length - 1);
      }
    };

    return {
      date,
      dateFormat,
      changeHandler,
      inputHandler,
    };
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/elements/base-style.scss';

:deep(.el-form-item) {
  display: block;
  margin-bottom: 16px;
  width: 100%;
}

:deep(.el-input__inner) {
  height: 34px;
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 14px;
  color: $site_dark_gray;
  padding-left: 0;
  padding-right: 0px;
  border: none;
  width: 100%;
}

:deep(.el-input__prefix) {
  left: 0px;
  top: -3px;
}

:deep(.el-input--prefix .el-input__inner) {
  padding-left: 0;
}

:deep(.el-input__suffix) {
  top: -3px;
  right: 0px;
  display: none;
}

:deep(.el-input--suffix .el-input__inner) {
  padding: 0px;
}

:deep(.el-input__inner::placeholder) {
  color: $site_light_pink;
}

:deep(.el-input__icon) {
  color: #b0a4c0;
  width: auto;
}

:deep(.el-form-item__label) {
  color: $site_light_pink;
  padding: 0 !important;
  text-transform: uppercase;
  margin-left: 5px;
  font-size: 14px;
  margin-bottom: 6px;
}

:deep(.el-input-number__increase) {
  border-radius: 0px;
}

:deep(.el-input-number__decrease) {
  border-radius: 0px;
}
:deep(.disable) {
  display: none;
}
</style>
