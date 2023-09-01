<template>
  <div
    class="top-slider"
    :style="{
      marginTop: isToggle ? `calc(${sliderOffHeight} - ${sliderOnHeight})` : `0`,
      height: sliderOnHeight,
    }"
  >
    <div class="top-slider-content">
      <div class="center">
        <slot />
      </div>
    </div>
    <div class="click-line" @click="toggleSlider(!isToggle)"
      :style="{
        height: sliderOffHeight,
      }"
    >
      <slot name="title" />
    </div>
  </div>
</template>

<script lang="ts">
import { watch } from '@vue/runtime-core';
import { defineComponent, PropType, ref } from 'vue';

import StringItem from '@/services/components/StringItem.vue';

export default defineComponent({
  name: 'TopSliderContainer',
  components: {
    StringItem,
  },
  props: {
    sliderOffHeight: {
      type: String as PropType<string>,
      required: false,
      default: '53px',
    },
    sliderOnHeight: {
      type: String as PropType<string>,
      required: false,
      default: '220px',
    },
    background: {
      type: String as PropType<string>,
      required: false,
      default: 'inherit',
    },
    toggle: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  emits: ['toggle'],
  setup(props, { emit }) {
    const isToggle = ref(true);
    watch(
      () => props.toggle,
      () => {
        isToggle.value = !isToggle.value;
      }
    );

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

* {
  box-sizing: border-box;
}

.top-slider {
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  background: #f5f5f5;
  z-index: 3;
  border: $dark-border;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
  transition: 0.3s;
  width: calc(100% - 300px);
  max-width: 500px;
}

.top-slider-content {
  max-width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 53px);
  margin: auto;
}

.center {
  width: 100%;
}

.click-line {
  width: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
  min-height: 40px;
  color: #343e5c;
  font-size: 14px;
  text-transform: uppercase;
  border-top: $normal-darker-border;
  cursor: pointer;
  padding: 0 10px;
}

@media screen and (max-width: 820px) {
  .top-slider {
    height: 65vh;
  }
}

@media screen and (max-width: 500px) {
  .top-slider {
    height: 55vh;
  }
}

@media screen and (max-width: 339px) {
  .top-slider {
    height: 35vh;
  }
}
</style>
