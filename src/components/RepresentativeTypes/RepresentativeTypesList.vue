<template>
  <div class="wrapper" v-if="mount" style="height:100%; overflow: hidden">
    <PageHead :title="title" @create="create" :showAddButton="true" />
    <div class="table-background">
      <el-table
        :default-sort="{ prop: 'id', order: 'ascending' }"
        :data="representativeTypes"
        class="table-shadow"
        header-row-class-name="header-style"
        row-class-name="no-hover"
        style="width: 100%;margin-bottom: 20px; max-height: calc(100vh - 310px); overflow: auto;"
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
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { mapActions, mapState } from 'vuex';

import PageHead from '@/components/PageHead.vue';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import IRepresentativeType from '@/interfaces/representatives/IRepresentativeType';

@Options({
  name: 'RepresentativeTypesList',
  components: {
    PageHead,
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
  mount = false;

  async mounted(): Promise<void> {
    await this.getAll();
    this.mount = true;
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
