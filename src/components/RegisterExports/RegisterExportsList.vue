<template>
  <div v-if="mount" class="wrapper" style="height: 100%; overflow: hidden">
    <div class="table-background">
      <el-table
        :default-sort="{ prop: 'name', order: 'ascending' }"
        :data="registerQueries"
        class="table-shadow"
        header-row-class-name="header-style"
        row-class-name="no-hover"
        style="width: 100%; margin-bottom: 20px; max-height: calc(100vh - 310px); overflow: auto"
      >
        <el-table-column type="index" width="60" align="center" />
        <el-table-column prop="name" label="Название экспорта" min-width="150" sortable />
        <el-table-column width="50" align="center">
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
import IRegisterQuery from '@/interfaces/IRegisterQuery';

export default defineComponent({
  name: 'RegisterExportsList',
  components: {
    TableButtonGroup,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const mount: Ref<boolean> = ref(false);
    const registerQueries: Ref<IRegisterQuery[]> = computed<IRegisterQuery[]>(() => store.getters['registerQueries/registerQueries']);

    const create = async (): Promise<void> => {
      await router.push('/register-exports/new');
    };

    const edit = async (id: string): Promise<void> => {
      await router.push(`/register-exports/${id}`);
    };

    const remove = async (id: number): Promise<void> => {
      await store.dispatch('registerQueries/delete', id);
    };

    onBeforeMount(async () => {
      store.commit('main/setMainHeader', new MainHeader({ title: 'Экспорт регистров', create }));
      await store.dispatch('registerQueries/getAll');
      mount.value = true;
    });

    return {
      mount,
      registerQueries,
      create,
      edit,
      remove,
    };
  },
});
</script>
