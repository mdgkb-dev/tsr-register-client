<template>
  <button
    class="button"
    :style="buttonStyle"
    :class="buttonClass"
    @click.prevent="changeState"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <div v-if="icon" class="button-icon" :style="buttonIconStyle">
      <svg :class="iconClass">
        <use :xlink:href="'#' + icon"></use>
      </svg>
    </div>
    <div class="text" :style="textStyle">
      {{ text }}
    </div>
    <Edit />
    <EditTitle />
    <Plus />
    <Del />
    <Filter />
    <Download />
    <Close />
  </button>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';

import Close from '@/assets/svg/Close.svg';
import Del from '@/assets/svg/Del.svg';
import Download from '@/assets/svg/Download.svg';
import Edit from '@/assets/svg/Edit.svg';
import EditTitle from '@/assets/svg/EditTitle.svg';
import Filter from '@/assets/svg/Filter.svg';
import Plus from '@/assets/svg/Plus.svg';

export default defineComponent({
  name: 'Button',
  components: {
    Edit,
    EditTitle,
    Plus,
    Del,
    Filter,
    Download,
    Close,
  },
  inheritAttrs: false,
  props: {
    // text: { type: String as PropType<string>, default: '', required: false },
    // color: { type: String as PropType<string>, default: 'inherit', required: false },
    // colorSwap: { type: Boolean as PropType<boolean>, default: false, required: false },
    // background: { type: String as PropType<string>, default: 'inherit', required: false },
    // backgroundHover: { type: String as PropType<string>, default: 'inherit', required: false },
    // margin: { type: String as PropType<string>, required: false, default: '' },
    // width: { type: String as PropType<string>, required: false, default: 'auto' },
    // height: { type: String as PropType<string>, required: false, default: '20px' },
    // borderRadius: { type: String as PropType<string>, required: false, default: '5px' },
    // border: { type: Boolean as PropType<boolean>, required: false, default: true },
    // withIcon: { type: Boolean as PropType<boolean>, required: false, default: false },
    // fontSize: { type: String as PropType<string>, required: false, default: '10px' },
    // toggleMode: { type: Boolean as PropType<boolean>, required: false, default: false },
    // buttonClass: { type: String as PropType<string>, required: false, default: '' },
    // iconClass: { type: String as PropType<string>, required: false, default: '' },
    // icon: { type: String as PropType<string>, required: false, default: '' },
    text: { type: String as PropType<string>, default: '', required: false },
    color: { type: String as PropType<string>, default: '', required: false },
    colorSwap: { type: Boolean as PropType<boolean>, default: false, required: false },
    background: { type: String as PropType<string>, default: '', required: false },
    backgroundHover: { type: String as PropType<string>, default: '', required: false },
    margin: { type: String as PropType<string>, required: false, default: '' },
    width: { type: String as PropType<string>, required: false, default: '' },
    height: { type: String as PropType<string>, required: false, default: '' },
    borderRadius: { type: String as PropType<string>, required: false, default: '' },
    border: { type: Boolean as PropType<boolean>, required: false, default: true },
    withIcon: { type: Boolean as PropType<boolean>, required: false, default: false },
    fontSize: { type: String as PropType<string>, required: false, default: '' },
    toggleMode: { type: Boolean as PropType<boolean>, required: false, default: false },
    buttonClass: { type: String as PropType<string>, required: false, default: '' },
    iconClass: { type: String as PropType<string>, required: false, default: '' },
    icon: { type: String as PropType<string>, required: false, default: '' },
    isToggle: { type: Boolean as PropType<boolean>, required: false, default: false },
    inverse: { type: Boolean as PropType<boolean>, required: false, default: false },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const hovering = ref(false);
    const changeState = () => {
      emit('click');
    };

    const buttonIsActive = computed(() => props.isToggle || hovering.value);
    const getActiveColor = (active: string, inactive: string): string => {
      return buttonIsActive.value ? active : inactive;
    };

    const getInvertedColor = (): string => {
      return props.colorSwap ? getActiveColor(props.background, props.color) : props.color;
    };

    const buttonStyle = computed(() => {
      return {
        color: props.toggleMode ? getActiveColor(props.color, '#B0A4C0') : getInvertedColor(),
        background: props.colorSwap
          ? getActiveColor(props.color, props.background)
          : getActiveColor(props.backgroundHover, props.background),
        margin: props.margin,
        minWidth: props.width,
        maxWidth: props.width,
        border: props.border ? '' : 'none',
        borderColor: props.toggleMode ? getActiveColor(props.color, '#B0A4C0') : props.color,
        height: props.height,
        borderRadius: props.borderRadius,
        fontSize: props.fontSize,
      };
    });

    const getAnimation = (): string => {
      return props.colorSwap || props.toggleMode
        ? getActiveColor(props.backgroundHover, props.background)
        : getActiveColor('scale(1.1, 1.1)', '');
    };

    const buttonIconStyle = computed(() => {
      return {
        fill: props.color,
        marginRight: props.text ? '10px' : '',
        transform: getAnimation(),

        transition: props.colorSwap || props.toggleMode ? '' : '0.2s',
      };
    });

    const textStyle = computed(() => {
      return {
        transform: getAnimation(),
        transition: props.colorSwap || props.toggleMode ? '' : '0.2s',
      };
    });

    return {
      buttonIconStyle,
      buttonStyle,
      textStyle,
      hovering,
      changeState,
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
