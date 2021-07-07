<template>
  <div class="wrapper" v-if="mount" style="height:100%; overflow: hidden">
    <PageHead :title="title" @create="create" :showAddButton="true" />
    <div class="table-background">
      <el-table
        :default-sort="{ prop: 'id', order: 'ascending' }"
        :data="registers"
        class="table-shadow"
        header-row-class-name="header-style"
        row-class-name="no-hover"
        style="width: 100%;margin-bottom: 20px; max-height: calc(100vh - 310px); overflow: auto;"
      >
        <el-table-column type="index" width="60" align="center" />
        <el-table-column prop="name" label="Название регистра" min-width="150" sortable />
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
import IRegister from '@/interfaces/registers/IRegister';

@Options({
  name: 'RegisterList',
  components: {
    PageHead,
    TableButtonGroup,
  },
  computed: {
    ...mapState('registers', ['registers']),
  },
  methods: {
    ...mapActions({
      getAll: 'registers/getAll',
    }),
  },
})
export default class RegisterList extends Vue {
  registers!: IRegister[];
  title = 'Регистры пациентов';
  getAll!: () => Promise<void>;
  mount = false;

  async mounted(): Promise<void> {
    await this.getAll();
    this.mount = true;
  }

  edit(id: number): void {
    this.$router.push(`/registers/${id}`);
  }

  create(): void {
    this.$router.push('/registers/new');
  }

  remove(id: number): void {
    this.$store.dispatch('registers/delete', id);
  }
}
</script>
