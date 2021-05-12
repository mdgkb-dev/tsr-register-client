<template>
  <ListHead :title="title" @create="create" />
  <div class="table-background">
    <el-table :default-sort="{ prop: 'id', order: 'ascending' }" :data="documents" class="table-shadow" header-row-class-name="header-style">
      <el-table-column type="expand">
        <template #default="props">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>Поля документа</span>
              </div>
            </template>
            <div v-for="item in props.row.documentFields" :key="item.id" class="text item">
              {{ item.name }}
            </div>
          </el-card>
        </template>
      </el-table-column>
      <el-table-column prop="№" label="№" width="150" />
      <el-table-column prop="name" label="Название документа" width="150" />
      <el-table-column label="Действия" width="120">
        <template #default="scope">
          <el-button @click="this.edit(scope.row.id)" type="text" size="small">Редактировать</el-button>
          <el-button @click="this.delete(scope.row.id)" type="text" size="small">Удалить</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapState, mapActions } from 'vuex';

import ListHead from '@/components/ListHead.vue';

@Options({
  components: {
    ListHead,
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
  title = 'Документы';

  async mounted(): Promise<void> {
    await this.getAll();
  }

  edit(id: string): void {
    this.$router.push(`/documents/${id}`);
  }

  create(): void {
    this.$router.push('/documents/new');
  }

  delete(id: number): void {
    this.$store.dispatch('documents/delete', id);
  }
}
</script>
