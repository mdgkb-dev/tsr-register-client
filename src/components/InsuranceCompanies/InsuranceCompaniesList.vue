<template>
  <div v-if="mount" style="height: 100%; overflow: hidden">
    <PageHead :title="title" :show-add-button="true" @create="create" />
    <div class="table-background">
      <el-table
        :default-sort="{ prop: 'id', order: 'ascending' }"
        :data="insuranceCompanies"
        class="table-shadow"
        header-row-class-name="header-style"
        row-class-name="no-hover"
        style="width: 100%; margin-bottom: 20px; max-height: calc(100vh - 310px); overflow: auto"
      >
        <el-table-column type="index" width="60" align="center" />
        <el-table-column prop="name" label="Название страховой компании" min-width="150" sortable />
        <el-table-column width="40" fixed="right" align="center">
          <template #default="scope">
            <el-space direction="vertical" class="icons">
              <TableButtonGroup
                :show-edit-button="true"
                :show-remove-button="true"
                @edit="edit(scope.row.id)"
                @remove="remove(scope.row.id)"
              />
            </el-space>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import PageHead from '@/components/PageHead.vue';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import IInsuranceCompany from '@/interfaces/insuranceCompanies/IInsuranceCompany';

export default defineComponent({
  name: 'InsuranceCompanies',
  components: {
    PageHead,
    TableButtonGroup,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const title: Ref<string> = ref('Страховые компании');
    const mount: Ref<boolean> = ref(false);
    const insuranceCompanies: ComputedRef<IInsuranceCompany[]> = computed(() => store.getters['insuranceCompanies/insuranceCompanies']);

    onBeforeMount(async (): Promise<void> => {
      await store.dispatch('insuranceCompanies/getAll');
      mount.value = true;
    });

    const edit = (id: number): void => {
      router.push(`/insurance-companies/${id}`);
    };

    const create = (): void => {
      router.push('/insurance-companies/new');
    };

    const remove = (id: number): void => {
      store.dispatch('insuranceCompanies/delete', id);
    };

    return {
      insuranceCompanies,
      mount,
      title,
      create,
      edit,
      remove,
    };
  },
});
</script>
