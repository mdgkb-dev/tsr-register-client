<template>
  <div v-if="mount" class="wrapper" style="height: 100%; overflow: hidden">
    <PageHead :title="title" :show-add-button="true" @create="create" />
    <div class="table-background">
      <el-table
        :default-sort="{ prop: 'id', order: 'ascending' }"
        :data="registers"
        class="table-shadow"
        header-row-class-name="header-style"
        row-class-name="no-hover"
        style="width: 100%; margin-bottom: 20px; max-height: calc(100vh - 310px); overflow: auto"
      >
        <el-table-column type="index" width="60" align="center" />
        <el-table-column prop="name" label="Название регистра" min-width="150" sortable />
        <el-table-column width="40" fixed="right" align="center">
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

import PageHead from '@/components/PageHead.vue';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import IRegister from '@/interfaces/registers/IRegister';

export default defineComponent({
  name: 'RegisterList',
  components: {
    PageHead,
    TableButtonGroup,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const mount: Ref<boolean> = ref(false);
    const title: Ref<string> = ref('Регистры пациентов');
    const registers: Ref<IRegister[]> = computed(() => store.getters['registers/registers']);

    const edit = async (id: string): Promise<void> => {
      await router.push(`/registers/${id}`);
    };

    const create = async (): Promise<void> => {
      await router.push('/registers/new');
    };

    const remove = async (id: number): Promise<void> => {
      await store.dispatch('registers/delete', id);
    };

    onBeforeMount(async () => {
      await store.dispatch('registers/getAll');
      mount.value = true;
    });

    return {
      registers,
      mount,
      title,
      create,
      edit,
      remove,
    };
  },
});
</script>
