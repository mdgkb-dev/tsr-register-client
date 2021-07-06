<template>
  <div class="wrapper" v-if="mount" style="height:100%; overflow: hidden">
    <PageHead :title="title" @create="create" :showAddButton="true" />
    <div class="table-background">
      <el-table
        :default-sort="{ prop: 'id', order: 'ascending' }"
        :data="anthropometries"
        class="table-shadow"
        header-row-class-name="header-style"
        row-class-name="no-hover"
        height="auto"
        max-height="75%"
      >
        <el-table-column type="index" width="60" align="center" />
        <el-table-column prop="name" label="Название параметра" min-width="150" sortable />
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
import IAnthropometry from '@/interfaces/anthropometry/IAnthropometry';

@Options({
  name: 'Anthropometry',
  components: {
    PageHead,
    TableButtonGroup,
  },
  computed: {
    ...mapState('anthropometry', ['anthropometries']),
  },
  methods: {
    ...mapActions({
      getAll: 'anthropometry/getAll',
    }),
  },
})
export default class Anthropometry extends Vue {
  anthropometries!: IAnthropometry[];
  getAll!: () => Promise<void>;
  mount = false;
  title = 'Антропометрия';

  async mounted(): Promise<void> {
    await this.getAll();
    this.mount = true;
  }

  edit(id: string): void {
    this.$router.push(`/anthropometry/${id}`);
  }

  create(): void {
    this.$router.push('/anthropometry/new');
  }

  remove(id: number): void {
    this.$store.dispatch('anthropometry/delete', id);
  }
}
</script>
