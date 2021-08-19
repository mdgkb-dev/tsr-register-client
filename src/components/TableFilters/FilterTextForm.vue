<template>
  <component :is="'FilterPopover'">
    <div class="filter-form">
      <el-form label-position="top">
        <el-form-item v-for="(item, index) in filterList" :key="index" :label="item.label">
          <el-input size="mini" :placeholder="item.label + '...'" />
        </el-form-item>
      </el-form>
    </div>
  </component>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';

import FilterPopover from '@/components/TableFilters/FilterPopover.vue';
import IOption from '@/interfaces/shared/IOption';

export default defineComponent({
  name: 'FilterTextForm',
  components: { FilterPopover },

  setup() {
    const filterList: Ref<IOption[]> = ref([
      { label: 'Содержит', value: 'Содержит' },
      { label: 'Не содержит', value: 'Не содержит' },
      { label: 'Начинается с', value: 'Начинается с' },
      { label: 'Оканчивается на', value: 'Оканчивается на' },
    ]);

    return {
      filterList,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/filterForm.scss';
</style>
