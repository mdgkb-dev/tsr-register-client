<template>
  <div class="grid-block"
    :style="{
      maxWidth: maxWidth,
      background: background,
      gridGap: gridGap,
      gridTemplateRows: gridTemplateRows,
      gridTemplateColumns: gridTemplateColumns,
      marginTop: marginTop,
    }"
  >
    <slot name="grid-items" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'GridContainer',
  props: {
    maxWidth: {
      type: String as PropType<string>,
      required: false,
      default: '100%',
    },
    background: {
      type: String as PropType<string>,
      required: false,
      default: 'inherit',
    },
    gridGap: {
      type: String as PropType<string>,
      required: false,
      default: '10px',
    },
    gridTemplateColumns: {
      type: String as PropType<string>,
      required: false,
      default: 'repeat(auto-fit, minmax(250px, 1fr))',
    },
    gridTemplateRows: {
      type: String as PropType<string>,
      required: false,
      default: 'repeat(0 0px)',
    },

    marginTop: {
      type: String as PropType<string>,
      required: false,
      default: '10px',
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

.grid-block {
  width: auto;
  height: auto;
  display: grid;
  margin-left: auto;
  margin-right: auto;
}

// .grid-block-item {
//   position: relative;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 250px;
//   height: 40px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   cursor: pointer;
//   transition: 0.3s;
//   padding: 10px;
//   background: #ffffff;
//   border-radius: $normal-border-radius;
//   border: $custom-border;
//   text-align: center;
//   overflow: hidden;
// }

</style>
