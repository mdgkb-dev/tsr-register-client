<template>
  <div class="string" :style="styleObject" :class="customClass" @click="$emit('click')">
    {{ string }}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'StringItem',
  props: {
    string: { type: String as PropType<string>, required: false, default: '' },
    color: { type: String as PropType<string>, required: false, default: '' },
    fontSize: { type: String as PropType<string>, required: false, default: '' },
    fontWeight: { type: String as PropType<string>, required: false, default: '' },
    background: { type: String as PropType<string>, required: false, default: '' },
    padding: { type: String as PropType<string>, required: false, default: '' },
    width: { type: String as PropType<string>, required: false, default: '' },
    minWidth: { type: String as PropType<string>, required: false, default: '' },
    margin: { type: String as PropType<string>, required: false, default: '' },
    customClass: { type: String as PropType<string>, required: false, default: '' },
    justifyContent: { type: String as PropType<string>, required: false, default: 'center' },
  },
  emits: ['click'],
  setup(props) {
    const styleObject = {
      color: props.color,
      fontSize: props.fontSize,
      fontWeight: props.fontWeight,
      background: props.background,
      padding: props.padding,
      width: props.width,
      maxWidth: props.width,
      minWidth: props.minWidth,
      margin: props.margin,
      justifyContent: props.justifyContent,
    };
    return { styleObject };
  },
});
</script>

<style scoped lang="scss">
.string {
  max-width: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  background: inherit;
}
</style>
