<template>
  <component :is="'FilterPopover'">
    <div class="filter-form">
      <el-form label-position="top">
        <el-form-item label="Дата рождения">
          <el-select v-model="value" size="mini" placeholder="Выберите дату...">
            <el-option v-for="(item, index) in filterList" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
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
  name: 'FilterSelectForm',
  components: { FilterPopover },

  setup() {
    const filterList: Ref<IOption[]> = ref([
      { label: 'Равна', value: 'equals' },
      { label: 'Больше чем', value: 'greaterThan' },
      { label: 'Меньше чем', value: 'lessThan' },
      { label: 'Не равна', value: 'notEqual' },
      { label: 'В промежутке', value: 'inRange' },
    ]);
    const value: Ref<string> = ref('');

    return {
      filterList,
      value,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/filterForm.scss';
</style>
