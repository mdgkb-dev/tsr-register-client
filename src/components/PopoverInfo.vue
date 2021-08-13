<template>
  <el-popover placement="top-start" :title="title" width="auto" trigger="hover" :content="content">
    <template #reference>
      <i style="margin-left: 10px" class="custom-icon el-icon-question"></i>
    </template>
  </el-popover>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'PopoverInfo',
  props: {
    content: {
      type: String as PropType<string>,
      required: true,
    },
    title: {
      type: String as PropType<string>,
      required: true,
    },
  },
});
</script>

<style>
.custom-icon {
  font-size: 1.2rem;
  margin-left: 3px !important;
}
</style>
