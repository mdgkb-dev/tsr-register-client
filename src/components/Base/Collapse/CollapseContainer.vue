<template>
  <div>
    <slot :activeIdx="activeIdx" :changeActiveId="changeActiveId" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  name: 'CollapseContainer',
  props: {
    initActiveIdx: { type: Number as PropType<number>, default: 0 },
  },
  setup(props) {
    const activeIdx = ref(props.initActiveIdx);
    const changeActiveId = (idx: number) => {
      activeIdx.value = idx;
    };

    return {
      changeActiveId,
      activeIdx,
    };
  },
});
</script>
