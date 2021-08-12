<template>
  <div v-if="mount" class="wrapper" style="height: 100%; overflow: hidden">
    <PageHead :title="title" :show-add-button="true" @create="create" />
    <div class="table-background">
      <el-table
        :default-sort="{ prop: 'id', order: 'ascending' }"
        :data="users"
        class="table-shadow"
        header-row-class-name="header-style"
        row-class-name="no-hover"
        style="width: 100%; margin-bottom: 20px; max-height: calc(100vh - 310px); overflow: auto"
      >
        <el-table-column type="index" width="60" align="center" />
        <el-table-column prop="login" label="Логин" min-width="150" sortable />
        <el-table-column prop="email" label="Email" min-width="150" sortable />
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
import { Options, Vue } from 'vue-class-component';
import { mapActions, mapState } from 'vuex';

import PageHead from '@/components/PageHead.vue';
import TableButtonGroup from '@/components/TableButtonGroup.vue';

import IUser from '../../interfaces/users/IUser';

@Options({
  name: 'UsersList',
  components: {
    PageHead,
    TableButtonGroup,
  },
  computed: {
    ...mapState('users', ['users']),
  },
  methods: {
    ...mapActions({
      getAllUsers: 'users/getAll',
    }),
  },
})
export default class UsersList extends Vue {
  users!: IUser[];
  getAllUsers!: () => Promise<void>;
  title = 'Пользователи';
  mount = false;

  async mounted(): Promise<void> {
    await this.getAllUsers();
    this.mount = true;
  }

  edit(id: number): void {
    this.$router.push(`/users/${id}`);
  }

  create(): void {
    this.$router.push('/users/new');
  }

  remove(id: number): void {
    this.$store.dispatch('users/delete', id);
  }
}
</script>
