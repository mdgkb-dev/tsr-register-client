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
      :data="documents"
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
import { Vue, Options } from 'vue-class-component';
import { mapState, mapActions } from 'vuex';

import CreateForm from './CreateForm.vue';
import EditForm from './EditForm.vue';

@Options({
  components: {
    CreateForm,
    EditForm,
  },
  computed: {
    ...mapState('documents', ['documents']),
  },
  methods: {
    ...mapActions('documents', ['getAll']),
  },
})
export default class DocumentsList extends Vue {
  documents!: [];

  getAll!: () => Promise<void>;

  item = {};

  modalCreate = false;

  modalEdit = false;

  async mounted(): Promise<void> {
    await this.getAll();
  }

  edit(id: number): void {
    this.item = this.$store.getters['documents/getById'](id);
    this.modalEdit = true;
  }

  delete(id: number): void {
    this.$store.dispatch('documents/delete', id);
  }

  close(): void {
    this.modalEdit = false;
    this.modalCreate = false;
  }
}
</script>
