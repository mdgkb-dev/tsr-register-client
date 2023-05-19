<template>
  <div class="tab"
    :style="{
      marginTop: marginTop
    }"
  >
    <svg v-if="isCollaps && collapsed" class="icon-arrow" @click="handleItemClick">
      <use xlink:href="#arrow-down"></use>
    </svg>
    <svg v-else-if="isCollaps && !collapsed" class="icon-arrow" @click="handleItemClick">
      <use xlink:href="#arrow-up"></use>
    </svg>
    <label :for="tabId" @click="handleItemClick">
      <div 
        :style="{ 
          cursor: isCollaps ? 'pointer' : 'default', 
          background: changeColor ? background : backgroundAttention, 
          padding: isCollaps ? '' : padding,
        }" 
        class="tab-name">
        <div class="inside-icon">
          <slot name="icon" />
        </div>
        <div v-if="title" class="title-in">
          {{ title }}
        </div>
        <div v-else class="title-in">
          <slot  name="inside-title" />
        </div>
        <div class="tools-bar" :class="{ 'hidden-part': showToolsOnHover }">
          <slot name="tools" />
        </div>
      </div>
    </label>
    <div :style="{ maxHeight: isCollaps ? '' : '1000000vh', background: changeColor ? background : backgroundAttention, }" :class="collapsed ? 'tab-content-down' : 'tab-content-up'">
      <slot name="inside-content" />
    </div>
  </div>
  <!-- <Arrows /> -->
  <svg width="0" height="0" class="hidden">
    <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" id="arrow-down">
      <path d="M5 6L10 11L15 6L17 7L10 14L3 7L5 6Z"></path>
    </symbol>

    <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" id="arrow-up">
      <path d="M15 14L10 9L5 14L3 13L10 6L17 13L15 14Z"></path>
    </symbol>
  </svg>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onUpdated, PropType, Ref, ref } from 'vue';

// import Arrows from '@/assets/svg/CollapseItem/Arrows.svg';

export default defineComponent({
  name: 'CollapseItem',
  // components: { Arrows },
  props: {
    tabId: { type: Number as PropType<number>, required: false },
    activeId: { type: Number as PropType<number>, default: 0 },
    isCollaps: { type: Boolean as PropType<boolean>, default: true },
    title: { type: String as PropType<string>, default: '' },
    showToolsOnHover: { type: Boolean as PropType<boolean>, default: true },
    background: {type: String as PropType<string>, required: false, default: '#ffffff'},
    backgroundAttention: {type: String as PropType<string>, required: false, default: '#ffffff'},
    changeColor: { type: Boolean as PropType<boolean>, default: false },
    marginTop: { type: String as PropType<string>, default: '10px' },
    padding: { type: String as PropType<string>, default: '0 10px' },
  },
  emits: ['changeActiveId'],

  setup(props, { emit }) {
    const collapsed: Ref<boolean> = ref(false);

    const handleItemClick = () => {
      collapsed.value = !collapsed.value;
      emit('changeActiveId', props.tabId);
    };

    onUpdated(() => {
      if (props.activeId && props.activeId !== props.tabId) {
        collapsed.value = true;
      }
    });

    onBeforeMount(() => {
      if (props.activeId && props.activeId !== props.tabId) {
        collapsed.value = true;
      }
    });

    return {
      collapsed,
      handleItemClick,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

.hidden {
  display: none;
}

.tab {
  position: relative;
  width: calc(100% - 12px);
  overflow: hidden;
  border: $light-pink-border;
  border-radius: $normal-border-radius;
  background: #ffffff;
  margin: 10px 8px 2px 2px;
  cursor: pointer;
  transition: 0.15s;

  &-name {
    position: relative;
    display: flex;
    height: 60px;
    align-items: center;
    font-weight: bold;
    padding: 0 20px;
  }
}

.tab input {
  position: absolute;
  opacity: 0;
  z-index: -1;
}

.tab-content-down {
  max-height: 0;
  overflow: hidden;
  background: #ffffff;
  -webkit-transition: max-height 0.03s;
  -o-transition: max-height 0.03s;
  transition: max-height 0.03s;
  color: #343e5c;
  // padding: 0 5px;
}

.tab-content-up {
  max-height: 500vh;
  overflow-y: scroll;
  overflow: hidden;
  background: #ffffff;
  -webkit-transition: max-height 0.5s;
  -o-transition: max-height 0.5s;
  transition: max-height 0.5s;
  color: #343e5c;
  // padding-right: 5px;
}

.tab input:checked ~ .icon-arrow {
  transform: rotate(180deg);
}

.tab input:checked ~ .tab-content-down {
  max-height: 100vh;
  // overflow: hidden;
  // overflow-y: scroll;
}

.tab input:checked ~ .tab-content-up {
  max-height: 0;
}

.tab label::after {
  position: absolute;
  right: 0;
  top: 0;
  display: block;
  text-align: center;
  -webkit-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
}

.tab-window {
  width: 100%;
}

.hidden {
  display: none;
}

.icon-arrow {
  position: absolute;
  right: 20px;
  top: 20px;
  width: 28px;
  height: 28px;
  fill: $site_dark_gray;
  -webkit-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
  fill: $site_dark_gray;
  z-index: 2;
}
:deep(.el-carousel__item) {
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
:deep(.el-carousel__container) {
  max-height: auto;
}

.hidden-part {
  visibility: hidden;
  opacity: 0;
}

.tools-bar {
  display: flex;
  position: absolute;
  top: 20px;
  right: 60px;
  justify-content: space-between;
  align-items: center;
}

.inside-icon {
  display: flex;
  position: absolute;
  top: 20px;
  left: 0px;
  align-items: center;
  padding-left: 4px;
}

.tab-name:active > .tools-bar {
  visibility: visible;
  opacity: 1;
}

.tab-name {
  width: calc(100% - 12px);
  padding-left: 10px;
}

.tab-name:hover > .tools-bar {
  visibility: visible;
  opacity: 1;
}

.tab:hover {
  box-shadow: 0px 0px 1px 2px #1979CF;
}

.title-in {
  width: calc(100% - 8px);
  display: flex;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  color: #303133;
  height: 60px;
  align-items: center;
  font-weight: normal;
}
</style>
