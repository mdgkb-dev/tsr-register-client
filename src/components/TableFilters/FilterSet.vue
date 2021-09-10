<template>
  <component :is="'FilterPopover'" @addFilterModel="addFilterModel" @dropFilterModel="dropFilterModel">
    <div class="filter-form">
      <el-form label-position="top">
        <el-form-item>
          <el-select
            v-model="filterModel.set"
            multiple
            filterable
            remote
            reserve-keyword
            placeholder="Выберите диагноз"
            :remote-method="find"
            :loading="loading"
            @click="setTrigger('manual')"
          >
            <el-option v-for="item in diagnosis" :key="item.value" :label="item.label" :value="item.value" @click="setTrigger('click')" />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </component>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, PropType, Ref, ref, toRefs } from 'vue';
import { useStore } from 'vuex';

import FilterModel from '@/classes/filters/FilterModel';
import FilterPopover from '@/components/TableFilters/FilterPopover.vue';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import { Operators } from '@/interfaces/filters/Operators';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IOption from '@/interfaces/shared/IOption';

export default defineComponent({
  name: 'FilterSet',
  components: { FilterPopover },
  props: {
    table: {
      type: String as PropType<string>,
      default: '',
    },
    col: {
      type: String as PropType<string>,
      default: '',
    },
    joinTable: {
      type: String as PropType<string>,
      default: '',
    },
    joinTableFk: {
      type: String as PropType<string>,
      default: '',
    },
    joinTablePk: {
      type: String as PropType<string>,
      default: '',
    },
  },
  setup(props) {
    const { table, col, joinTable, joinTablePk, joinTableFk } = toRefs(props);
    const store = useStore();
    const loading = ref(false);
    const filteredDiagnosis: ComputedRef<IMkbDiagnosis[]> = computed(() => store.getters['mkb/filteredDiagnosis']);
    const mkbDiagnosis: ComputedRef<IMkbDiagnosis[]> = computed(() => store.getters['mkb/mkbDiagnosis']);
    let diagnosis: Ref<IOption[]> = ref([]);
    const filterModel = ref(
      FilterModel.CreateFilterModelWithJoin(table.value, col.value, joinTable.value, joinTablePk.value, joinTableFk.value, DataTypes.Set)
    );
    filterModel.value.operator = Operators.In;

    const setTrigger = (trigger: string) => {
      store.commit('filter/setTrigger', trigger);
    };
    const addFilterModel = () => {
      store.commit('filter/setFilterModel', filterModel.value);
    };

    const dropFilterModel = () => {
      store.commit('filter/spliceFilterModel', filterModel.value.id);
      filterModel.value = FilterModel.CreateFilterModelWithJoin(
        table.value,
        col.value,
        joinTable.value,
        joinTablePk.value,
        joinTableFk.value,
        DataTypes.Set
      );
      filterModel.value.operator = Operators.In;
    };

    const find = async (query: string): Promise<void> => {
      loading.value = true;
      if (query.length > 2) {
        diagnosis.value = [];
        await store.dispatch('mkb/searchDiagnosis', query);
        console.log(mkbDiagnosis.value);
        mkbDiagnosis.value.forEach((d: IMkbDiagnosis) => {
          if (d.id) diagnosis.value.push({ value: d.id, label: d.getFullName() });
        });
      }
      loading.value = false;
    };

    return {
      diagnosis,
      loading,
      filteredDiagnosis,
      mkbDiagnosis,
      find,
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
