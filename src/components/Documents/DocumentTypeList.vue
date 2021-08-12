<template>
  <div v-if="mount" class="wrapper" style="height: 100%; overflow: hidden">
    <PageHead :title="title" :show-add-button="true" @create="create" />
    <div class="table-background">
      <el-table
        :default-sort="{ prop: 'id', order: 'ascending' }"
        :data="documentTypes"
        class="table-shadow"
        header-row-class-name="header-style"
        row-class-name="no-hover"
        style="width: 100%; margin-bottom: 20px; max-height: calc(100vh - 310px); overflow: auto"
      >
        <el-table-column type="index" width="60" align="center" />
        <el-table-column prop="name" label="Название документа" sortable="" />
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
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import PageHead from '@/components/PageHead.vue';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import IDocumentType from '@/interfaces/documents/IDocumentType';

export default defineComponent({
  name: 'DocumentTypeList',
  components: {
    PageHead,
    TableButtonGroup,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const mount: Ref<boolean> = ref(false);
    const title: Ref<string> = ref('Типы документов');
    const documentTypes: ComputedRef<IDocumentType[]> = computed(() => store.getters['documentTypes/documentTypes']);

    onBeforeMount(async (): Promise<void> => {
      await store.dispatch('documentTypes/getAll');
      mount.value = true;
    });

    const edit = async (id: string): Promise<void> => {
      await router.push(`/document-types/${id}`);
    };

    const create = async (): Promise<void> => {
      await router.push('/document-types/new');
    };

    const remove = async (id: number): Promise<void> => {
      await store.dispatch('documentTypes/delete', id);
    };

    return {
      documentTypes,
      mount,
      title,
      create,
      edit,
      remove,
    };
  },
});
</script>
