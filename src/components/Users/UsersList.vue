<template>
  <div>
    <el-button-group>
      <el-button
        type="primary"
        icon="el-icon-document"
        @click="modalCreate = true"
        >Create</el-button
      >
    </el-button-group>

    <el-table
      :default-sort="{ prop: 'id', order: 'ascending' }"
      :data="users"
      style="width: 100%"
    >
      <el-table-column prop="id" label="№" width="150" />
      <el-table-column prop="login" label="Логин" width="150" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
          <el-button @click="this.edit(scope.row.id)" type="text" size="small"
            >Редактировать</el-button
          >
          <el-button @click="this.delete(scope.row.id)" type="text" size="small"
            >Удалить</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="CreateHuman" v-model="modalCreate" width="30%">
      <create-form v-model="dialogVisible" @close="close" />
    </el-dialog>
    <el-dialog title="EditHuman" v-model="modalEdit" width="30%">
      <edit-form :item="item" @close="close" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapState, mapActions } from 'vuex';

import IUser from '../../interfaces/users/IUser';

import CreateForm from './CreateForm.vue';
import EditForm from './EditForm.vue';

@Options({
  components: {
    CreateForm,
    EditForm,
  },
  props: {
    ...mapState({
      users: 'users/users',
    }),
    ...mapActions({
      getAll: 'users/getAll',
    }),
  },
})
export default class UsersList extends Vue {
  users!: IUser[];

  getAll!: () => Promise<void>;

  item: IUser = {
    id: '',
  };

  modalCreate = false;

  modalEdit = false;

  async mounted(): Promise<void> {
    await this.getAll();
  }

  edit(id: number): void {
    this.item = this.$store.getters['users/getById'](id);
    this.modalEdit = true;
  }

  delete(id: number): void {
    this.$store.dispatch('users/delete', id);
  }

  close(): void {
    this.modalEdit = false;
    this.modalCreate = false;
  }
}
</script>
