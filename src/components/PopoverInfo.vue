<template>
  <el-popover placement="top-start" :title="title" width="auto" trigger="hover" :content="content">
    <template #reference>
      <i style="margin-left: 10px" class="custom-icon el-icon-question"></i>
    </template>
  </el-popover>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  name: 'PopoverInfo',
  props: ['content', 'title'],
})
export default class PopoverInfo extends Vue {
  content!: string;
  title!: string;
}
</script>

<style>
.custom-icon {
  font-size: 1.2rem;
  margin-left: 3px !important;
}
</style>
