<script src="../../router/index.ts"></script>
<script src="../../store/modules/auth/auth.ts"></script>
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
      :data="users.users"
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
import { defineComponent } from "vue";
import CreateForm from "./CreateForm.vue";
import EditForm from "./EditForm.vue";
import { mapActions, mapState } from "vuex";
export default defineComponent({
  name: "Humans",
  components: { CreateForm, EditForm },
  data() {
    return {
      item: {},
      modalCreate: false,
      modalEdit: false
    };
  },

  computed: {
    ...mapState(["users"]) // this getter would return the Promise
  },
  methods: {
    ...mapActions("users", ["getAll"]),
    edit(id: number) {
      this.item = this.$store.getters["users/getById"](id);
      this.modalEdit = true;
    },
    delete(id: number) {
      this.$store.dispatch("users/delete", id);
    },
    close() {
      this.modalEdit = false;
      this.modalCreate = false;
    }
  },
  async mounted() {
    await this.getAll();
  }
});
</script>
