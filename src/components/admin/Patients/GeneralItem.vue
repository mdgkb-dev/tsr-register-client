<template>
  <div class="general-block-item"
    :style="{
      background: background,
      height: height,
      width: width,
      borderColor: borderColor,
      padding: padding,
      margin: margin,
      transform: scale ? (hovering ? 'scale(1.03, 1.03)' : '') : '',
    }"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <div
      class="green"
      :style="{
        width: `${ready}`,
      }"
    ></div>
    <div class="general-block-item-title"
      :style="{
        fontSize: fontSize,
      }"
    >
      <slot name="general-item" />
    </div>
  </div>
  <!-- borderColor: scale ? borderColor : (hovering ? '#379fff' : borderColor), -->
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  name: 'GeneralItem',
  props: {
    background: {
      type: String as PropType<string>,
      required: false,
      default: '#ffffff',
    },
    height: {
      type: String as PropType<string>,
      required: false,
      default: '40px',
    },
    width: {
      type: String as PropType<string>,
      required: false,
      default: 'auto',
    },

    ready: {
      type: String as PropType<string>,
      required: false,
      default: '0%',
    },
    padding: {
      type: String as PropType<string>,
      required: false,
      default: '10px',
    },
    borderColor: {
      type: String as PropType<string>,
      required: false,
      default: '#343D5C',
    },
    margin: {
      type: String as PropType<string>,
      required: false,
      default: '5px',
    },
    scale: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: true,
    },
    fontSize: {
      type: String as PropType<string>,
      required: false,
      default: '14px',
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

.general-block-item {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.3s;
  border-radius: $normal-border-radius;
  border: $custom-border;
  text-align: center;
  overflow: hidden;
}

.green {
  position: absolute;
  background: #c7ecea;
  top: 0;
  left: 0;
  width: 80%;
  height: 100%;
}

.general-block-item-title {
  font-size: 12px;
  color: #343e5c;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 1;
}


</style>
