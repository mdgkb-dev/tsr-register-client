<template>
  <div class="filter-popover">
    <el-popover placement="bottom-end" width="auto" trigger="click">
      <template #reference>
        <FilterFilled />
      </template>
      <slot></slot>
      <el-button-group>
        <el-button size="mini" type="success">Применить</el-button>
        <el-button size="mini">Сбросить</el-button>
      </el-button-group>
    </el-popover>
  </div>
</template>

<script lang="ts">
import { FilterFilled } from '@ant-design/icons-vue';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'FilterPopover',
  components: {
    FilterFilled,
  },
});
</script>

<style lang="scss" scoped>
.anticon {
  margin: 4px 2px 2px 2px;
  &:hover {
    color: #5cb6ff;
  }
}
// Временно скрыты
.filter-popover {
  display: none;
  position: absolute;
}
</style>
