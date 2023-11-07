<template>
  <el-tooltip v-if="parameter" class="item" effect="light" :content="parameter.recomendation" placement="top-end">
    <el-tag size="medium" :color="parameter.color" :style="{ 'margin-left': '5px', color: parameter.textColor }">
      {{ parameter.percentiles }}
    </el-tag>
  </el-tooltip>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import IColorPercentile from '@/interfaces/shared/IColorPercentile';

export default defineComponent({
  name: 'ColoredGroupTag',
  props: {
    parameter: {
      type: [Object, Boolean] as PropType<IColorPercentile>,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/pageInfo.scss';
</style>
