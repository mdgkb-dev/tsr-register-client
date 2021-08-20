<template>
  <div v-if="mount" class="wrapper" style="height: 100%; overflow: hidden">
    <div class="table-background">
      <el-table
        :default-sort="{ prop: 'id', order: 'ascending' }"
        :data="anthropometries"
        class="table-shadow"
        header-row-class-name="header-style"
        row-class-name="no-hover"
        style="width: 100%; margin-bottom: 20px; max-height: calc(100vh - 310px); overflow: auto"
      >
        <el-table-column type="index" width="60" align="center" />
        <el-table-column prop="name" label="Название параметра" min-width="150" sortable />
        <el-table-column width="40" fixed="right" align="center">
          <template #default="scope">
            <el-space direction="vertical" class="icons">
              <TableButtonGroup
                :show-remove-button="true"
                :show-edit-button="true"
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
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import MainHeader from '@/classes/shared/MainHeader';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import IAnthropometry from '@/interfaces/anthropometry/IAnthropometry';

export default defineComponent({
  name: 'AnthropometryList',
  components: {
    TableButtonGroup,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const mount: Ref<boolean> = ref(false);
    const anthropometries: ComputedRef<IAnthropometry[]> = computed(() => store.getters['anthropometry/anthropometries']);

    const edit = async (id: string): Promise<void> => {
      await router.push(`/anthropometry/${id}`);
    };

    const create = async (): Promise<void> => {
      await router.push('/anthropometry/new');
    };

    const remove = async (id: number): Promise<void> => {
      await store.dispatch('anthropometry/delete', id);
    };

    onBeforeMount(async () => {
      store.commit('main/setMainHeader', new MainHeader({ title: 'Антропометрия', create }));
      await store.dispatch('anthropometry/getAll');
      mount.value = true;
    });

    return {
      anthropometries,
      mount,
      create,
      edit,
      remove,
    };
  },
});
</script>
