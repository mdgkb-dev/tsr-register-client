<template>
  <div class="body"
    :style="{
      background: background,
      padding: padding,
      margin: margin,
      width: width,
      height: height,
      maxWidth: maxWidth,
      minWidth: minWidth,
      border: hovering ? '1px solid #1979CF' : '',
      boxShadow: hovering ? '0px 0px 1px 1px #1979CF' : 'none',
      color: hovering ? '#1979CF' : '#343E5C',
    }"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <slot name="inside-content" />
    <div class="top-title"
      :style="{
        color: hovering ? '#1979CF' : '#343E5C',
        stroke: hovering ? '#1979CF' : '#343E5C',
      }"
    >
      <svg class="icon-top-title"
        :style="{
          stroke: hovering ? '#1979CF' : '#343E5C',
        }"      
      >
        <use xlink:href="#iconamoon_edit-light"></use>
      </svg>
      <slot name="title" />
    </div>
  </div>
  <svg width="0" height="0" class="hidden">
    <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" id="iconamoon_edit-light">
      <path d="M6.2513 2.50053L7.5013 3.75053M5.41797 8.33386H8.7513M2.08464 6.66719L1.66797 8.33386L3.33464 7.91719L8.16214 3.08969C8.31836 2.93342 8.40612 2.7215 8.40612 2.50053C8.40612 2.27956 8.31836 2.06763 8.16214 1.91136L8.09047 1.83969C7.9342 1.68347 7.72227 1.5957 7.5013 1.5957C7.28033 1.5957 7.06841 1.68347 6.91214 1.83969L2.08464 6.66719Z" stroke-width="0.6" stroke-linecap="round" stroke-linejoin="round"></path>
    </symbol>
  </svg>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  name: 'InfoItem',
  props: {
    fontWeight: { type: String as PropType<string>, required: false, default: 'normal' },
    background: { type: String as PropType<string>, required: false, default: '#ffffff' },
    padding: { type: String as PropType<string>, required: false, default: '0 10px' },
    width: { type: String as PropType<string>, required: false, default: 'auto' },
    maxWidth: { type: String as PropType<string>, required: false, default: '100%' },
    minWidth: { type: String as PropType<string>, required: false, default: '100px' },
    margin: { type: String as PropType<string>, required: false, default: '0, 10px, 0 0' },
    height: { type: String as PropType<string>, required: false, default: '40px' },
  },

  setup() {
    const hovering = ref(false);

    return {
      hovering,
    };
  },
});
</script>

<style scoped lang="scss">
  @import '@/assets/styles/elements/base-style.scss';

  .hidden {
    display: none;
  }

  .body {
    border: $light-pink-border;
    border-radius: $normal-border-radius;
    position: relative;
    display: flex;
    justify-content: left;
    align-items: center;
    cursor: pointer;
    transition: 0.15s;
  }

  .top-title {
    position: absolute;
    z-index: 1;
    top: -7px;
    right: 5px;
    background: #ffffff;
    display: flex;
    justify-content: left;
    align-items: center;
    padding: 0 3px;
  }

  .inside-content {
    width: 100%;
    display: flex;
    justify-content: left;
    align-items: center;
    max-height: 28px;
    background: #c3c3c3;
  }

  .icon-top-title {
    width: 10px;
    height: 10px;
    stroke: #343E5C;
  }
</style>
