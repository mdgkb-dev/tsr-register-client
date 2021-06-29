<template>
  <div class="wrapper">
    <ListHead :title="title" :hideButton="true" />
    <div class="table-background">
      <el-table
        v-if="mount"
        :default-sort="{ prop: 'id', order: 'ascending' }"
        :data="registers"
        @row-click="link"
        class="table-shadow"
        header-row-class-name="header-style"
      >
        <el-table-column type="index" width="60" align="center" />
        <el-table-column prop="name" label="Название регистра" min-width="150" sortable />
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { mapActions, mapState } from 'vuex';

import ListHead from '@/components/ListHead.vue';
import IRegister from '@/interfaces/registers/IRegister';

@Options({
  components: {
    ListHead,
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
export default class RegisterLinkList extends Vue {
  registers!: IRegister[];
  title = 'Регистры пациентов';
  getAll!: () => Promise<void>;
  mount = false;

  async mounted(): Promise<void> {
    await this.getAll();
    this.mount = true;
  }

  link(row: any): void {
    this.$router.push(`/registers/patients/${row.id}`);
  }
}
</script>

<style lang="scss" scoped>
.wrapper:deep {
  height: 100%;

  .el-table__row {
    cursor: pointer;
  }
}
</style>
