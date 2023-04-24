<template>
  <div class="mainblock">
    <div
      class="slider-block"
      :style="{
        marginRight: isToggle ? '110px' : '-231px',
        width: sliderOnWidth,
        minHeight: sliderOffWidth,
      }"
    >
      <div
        class="slider-icon"
        :style="{
          border: isToggle ? '1px solid #379FFF' : '1px solid #00B5A4',
          background: isToggle ? '#ffffff' : '#C7ECEA',

        }"
        @click="toggleSlider(!isToggle)"
        @mouseenter="hovering = true"
        @mouseleave="hovering = false"
      >
        <div
          class="icon-block"
          :style="{
            transform: hovering ? (isToggle ? 'rotate(-225deg) scale(1.2, 1.2)' : 'rotate(0deg) scale(1.2, 1.2)') : (isToggle ? 'rotate(-225deg)' : 'rotate(0deg)'),
            fill: isToggle ? '#379FFF' : '#00B5A4',
          }"
        >
          <slot name="icon" />
        </div>
      </div>

      <div class="slider-body">
        <slot name="slider-body" />
      </div>
    </div>

    <div class="body-block">
      <slot name="body" />
    </div>

    <div class="tab-block">
      <slot name="tabs" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  name: 'RightTabsContainer',
  props: {
    sliderOffWidth: {
      type: String as PropType<string>,
      required: false,
      default: '92px',
    },
    sliderOnWidth: {
      type: String as PropType<string>,
      required: false,
      default: '332px',
    },
    background: {
      type: String as PropType<string>,
      required: false,
      default: 'inherit',
    },
    isToggle: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: false,
    },
  },
  emits: ['toggle'],
  setup(props, { emit }) {
    const toggleSlider = (toggle: boolean) => {
      emit('toggle', toggle);
    };
    const hovering = ref(false);

    return {
      toggleSlider,
      hovering,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

.mainblock {
  position: relative;
  display: flex;
  justify-content: left;
  width: auto;
  height: 100%;
  padding: 0;
  background: $custom-background;
  overflow: hidden;
}

.slider-block {
  position: absolute;
  top: 8px;
  right: 0px;
  display: flex;
  justify-content: left;
  cursor: pointer;
  z-index: 10;
  transition: 0.3s;
}

.slider-icon {
  min-width: 91px;
  height: 91px;
  margin-right: 10px;
  border-radius: $normal-border-radius;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  // text-align: center;
}

.icon-block {
  display: flex;
  justify-content: center;
  align-items: center;
  // text-align: center;
  transition: 0.3s;
}

.slider-body {
  width: auto;
}

.tab-block {
  width: 110px;
  background: $custom-background;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-top: 109px;
}

.body-block {
  position: relative;
  width: calc(100% - 110px);
  height: 100%;
  background: $custom-background;
}

@media screen and (max-width: 600px) {
  .mainblock {
    padding: 10px 0;
  }
}
</style>
