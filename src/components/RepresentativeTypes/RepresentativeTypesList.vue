<template>
  <ListHead :title="title" @create="create" />
  <div class="table-background">
    <el-table
      :default-sort="{ prop: 'id', order: 'ascending' }"
      :data="representativeTypes"
      class="table-shadow"
      header-row-class-name="header-style"
      row-class-name="no-hover"
    >
      <el-table-column type="index" width="60" align="center" />
      <el-table-column prop="name" label="Название типа" min-width="150" sortable />
      <el-table-column prop="childMaleType" label="Подопечный мужского пола" min-width="150" />
      <el-table-column prop="childWomanType" label="Подопечный женского пола" min-width="150" />
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
import IRepresentativeType from '@/interfaces/representatives/IRepresentativeType';

@Options({
  name: 'RepresentativeTypesList',
  components: {
    ListHead,
    TableButtonGroup,
  },
  computed: {
    ...mapState('representativeTypes', ['representativeTypes']),
  },
  methods: {
    ...mapActions('representativeTypes', ['getAll']),
  },
})
export default class RepresentativeTypesList extends Vue {
  representativeTypes!: IRepresentativeType[];
  getAll!: () => Promise<void>;
  title = 'Типы представителей';

  async mounted(): Promise<void> {
    await this.getAll();
  }

  edit(id: number): void {
    this.$router.push(`/representative-types/${id}`);
  }

  create(): void {
    this.$router.push('/representative-types/new');
  }

  remove(id: number): void {
    this.$store.dispatch('representativeTypes/delete', id);
  }
}
</script>
