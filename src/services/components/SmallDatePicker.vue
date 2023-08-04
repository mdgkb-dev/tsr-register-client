<template>
  <div
    class="style-container"
    :style="{
      width: width,
      position: 'relative',
    }"
  >
    <el-date-picker
      disabled="true"
      v-model="date"
      type="date"
      format="DD.MM.YY"
      :placeholder="placeholder"
      :style="{
        width: width,
        position: 'relative',
        cursor: 'pointer',
      }"
      @change="changeHandler"
      @focus="open"
    ></el-date-picker>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

export default defineComponent({
  name: 'SmallDatePicker',
  props: {
    modelValue: {
      type: Date,
      required: true,
    },
    placeholder: {
      type: String,
      default: 'Выберать',
    },
    width: { type: String as PropType<string>, required: false, default: 'auto' },
  },
  emits: ['update:modelValue', 'change'],

  setup(props, { emit }) {
    const date: Ref<Date> = ref(new Date());
    const changeHandler = (value: Date) => {
      const date = new Date(value);
      const userTimezoneOffset = date.getTimezoneOffset() * 60000;
      emit('update:modelValue', new Date(date.getTime() - userTimezoneOffset));
      emit('change');
    };
    onBeforeMount(() => {
      date.value = props.modelValue;
    });

    const open = () => {
      console.log(open);
    };

    return {
      open,
      date,
      changeHandler,
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
  padding-left: 20px;
  padding-right: 0px;
  border: none;
  width: 100%;
}

:deep(.el-input__prefix) {
  left: 0px;
  top: -3px;
}

:deep(.el-input--prefix .el-input__inner) {
  padding-left: 23px;
}

:deep(.el-input__suffix) {
  top: -3px;
  right: 0px;
  display: none;
}

:deep(.el-input--suffix .el-input__inner) {
  padding-right: 0px;
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
</style>
