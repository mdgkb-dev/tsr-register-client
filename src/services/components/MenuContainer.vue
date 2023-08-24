<template>
  <div
    class="mainblock"
    :style="{
      height: height
    }"
  >
    <div
      class="top-menu"
      :style="{
        gridTemplateColumns: `repeat(auto-fit, minmax(${minMenuItemWidth}, 1fr))`,
      }"
    >
      <slot name="menu" />
    </div>
    <div
      class="body"
      :style="{
        background: background
      }"
    >
      <slot name="body" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'MenuContainer',
  props: {
    height: {
      type: String as PropType<string>,
      required: false,
      default: '',
    },
    minMenuItemWidth: {
      type: String as PropType<string>,
      required: false,
      default: '150px',
    },
    background: {
      type: String as PropType<string>,
      required: false,
      default: '#ffffff',
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

.mainblock {
  display: block;
  border-radius: $big-border-radius;
  border: $custom-border;
  overflow: hidden;
  margin: 0 10px 0 0;
  height: 100%;
}

.top-menu {
  margin: -1px;
  display: grid;
  grid-gap: 0;
  grid-template-rows: repeat(0 0px);
}

.top-menu > div {
  object-fit: cover;
}

.body {
  margin-top: 1px;
  border-top: 0.5px solid #343d5c;
  overflow-y: auto;
  height: 100%;
}

@media (max-width: 992px) {
  .mainblock {
    margin: 0 10px;
    width: calc(100% - 22px);
  }
}
</style>
