<template>
  <div v-if="isToggle" class="blur">blur</div>
  <div class="base-box" :style="baseBoxStyle" @click.prevent.stop="changeState()">
    <div
      class="body"
      :class="insideClass"
      :style="bodyStyle"
      @mouseenter="withHover ? (hovering = true) : (hovering = false)"
      @mouseleave="hovering = false"
    >
      <div v-if="!isToggle" class="close-window" :style="closeWindowStyle" :class="customClass">
        <slot />
      </div>
      <div v-if="isToggle" id="info-item-opened-content" v-click-outside="outsideClick" class="open-window" :style="openWindowStyle">
        <slot name="open-inside-content" />
      </div>
      <div class="top-title" :style="topTitleStyle">
        <svg v-if="icon" class="icon-top-title" :style="iconTopTitleStyle">
          <use :xlink:href="'#' + icon"></use>
          <!--          <use xlink:href="#iconamoon_edit-light"></use>-->
        </svg>
        <slot name="title">
          <StringItem
            :string="title"
            font-size="10px"
            padding="0 0 0 3px"
            :style="{
              color: hovering ? '#006BB4' : '#c4c4c4',
              transition: '0.2s',
            }"
          />
        </slot>
      </div>
    </div>
  </div>
  <EditTitle />
  <Del />
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, PropType, Ref, ref, watch } from 'vue';

import Del from '@/assets/svg/Del.svg';
import EditTitle from '@/assets/svg/EditTitle.svg';
import StringItem from '@/components/admin/Patients/StringItem.vue';
export default defineComponent({
  name: 'InfoItem',
  components: {
    StringItem,
    EditTitle,
    Del,
  },
  props: {
    background: { type: String as PropType<string>, required: false, default: '' },
    padding: { type: String as PropType<string>, required: false, default: '' },
    width: { type: String as PropType<string>, required: false, default: '' },
    openWidth: { type: String as PropType<string>, required: false, default: 'auto' },
    openHeight: { type: String as PropType<string>, required: false, default: 'auto' },
    maxWidth: { type: String as PropType<string>, required: false, default: '' },
    minWidth: { type: String as PropType<string>, required: false, default: '' },
    margin: { type: String as PropType<string>, required: false, default: '' },
    height: { type: String as PropType<string>, required: false, default: '' },
    icon: { type: String as PropType<string>, required: false, default: '' },
    // withIcon: { type: Boolean as PropType<boolean>, required: false, default: true },
    withOpenWindow: { type: Boolean as PropType<boolean>, required: false, default: true },
    colorSelected: { type: String as PropType<string>, required: false, default: '#1979CF' },
    borderColor: { type: String as PropType<string>, required: false, default: '#E3E3E3' },
    withHover: { type: Boolean as PropType<boolean>, required: false, default: true },
    title: { type: String as PropType<string>, required: false, default: '' },
    customClass: { type: String as PropType<string>, required: false, default: '' },
    close: { type: Boolean as PropType<boolean>, required: false, default: true },
  },
  emits: ['click', 'keyup-enter'],
  setup(props, { emit }) {
    const insideClass = props.customClass !== '' ? props.customClass : 'inside-class';

    const hovering = ref(false);

    const isToggle: Ref<boolean> = ref(false);
    const localClose: Ref<boolean> = ref(props.close);

    watch(
      () => props.close,
      () => {
        console.log('close');
        isToggle.value = false;
      }
    );

    const keysHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        isToggle.value = false;
      }
      if (e.key === 'Enter') {
        emit('keyup-enter');
        isToggle.value = false;
      }
    };

    watch(isToggle, async () => {
      await nextTick();
      if (isToggle.value) {
        document.getElementById('info-item-opened-content')?.querySelector('input')?.focus();
        document.body.addEventListener('keydown', keysHandler);
      } else {
        document.body.removeEventListener('keydown', keysHandler, false);
      }
    });

    const changeState = () => {
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
            height: '40px',
            maxWidth: props.maxWidth,
            minWidth: props.minWidth,
          }
        : undefined;

    const windowOpened = computed(() => isToggle.value && props.withOpenWindow);

    const bodyStyle = computed(() => {
      return {
        background: props.background ? props.background : undefined,
        zIndex: windowOpened.value ? '2' : '0',
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
        height: windowOpened.value ? '0' : '',
      };
    });

    const openWindowStyle = computed(() => {
      return {
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
      };
    });

    const outsideClick = () => {
      isToggle.value = false;
    };

    return {
      outsideClick,
      windowOpened,
      insideClass,
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

.inside-class {
  font-weight: normal;
  background: #ffffff;
  padding: 0 10px;
  width: auto;
  max-width: auto;
  min-width: 50px;
  margin: 0;
  height: 40px;
}

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
