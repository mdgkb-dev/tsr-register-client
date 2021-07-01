<template>
  <div v-if="mount" style="height: 100%">
    <PageHead :title="title" @create="create" :showAddButton="true" />
    <div class="table-background">
      <el-table
        :default-sort="{ prop: 'id', order: 'ascending' }"
        :data="insuranceCompanies"
        class="table-shadow"
        header-row-class-name="header-style"
        row-class-name="no-hover"
      >
        <el-table-column type="index" width="60" align="center" />
        <el-table-column prop="name" label="Название страховой компании" min-width="150" sortable />
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
import IInsuranceCompany from '@/interfaces/insuranceCompanies/IInsuranceCompany';

@Options({
  name: 'InsuranceCompanies',
  components: {
    PageHead,
    TableButtonGroup,
  },
  computed: {
    ...mapState('insuranceCompanies', ['insuranceCompanies']),
  },
  methods: {
    ...mapActions('insuranceCompanies', ['getAll']),
  },
})
export default class InsuranceCompanies extends Vue {
  insuranceCompanies!: IInsuranceCompany[];
  getAll!: () => Promise<void>;
  title = 'Страховые компании';
  mount = false;

  async mounted(): Promise<void> {
    await this.getAll();
    this.mount = true;
  }

  edit(id: number): void {
    this.$router.push(`/insurance-companies/${id}`);
  }

  create(): void {
    this.$router.push('/insurance-companies/new');
  }

  remove(id: number): void {
    this.$store.dispatch('insuranceCompanies/delete', id);
  }
}
</script>
