<template>
  <button
    class="button"
    :style="{
      color: colorSwap ? (hovering ? background : color) : color,
      background: colorSwap ? (hovering ? color : background) : (hovering ? backgroundHover : background),
      marginTop: marginTop,
      marginRight: marginRight,
      margin: margin,
      width: width,
      borderColor: color,
      height: height,
      borderRadius: borderRadius,
      border: border ? '' : 'none',
      fontSize: fontSize,
    }"
    @click.prevent="saveDishSample"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
  <div v-if="withIcon" class="button-icon"
    :style="{
      stroke: color,
      fill: color,
      marginRight: text ? '10px' : '',
      transform: colorSwap ? (hovering ? backgroundHover : background) : (hovering ? 'scale(1.1, 1.1)' : ''),
      transition: colorSwap ? '' : '0.2s',
    }"
  >
    <slot name="icon" />
  </div>
  <div  class="text"
    :style="{
      transform: colorSwap ? (hovering ? backgroundHover : background) : (hovering ? 'scale(1.1, 1.1)' : ''),
      transition: colorSwap ? '' : '0.2s',
    }"
  >
    {{ text }}
  </div>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  name: 'Button',
  props: {
    text: {
      type: String as PropType<string>,
      default: '',
      required: false,
    },
    color: {
      type: String as PropType<string>,
      default: '#449d7c',
      required: false,
    },
    colorSwap: {
      type: Boolean as PropType<boolean>,
      default: false,
      required: false,
    },
    background: {
      type: String as PropType<string>,
      default: 'inherit',
      required: false,
    },
    backgroundHover: {
      type: String as PropType<string>,
      default: 'inherit',
      required: false,
    },
    marginTop: {
      type: String as PropType<string>,
      required: false,
      default: '0px',
    },
    marginRight: {
      type: String as PropType<string>,
      required: false,
      default: 'auto',
    },
    margin: {
      type: String as PropType<string>,
      required: false,
      default: '',
    },
    width: {
      type: String as PropType<string>,
      required: false,
      default: 'auto',
    },
    height: {
      type: String as PropType<string>,
      required: false,
      default: '20px',
    },
    borderRadius: {
      type: String as PropType<string>,
      required: false,
      default: '0px',
    },
    border: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: true,
    },
    withIcon: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: true,
    },
    fontSize: {
      type: String as PropType<string>,
      required: false,
      default: '10px',
    },
  },
  setup() {
    const hovering = ref(false);

    return {
      hovering,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  transition: 0.3s;
  text-align: center;
  padding: 0 10px;
  cursor: pointer;
  overflow: hidden;
}

.button-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
}

.text {
  margin-top: auto;
  margin-bottom: auto;
  display: flex;
  justify-content: center;
  height: auto;
  max-height: 36px;
}

</style>
