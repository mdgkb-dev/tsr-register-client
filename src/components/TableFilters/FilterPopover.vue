<template>
  <div class="filter-popover">
    <el-popover v-model:visible="visible" placement="bottom-end" width="auto" trigger="click">
      <template #reference>
        <FilterFilled @click.stop="visible = !visible" />
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
import { defineComponent, Ref, ref } from 'vue';
export default defineComponent({
  name: 'FilterPopover',
  components: {
    FilterFilled,
  },
  setup() {
    const visible: Ref<boolean> = ref(false);

    return {
      visible,
    };
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
// Чтобы скрыть фильтры
.filter-popover {
  display: none;
  position: absolute;
}
</style>
