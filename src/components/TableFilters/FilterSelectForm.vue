<template>
  <component :is="'FilterPopover'">
    <div class="filter-form">
      <el-form label-position="top">
        <el-form-item v-for="(item, index) in selectList" :key="index" :label="item.title">
          <el-select size="mini" :placeholder="item.title">
            <el-option v-for="(option, optionIndex) in item.options" :key="optionIndex" :label="option" :value="option"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import FilterPopover from '@/components/TableFilters/FilterPopover.vue';
import ISelectFilter from '@/interfaces/filters/ISelectFilter';

export default defineComponent({
  name: 'FilterSelectForm',
  components: { FilterPopover },
  props: {
    selectList: {
      type: Array as PropType<ISelectFilter[]>,
      default: () => [],
    },
  },
});
</script>

<style lang="scss" scoped>
// @import '@/assets/elements/filterForm.scss';
</style>
