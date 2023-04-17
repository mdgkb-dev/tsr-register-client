<template>
  <!--  <component :is="'FilterPopover'" :filter-model="filterModel" @addFilterModel="addFilterModel" @dropFilterModel="dropFilterModel">-->
  <!--    <div class="filter-form">-->
  <!--      <el-form label-position="top">-->
  <!--        <el-form-item>-->
  <!--          <div v-for="select in selectList" :key="select">-->
  <!--            <el-select v-model="filterModel.value1" size="mini" :placeholder="select.title" @click="setTrigger('manual')">-->
  <!--              <el-option-->
  <!--                v-for="(option, optionIndex) in select.options"-->
  <!--                :key="optionIndex"-->
  <!--                :label="option.label"-->
  <!--                :value="option.value"-->
  <!--                @click="setTrigger('click')"-->
  <!--              ></el-option>-->
  <!--            </el-select>-->
  <!--          </div>-->
  <!--        </el-form-item>-->
  <!--      </el-form>-->
  <!--    </div>-->
  <!--  </component>-->
</template>

<script lang="ts">
import { defineComponent, PropType, ref, toRefs } from 'vue';
import { useStore } from 'vuex';

// import FilterPopover from '@/components/TableFilters/FilterPopover.vue';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import ISelectFilter from '@/interfaces/filters/ISelectFilter';
import { Operators } from '@/interfaces/filters/Operators';
import FilterModel from '@/services/classes/filters/FilterModel';

export default defineComponent({
  name: 'FilterSelectForm',
  // components: { FilterPopover },
  props: {
    table: {
      type: String as PropType<string>,
      default: '',
    },
    col: {
      type: String as PropType<string>,
      default: '',
    },
    selectList: {
      type: Array as PropType<ISelectFilter[]>,
      default: () => [],
    },
  },
  setup(props) {
    const { table, col } = toRefs(props);
    const store = useStore();
    const filterModel = ref(FilterModel.CreateFilterModel(table.value, col.value, DataTypes.String));
    filterModel.value.operator = Operators.Eq;

    const setTrigger = (trigger: string) => {
      store.commit('filter/setTrigger', trigger);
    };
    const addFilterModel = () => {
      store.commit('filter/setFilterModel', filterModel.value);
    };

    const dropFilterModel = () => {
      store.commit('filter/spliceFilterModel', filterModel.value.id);
      filterModel.value = FilterModel.CreateFilterModel(table.value, col.value, DataTypes.String);
      filterModel.value.operator = Operators.Eq;
    };

    return {
      dropFilterModel,
      addFilterModel,
      filterModel,
      setTrigger,
    };
  },
});
</script>

<style lang="scss" scoped>
// @import '@/assets/elements/filterForm.scss';
</style>
