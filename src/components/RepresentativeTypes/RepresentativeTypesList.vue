<template>
  <div v-if="mount" class="wrapper" style="height: 100%; overflow: hidden">
    <div class="table-background">
      <el-table
        :default-sort="{ prop: 'id', order: 'ascending' }"
        :data="representativeTypes"
        class="table-shadow"
        header-row-class-name="header-style"
        row-class-name="no-hover"
        style="width: 100%; margin-bottom: 20px; max-height: calc(100vh - 310px); overflow: auto"
      >
        <el-table-column type="index" width="60" align="center" />
        <el-table-column prop="parentMaleType" label="Представитель мужского пола" min-width="150" />
        <el-table-column prop="parentWomanType" label="Представитель женского пола" min-width="150" />
        <el-table-column prop="childMaleType" label="Подопечный мужского пола" min-width="150" />
        <el-table-column prop="childWomanType" label="Подопечный женского пола" min-width="150" />
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

import MainHeader from '@/classes/shared/MainHeader';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import IRepresentativeType from '@/interfaces/representatives/IRepresentativeType';

export default defineComponent({
  name: 'RepresentativeTypesList',
  components: {
    TableButtonGroup,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const mount: Ref<boolean> = ref(false);
    const representativeTypes: Ref<IRepresentativeType[]> = computed(() => store.getters['representativeTypes/representativeTypes']);

    const edit = async (id: string): Promise<void> => {
      await router.push(`/representative-types/${id}`);
    };

    const create = async (): Promise<void> => {
      await router.push('/representative-types/new');
    };

    const remove = async (id: number): Promise<void> => {
      await store.dispatch('representativeTypes/delete', id);
    };

    onBeforeMount(async () => {
      store.commit('main/setMainHeader', new MainHeader({ title: 'Типы представителей', create }));
      await store.dispatch('representativeTypes/getAll');
      mount.value = true;
    });

    return {
      representativeTypes,
      mount,
      create,
      edit,
      remove,
    };
  },
});
</script>
