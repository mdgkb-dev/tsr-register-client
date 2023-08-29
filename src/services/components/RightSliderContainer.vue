<template>
  <div class="right-slider"
    :style="{
      marginRight: isToggle ? `calc(${sliderOffWidth} - ${sliderOnWidth})`  : `0`,
      width: sliderOnWidth,
    }"
  >
    <div class="green-line" @click="toggleSlider(!isToggle)">
      <StringItem v-if="isToggle" string="Показать список исследований" font-size="14px" padding="0" color="#00bea5" />
      <StringItem v-if="!isToggle" string="Скрыть список исследований" font-size="14px" padding="0" color="#00bea5" />
    </div>
    <div class="right-slider-content">
      <slot />
    </div>
    <div class="right-slider-button">
      <slot name="button" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, PropType, ref } from 'vue';

import StringItem from '@/services/components/StringItem.vue';
import Button from '@/components/Base/Button.vue'

export default defineComponent({
  name: 'RightSliderContainer',
  components: {
    StringItem,
    Button,
  },
  props: {
    sliderOffWidth: {
      type: String as PropType<string>,
      required: false,
      default: '30px',
    },
    sliderOnWidth: {
      type: String as PropType<string>,
      required: false,
      default: '260px',
    },
    background: {
      type: String as PropType<string>,
      required: false,
      default: 'inherit',
    },
  },
  emits: ['toggle'],
  setup(props, { emit }) {
    const mounted = ref(false);
    const isToggle = ref(false);
    const mobileWindow = ref(window.matchMedia('(max-width: 768px)').matches);
    const toggleSlider = (toggle: boolean) => {
      isToggle.value = !isToggle.value;
      emit('toggle', toggle);
    };
    const hovering = ref(false);

    return {
      toggleSlider,
      hovering,
      mobileWindow,
      isToggle,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

.right-slider {
  position: absolute;
  display: flex;
  top: 10px;
  right: 0px;
  background: #f5f5f5;
  z-index: 2;
  height: calc(100% - 80px);
  border: $dark-border;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
  transition: 0.3s;
}

.green-line {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 100%;
  writing-mode: vertical-lr;
  background: #C1EFEB;
  cursor: pointer;
  border-right: $normal-darker-border;
}

.right-slider-content {
  margin: 10px 3px 60px 7px;
  overflow: hidden;
  overflow-y: auto;
  width: 100%;
  height: calc(100% - 90px);
}

.right-slider-button {
  position: absolute;
  bottom: 0;
  right: 0;
  height: 80px;
  width: calc(100% - 30px);
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
