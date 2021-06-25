<template>
  <ListHead :title="title" @create="create" />
  <div class="table-background">
    <el-table :default-sort="{ prop: 'id', order: 'ascending' }" :data="insuranceCompanies" class="table-shadow" header-row-class-name="header-style" border>
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column prop="name" label="Название страховой компании" min-width="150" />
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
import { Options, Vue } from 'vue-class-component';
import { mapActions, mapState } from 'vuex';

import ListHead from '@/components/ListHead.vue';
import IInsuranceCompany from '@/interfaces/insuranceCompanies/IInsuranceCompany';

@Options({
  components: {
    ListHead,
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

  async mounted(): Promise<void> {
    await this.getAll();
  }

  edit(id: number): void {
    this.$router.push(`/insurance-companies/${id}`);
  }

  create(): void {
    this.$router.push('/insurance-companies/new');
  }

  delete(id: number): void {
    this.$store.dispatch('insuranceCompanies/delete', id);
  }
}
</script>
