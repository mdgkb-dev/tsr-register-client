<template>
  <div class="grid-block" :style="style" :class="customClass">
    <slot />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'GridContainer',
  props: {
    maxWidth: {
      type: String as PropType<string>,
      required: false,
      default: '100%',
    },
    width: {
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
    margin: {
      type: String as PropType<string>,
      required: false,
      default: '10px 0 0 0',
    },
    customClass: { type: String as PropType<string>, required: false, default: '' },
  },
  setup(props, { emit }) {
    const style = computed(() => {
      return {
        maxWidth: props.maxWidth,
        width: props.width,
        background: props.background,
        gridGap: props.gridGap,
        gridTemplateColumns: props.gridTemplateColumns,
        gridTemplateRows: props.gridTemplateRows,
        margin: props.margin,
      };
    });

    return {
      style,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

.grid-block {
  height: auto;
  display: grid;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
}

// .grid-block > div {
//   max-width: 290px;
//   min-width: 120px;
//   object-fit: cover;
// }
</style>
