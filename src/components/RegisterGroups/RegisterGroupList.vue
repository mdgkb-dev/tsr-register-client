<template>
  <ListHead :title="title" @create="create" />
  <div class="table-background">
    <el-table
      v-if="mount"
      :default-sort="{ prop: 'id', order: 'ascending' }"
      :data="registerGroups"
      class="table-shadow"
      header-row-class-name="header-style"
      row-class-name="no-hover"
    >
      <el-table-column type="index" width="60" align="center" />
      <el-table-column prop="name" label="Название группы" min-width="150" sortable />
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
import IRegisterGroup from '@/interfaces/registers/IRegisterGroup';

@Options({
  components: {
    ListHead,
    TableButtonGroup,
  },
  computed: {
    ...mapState('registerGroups', ['registerGroups']),
  },
  methods: {
    ...mapActions({
      getAll: 'registerGroups/getAll',
    }),
  },
})
export default class RegisterGroupList extends Vue {
  registerGroups!: IRegisterGroup[];
  title = 'Группы для регистров';
  getAll!: () => Promise<void>;
  mount = false;

  async mounted(): Promise<void> {
    await this.getAll();
    this.mount = true;
  }

  edit(id: number): void {
    this.$router.push(`/register-groups/${id}`);
  }

  create(): void {
    this.$router.push('/register-groups/new');
  }

  remove(id: number): void {
    this.$store.dispatch('registerGroups/delete', id);
  }
}
</script>
