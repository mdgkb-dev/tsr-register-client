<template>
  <div v-if="isToggle" class="blur" @click="isToggle = false"></div>
  <div class="base-box" :style="baseBoxStyle" @click.prevent.stop="changeState()">
    <div class="body" :style="bodyStyle" @mouseenter="withHover ? (hovering = true) : (hovering = false)" @mouseleave="hovering = false">
      <div class="close-window" :style="closeWindowStyle">
        <slot name="close-inside-content" />
      </div>
      <div class="open-window" :style="openWindowStyle">
        <slot name="open-inside-content" />
      </div>
      <div class="top-title" :style="topTitleStyle">
        <svg class="icon-top-title" :style="iconTopTitleStyle">
          <use xlink:href="#iconamoon_edit-light"></use>
        </svg>
        <slot name="title">
          <StringItem :string="title" font-size="10px" padding="0 0 0 3px" />
        </slot>
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
import { computed, defineComponent, PropType, Ref, ref } from 'vue';

import StringItem from '@/components/admin/Patients/StringItem.vue';

export default defineComponent({
  name: 'InfoItem',
  components: {
    StringItem,
  },
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
    title: { type: String as PropType<string>, required: false, default: '' },
    customClass: { type: String as PropType<string>, required: false, default: '' },
    close: { type: Boolean as PropType<boolean>, required: false, default: true },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const hovering = ref(false);

    const isToggle: Ref<boolean> = ref(false);
    const localClose: Ref<boolean> = ref(props.close);

    const changeState = () => {
      console.log(isToggle.value);
      emit('click');
      if (props.withOpenWindow) {
        isToggle.value = true;
      } else {
        isToggle.value = false;
      }
      if (localClose.value !== props.close) {
        isToggle.value = false;
        localClose.value = !localClose.value;
      }
    };

    const baseBoxStyle =
      props.customClass === ''
        ? {
            width: props.width,
            height: props.height,
            maxWidth: props.maxWidth,
            minWidth: props.minWidth,
          }
        : undefined;

    const windowOpened = computed(() => isToggle.value && props.withOpenWindow);

    const bodyStyle = computed(() => {
      return {
        background: props.background,
        zIndex: windowOpened.value ? '5' : '0',
        padding: windowOpened.value ? '0' : props.padding,
        margin: props.margin,
        width: windowOpened.value ? props.openWidth : props.width,
        height: windowOpened.value ? props.openHeight : props.height,
        minHeight: props.height,
        maxWidth: props.maxWidth,
        minWidth: props.minWidth,
        borderColor: hovering.value || isToggle.value ? props.colorSelected : props.borderColor,
        color: hovering.value ? props.colorSelected : '#343E5C',
        boxShadow: hovering.value || isToggle.value ? `0px 0px 1px 1px ${props.colorSelected}` : 'none',
        alignItems: windowOpened.value ? 'end' : 'center',
        cursor: props.withHover ? 'pointer' : 'pointer',

      };
    });

    const closeWindowStyle = computed(() => {
      return {
        display: windowOpened.value ? 'none' : '',
        height: windowOpened.value ? '0' : '',
      };
    });

    const openWindowStyle = computed(() => {
      return {
        display: windowOpened.value ? 'flex' : 'none',
        height: windowOpened.value ? 'auto' : '0',
      };
    });

    const topTitleStyle = computed(() => {
      return {
        color: hovering.value ? props.colorSelected : '#343E5C',
        fill: hovering.value ? props.colorSelected : '#343E5C',
        background: props.background,
      };
    });

    const iconTopTitleStyle = computed(() => {
      return {
        stroke: hovering.value ? props.colorSelected : '#343E5C',
        display: props.withIcon ? '' : 'none',
      };
    });

    return {
      iconTopTitleStyle,
      topTitleStyle,
      openWindowStyle,
      closeWindowStyle,
      baseBoxStyle,
      bodyStyle,
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
  box-sizing: border-box;
}

.body {
  border: $light-pink-border;
  border-radius: $normal-border-radius;
  position: relative;
  display: flex;
  justify-content: left;
  transition: 0.15s;
  box-sizing: border-box;
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
  border-radius: $normal-border-radius;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  overflow: hidden;
  max-height: auto;
  padding: 7px;
  width: calc(100% - 16px);
  margin-top: 5px;
}

.blur {
  position: fixed;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 1;
  // background: #343e5c;
  // opacity: 0.2;
}

:deep(.el-input__inner) {
  border-color: #b0a4c0;
}
</style>
