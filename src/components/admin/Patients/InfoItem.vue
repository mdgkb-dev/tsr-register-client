<template>
  <div
    class="base-box"
    :style="{
      width: width,
      height: height,
      maxWidth: maxWidth,
      minWidth: minWidth,
    }"
    @click.prevent="changeState"
  >
    <!-- padding: isToggle && withOpenWindow ? '0' : padding, -->
    <div
      class="body"
      :style="{
        background: background,
        zIndex: isToggle && withOpenWindow ? '2' : '0',
        padding: isToggle && withOpenWindow ? '0' : padding,
        margin: margin,
        width: isToggle && withOpenWindow ? openWidth : width,
        height: isToggle && withOpenWindow ? openHeight : height,
        minHeight: height,
        maxWidth: maxWidth,
        minWidth: minWidth,
        borderColor: hovering | isToggle ? colorSelected : borderColor,
        color: hovering ? colorSelected : '#343E5C',
        boxShadow: hovering | isToggle ? `0px 0px 1px 1px ${colorSelected}` : 'none',
        alignItems: isToggle && withOpenWindow ? 'end' : 'center',
        cursor: withHover ? 'pointer' : '',
      }"
      @mouseenter="withHover ? (hovering = true) : (hovering = false)"
      @mouseleave="hovering = false"
    >
      <div
        class="close-window"
        :style="{
          display: isToggle && withOpenWindow ? 'none' : '',
          height: isToggle && withOpenWindow ? '0' : '',
        }"
      >
        <slot name="close-inside-content" />
      </div>
      <div
        class="open-window"
        :style="{
          display: isToggle && withOpenWindow ? 'flex' : 'none',
          height: isToggle && withOpenWindow ? 'auto' : '0',
        }"
      >
        <slot name="open-inside-content" />
      </div>
      <div
        class="top-title"
        :style="{
          color: hovering ? colorSelected : '#343E5C',
          fill: hovering ? colorSelected : '#343E5C',
          background: background,
        }"
      >
        <svg
          class="icon-top-title"
          :style="{
            stroke: hovering ? colorSelected : '#343E5C',
            display: withIcon ? '' : 'none',
          }"
        >
          <use xlink:href="#iconamoon_edit-light"></use>
        </svg>
        <slot name="title" />
      </div>
    </div>
  </div>
  <svg width="0" height="0" class="hidden">
    <symbol id="iconamoon_edit-light" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
      <path
        d="M6.2513 2.50053L7.5013 3.75053M5.41797 8.33386H8.7513M2.08464 6.66719L1.66797 8.33386L3.33464 7.91719L8.16214 3.08969C8.31836 2.93342 8.40612 2.7215 8.40612 2.50053C8.40612 2.27956 8.31836 2.06763 8.16214 1.91136L8.09047 1.83969C7.9342 1.68347 7.72227 1.5957 7.5013 1.5957C7.28033 1.5957 7.06841 1.68347 6.91214 1.83969L2.08464 6.66719Z"
        stroke-width="0.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </symbol>
  </svg>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref } from 'vue';

export default defineComponent({
  name: 'InfoItem',
  props: {
    fontWeight: { type: String as PropType<string>, required: false, default: 'normal' },
    background: { type: String as PropType<string>, required: false, default: '#ffffff' },
    padding: { type: String as PropType<string>, required: false, default: '0 10px' },
    width: { type: String as PropType<string>, required: false, default: 'auto' },
    openWidth: { type: String as PropType<string>, required: false, default: 'auto' },
    openHeight: { type: String as PropType<string>, required: false, default: 'auto' },
    maxWidth: { type: String as PropType<string>, required: false, default: 'auto' },
    minWidth: { type: String as PropType<string>, required: false, default: '50px' },
    margin: { type: String as PropType<string>, required: false, default: '0, 10px, 0 0' },
    height: { type: String as PropType<string>, required: false, default: '40px' },
    withIcon: { type: Boolean as PropType<boolean>, required: false, default: true },
    withOpenWindow: { type: Boolean as PropType<boolean>, required: false, default: true },
    colorSelected: { type: String as PropType<string>, required: false, default: '#1979CF' },
    borderColor: { type: String as PropType<string>, required: false, default: '#B0A4C0' },
    withHover: { type: Boolean as PropType<boolean>, required: false, default: true },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const hovering = ref(false);
    const isToggle: Ref<boolean> = ref(false);

    const changeState = () => {
      emit('click');
      if (props.withOpenWindow) {
        isToggle.value = !isToggle.value;
      } else {
        isToggle.value = false;
      }
    };

    return {
      hovering,
      isToggle,
      changeState,
    };
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/elements/base-style.scss';

.hidden {
  display: none;
}

.base-box {
  position: relative;
}

.body {
  border: $light-pink-border;
  border-radius: $normal-border-radius;
  position: relative;
  display: flex;
  justify-content: left;
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

.close-window {
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
}

.icon-top-title {
  width: 10px;
  height: 10px;
  stroke: #343e5c;
}

.open-window {
  z-index: 5;
  border-radius: $normal-border-radius;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  overflow: hidden;
  max-height: 130px;
  padding: 7px;
  width: calc(100% - 16px);
  margin-top: 5px;
}
</style>
