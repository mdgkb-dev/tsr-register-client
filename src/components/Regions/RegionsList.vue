<template>
  <div v-if="mount" class="wrapper" style="height: 100%; overflow: hidden">
    <div class="table-background">
      <el-table
        :default-sort="{ prop: 'id', order: 'ascending' }"
        :data="regions"
        class="table-shadow"
        header-row-class-name="header-style"
        row-class-name="no-hover"
        style="width: 100%; margin-bottom: 20px; max-height: calc(100vh - 310px); overflow: auto"
      >
        <el-table-column type="index" width="60" align="center" />
        <el-table-column prop="name" label="Название" min-width="150" />
        <el-table-column width="50" fixed="right" align="center">
          <template #default="scope">
            <el-space direction="vertical" class="icons">
              <TableButtonGroup
                :show-edit-button="true"
                :show-remove-button="true"
                @edit="edit(scope.row.id)"
                @remove="remove(scope.row.id)"
              />
            </el-space>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import MainHeader from '@/classes/shared/MainHeader';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import IRegion from '@/interfaces/IRegion';

export default defineComponent({
  name: 'RegionsList',
  components: {
    TableButtonGroup,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const mount: Ref<boolean> = ref(false);
    const regions: Ref<IRegion[]> = computed(() => store.getters['regions/items']);

    const edit = async (id: string): Promise<void> => {
      await router.push(`/regions/${id}`);
    };

    const create = async (): Promise<void> => {
      await router.push('/regions/new');
    };

    const remove = async (id: number): Promise<void> => {
      await store.dispatch('regions/delete', id);
    };

    onBeforeMount(async () => {
      store.commit('main/setMainHeader', new MainHeader({ title: 'Регионы', create }));
      await store.dispatch('regions/getAll');
      mount.value = true;
    });

    return {
      regions,
      mount,
      create,
      edit,
      remove,
    };
  },
});
</script>
