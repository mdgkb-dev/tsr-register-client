<template>
  <el-popover placement="top-start" width="auto" trigger="hover" :content="content">
    <template #reference>
      <el-icon ::size="20">
        <QuestionFilled />
      </el-icon>
    </template>
  </el-popover>
</template>

<script lang="ts">
import { QuestionFilled } from '@element-plus/icons-vue';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'PopoverInfo',
  components: { QuestionFilled },
  props: {
    content: {
      type: String as PropType<string>,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
:deep(.el-icon) {
  margin-left: 3px !important;
}
</style>
