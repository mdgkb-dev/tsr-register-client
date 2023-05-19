<template>
  <div class="string"
    :style="{
      color: color,
      fontSize: fontSize,
      fontWeight: fontWeight,
      background: background,
      padding: padding,
      width: width,
      maxWidth: width,
      minWidth: minWidth,
      margin: margin,
    }"
  >
    {{ string }}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'StringItem',
  props: {
    string: {type: String as PropType<string>, required: false, default: 'String'},
    color: {type: String as PropType<string>, required: false, default: 'inherit'},
    fontSize: { type: String as PropType<string>, required: false, default: '14px' },
    fontWeight: { type: String as PropType<string>, required: false, default: 'normal' },
    background: { type: String as PropType<string>, required: false, default: '#ffffff' },
    padding: { type: String as PropType<string>, required: false, default: '0 10px' },
    width: { type: String as PropType<string>, required: false, default: '' },
    minWidth: { type: String as PropType<string>, required: false, default: '' },
    margin: { type: String as PropType<string>, required: false, default: '0, 0px, 0 0' },
  },
});
</script>

<style scoped lang="scss">
  .string {
    max-width: 100%;
  }
</style>
