<template>
  <div v-if="mount">
    <ListHead :title="title" @create="create" />
    <div class="table-background">
      <el-table :default-sort="{ prop: 'id', order: 'ascending' }" :data="users" class="table-shadow" header-row-class-name="header-style" border>
        <el-table-column type="index" label="№" min-width="50" />
        <el-table-column prop="login" label="Логин" min-width="150" />
        <el-table-column prop="email" label="Email" min-width="150" />
        <el-table-column label="Действия" width="140">
          <template #default="scope">
            <el-button @click="edit(scope.row.id)" type="text" size="small">Редактировать</el-button>
            <el-button @click="remove(scope.row.id)" type="text" size="small">Удалить</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapState, mapActions } from 'vuex';

import ListHead from '@/components/ListHead.vue';
import IUser from '../../interfaces/users/IUser';

@Options({
  components: {
    ListHead,
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
