<template>
  <AdminListWrapper v-if="mount">
    <el-table
      :default-sort="{ prop: 'id', order: 'ascending' }"
      :data="users"
      class="table-shadow"
      header-row-class-name="header-style"
      row-class-name="no-hover"
    >
      <el-table-column type="index" width="60" align="center" />
      <el-table-column prop="login" label="Логин" min-width="150" sortable />
      <el-table-column prop="email" label="Email" min-width="150" sortable />
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
  </AdminListWrapper>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import MainHeader from '@/classes/shared/MainHeader';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import AdminListWrapper from '@/views/Main/AdminListWrapper.vue';

import IUser from '../../interfaces/IUser';

export default defineComponent({
  name: 'UsersList',
  components: {
    TableButtonGroup,
    AdminListWrapper,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const mount: Ref<boolean> = ref(false);

    const users: ComputedRef<IUser[]> = computed(() => store.getters['users/users']);

    onBeforeMount(async (): Promise<void> => {
      store.commit('main/setMainHeader', new MainHeader({ title: 'Список пользователей', create }));
      await store.dispatch('users/getAll');
      mount.value = true;
    });

    const edit = async (id: number): Promise<void> => {
      await router.push(`/users/${id}`);
    };

    const create = async (): Promise<void> => {
      await router.push('/users/new');
    };

    const remove = async (id: number): Promise<void> => {
      await store.dispatch('users/delete', id);
    };

    return {
      mount,
      users,
      create,
      edit,
      remove,
    };
  },
});
</script>
