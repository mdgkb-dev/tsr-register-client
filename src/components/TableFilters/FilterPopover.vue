<template>
  <span class="filter-popover">
    <el-popover v-model:visible="visible" placement="bottom-end" width="auto" :trigger="trigger" :popover-append-to-body="false">
      <template #reference>
        <FilterFilled :class="{ set: isSet }" />
      </template>
      <slot></slot>
      <el-button-group>
        <el-button size="mini" type="success" @click="setFilter">Применить</el-button>
        <el-button size="mini" @click="dropFilter">Сбросить</el-button>
      </el-button-group>
    </el-popover>
  </span>
</template>

<script lang="ts">
import { FilterFilled } from '@ant-design/icons-vue';
import { computed, defineComponent, Ref, ref } from 'vue';
import { useStore } from 'vuex';
export default defineComponent({
  name: 'FilterPopover',
  components: {
    FilterFilled,
  },
  props: {},
  emits: ['addFilterModel', 'dropFilterModel'],
  setup(props, { emit }) {
    const visible: Ref<boolean> = ref(false);
    const isSet: Ref<boolean> = ref(false);
    const store = useStore();
    const trigger: Ref<string> = computed(() => store.getters['filter/trigger']);
    const storeModule: string = store.getters['filter/storeModule'];
    const storeAction: string = store.getters['filter/storeAction'];

    const setFilter = async () => {
      emit('addFilterModel');
      await sendQueryAndClose();
    };

    const dropFilter = async () => {
      emit('dropFilterModel');
      isSet.value = true;
      await sendQueryAndClose();
    };

    const sendQueryAndClose = async () => {
      store.commit('filter/setOffset', 0);
      await store.dispatch(`${storeModule}/${storeAction}`, store.getters['filter/filterQuery']);
      store.commit(`pagination/setCurPage`, 1);
      visible.value = !visible.value;
      isSet.value = !isSet.value;
    };

    return {
      dropFilter,
      isSet,
      setFilter,
      trigger,
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
.set {
  color: #5cb6ff;
}
</style>
