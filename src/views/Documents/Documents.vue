<template>
  <div style="width: 100%">
    <el-button-group>
      <el-button
        type="primary"
        icon="el-icon-document"
        @click="modalCreate = true"
        >Создать документ</el-button
      >
    </el-button-group>

    <el-table
      :default-sort="{ prop: 'id', order: 'ascending' }"
      :data="documents.documents"
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template #default="props">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>Поля документа</span>
              </div>
            </template>
            <div
              v-for="item in props.row.documentFields"
              :key="item.id"
              class="text item"
            >
              {{ item.name }}
            </div>
          </el-card>
        </template>
      </el-table-column>
      <el-table-column prop="№" label="№" width="150" />
      <el-table-column prop="name" label="Название документа" width="150" />
      <el-table-column label="Действия" width="120">
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

    <el-dialog title="Создать документ" v-model="modalCreate" width="30%">
      <create-form v-model="modalCreate" @close="close" />
    </el-dialog>
    <el-dialog title="Отредактировать документ" v-model="modalEdit" width="30%">
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
  name: "Documents",
  components: { CreateForm, EditForm },
  data() {
    return {
      item: {},
      modalCreate: false,
      modalEdit: false
    };
  },

  computed: {
    ...mapState(["documents"]) // this getter would return the Promise
  },
  methods: {
    ...mapActions("documents", ["getAll"]),
    edit(id: number) {
      this.item = this.$store.getters["documents/getById"](id);
      this.modalEdit = true;
    },
    delete(id: number) {
      this.$store.dispatch("documents/delete", id);
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
