<template>
  <button
    class="button"
    :style="{
      color: toggleMode ? (isToggle | hovering ? color : '#B0A4C0') : colorSwap ? (hovering | isToggle ? background : color) : color,
      background: colorSwap ? (hovering | isToggle ? color : background) : (hovering | isToggle ? backgroundHover : background),
      margin: margin,
      minWidth: width,
      maxWidth: width,
      border: border ? '' : 'none',
      borderColor: toggleMode ? (isToggle | hovering ? color : '#B0A4C0') : color,
      height: height,
      borderRadius: borderRadius,
      fontSize: fontSize,
    }"
    @click.prevent="changeState"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
  <div v-if="withIcon" class="button-icon"
    :style="{
      fill: color,
      marginRight: text ? '10px' : '',
      transform: colorSwap | toggleMode ? (hovering | isToggle ? backgroundHover : background) : (hovering | isToggle ? 'scale(1.1, 1.1)' : ''),
      transition: colorSwap | toggleMode ? '' : '0.2s',
    }"
  >
    <slot name="icon" />
  </div>
  <div  class="text"
    :style="{
      transform: colorSwap | toggleMode ? (hovering | isToggle ? backgroundHover : background) : (hovering | isToggle ? 'scale(1.1, 1.1)' : ''),
      transition: colorSwap | toggleMode ? '' : '0.2s',
    }"
  >
    {{ text }}
  </div>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, Ref } from 'vue';

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
      default: 'inherit',
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
      default: '5px',
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
    toggleMode: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: false,
    },
  },
  setup(props) {
    const hovering = ref(false);
    const isToggle: Ref<boolean> = ref(false);

    const changeState = () => {
      if (props.toggleMode) {
        isToggle.value = !isToggle.value;
      } else {
        isToggle.value = false;
      };
    };

    return {
      hovering,
      changeState,
      isToggle,
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
  transition: 0.15s;
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
