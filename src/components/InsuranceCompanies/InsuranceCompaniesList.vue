<template>
  <AdminListWrapper v-if="mount">
    <el-table
      :default-sort="{ prop: 'id', order: 'ascending' }"
      :data="insuranceCompanies"
      class="table-shadow"
      header-row-class-name="header-style"
      row-class-name="no-hover"
    >
      <el-table-column type="index" width="60" align="center" />
      <el-table-column prop="name" label="Название страховой компании" min-width="150" class-name="sticky-left" sortable />
      <el-table-column width="50" align="center" class-name="sticky-right">
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
  </AdminListWrapper>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import MainHeader from '@/classes/shared/MainHeader';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import IInsuranceCompany from '@/interfaces/insuranceCompanies/IInsuranceCompany';
import AdminListWrapper from '@/views/Main/AdminListWrapper.vue';

export default defineComponent({
  name: 'InsuranceCompanies',
  components: {
    TableButtonGroup,
    AdminListWrapper,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const mount: Ref<boolean> = ref(false);
    const insuranceCompanies: ComputedRef<IInsuranceCompany[]> = computed(() => store.getters['insuranceCompanies/insuranceCompanies']);

    onBeforeMount(async (): Promise<void> => {
      store.commit('main/setMainHeader', new MainHeader({ title: 'Страховые компании', create }));
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
      create,
      edit,
      remove,
    };
  },
});
</script>
