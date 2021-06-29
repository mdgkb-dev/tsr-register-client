<template>
  <ListHead :title="title" @create="create" />
  <div class="table-background">
    <el-table
      :default-sort="{ prop: 'id', order: 'ascending' }"
      :data="documentTypes"
      class="table-shadow"
      header-row-class-name="header-style"
      row-class-name="no-hover"
    >
      <el-table-column type="index" width="60" align="center" />
      <el-table-column prop="name" label="Название документа" sortable="" />
      <el-table-column width="40" fixed="right" align="center">
        <template #default="scope">
          <el-space direction="vertical" class="icons">
            <TableButtonGroup @edit="edit(scope.row.id)" @remove="remove(scope.row.id)" :showEditButton="true" :showRemoveButton="true" />
          </el-space>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { mapActions, mapState } from 'vuex';

import ListHead from '@/components/ListHead.vue';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import IDocumentType from '@/interfaces/documents/IDocumentType';

@Options({
  components: {
    ListHead,
    TableButtonGroup,
  },
  computed: {
    ...mapState('documentTypes', ['documentTypes']),
  },
  methods: {
    ...mapActions('documentTypes', ['getAll']),
  },
})
export default class DocumentTypeList extends Vue {
  // Types.
  documentTypes!: IDocumentType[];
  getAll!: () => Promise<void>;

  // Local state.
  title = 'Типы документов';

  async mounted(): Promise<void> {
    await this.getAll();
  }

  edit(id: string): void {
    this.$router.push(`/document-types/${id}`);
  }

  create(): void {
    this.$router.push('/document-types/new');
  }

  async remove(id: number): Promise<void> {
    await this.$store.dispatch('documentTypes/delete', id);
  }
}
</script>
