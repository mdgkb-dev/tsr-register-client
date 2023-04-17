<template>
  <div v-if="mount" style="height: 100%; overflow: hidden">
    <div class="table-background">
      <el-table
        ref="table"
        :default-sort="{ prop: 'id', order: 'ascending' }"
        :data="patients"
        class="table-shadow"
        header-row-class-name="header-style"
        row-class-name="row-style"
        style="width: 100%; margin-bottom: 20px; overflow: auto"
        height="calc(100vh - 200px)"
        @row-click="link"
      >
        <el-table-column width="60" align="center" />

        <el-table-column prop="human.surname" align="left" min-width="130" resizable>
          <template #header>
            <span class="table-header">
              <span>Фамилия Имя Отчество</span>
            </span>
          </template>
          <template #default="scope">
            {{ scope.row.human.getFullName() }}
          </template>
        </el-table-column>

        <el-table-column width="110" prop="human.isMale" align="center">
          <template #header>
            <span class="table-header">
              <span>Пол</span>
            </span>
          </template>
          <template #default="scope">
            {{ scope.row.human.getGender() }}
          </template>
        </el-table-column>

        <el-table-column prop="human.dateBirth" width="150" align="center">
          <template #header>
            <div class="table-header">
              <span>Дата рождения</span>
            </div>
          </template>
          <template #default="scope">
            {{ $dateTimeFormatter.format(scope.row.human.dateBirth) }}
          </template>
        </el-table-column>
      </el-table>
      <Pagination />
    </div>
  </div>
</template>

<script lang="ts">
import { ElLoading } from 'element-plus';
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { onBeforeRouteLeave, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import Pagination from '@/components/Pagination.vue';

export default defineComponent({
  name: 'HistoryPatientsList',
  components: {
    Pagination,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const mount: Ref<boolean> = ref(false);
    const patients: Ref<Patient[]> = computed(() => store.getters['patients/patients']);

    onBeforeMount(async () => {
      store.commit('filter/resetId');
      const loading = ElLoading.service({
        lock: true,
        text: 'Загрузка',
      });
      store.commit('pagination/setCurPage', 1);
      // pushToLinks(['/history'], ['Архив']);
      // store.commit('main/setMainHeader', new MainHeader({ title: 'Архив пациентов', links }));
      store.commit('filter/setStoreModule', 'patients');
      store.commit('filter/setWithDeleted', true);
      await store.dispatch('patients/getAll', store.getters['filter/filterQuery']);
      await store.dispatch('registers/getAll');
      store.commit('main/setActiveMenu', 'HistoryList');
      mount.value = true;
      loading.close();
    });

    const link = (row: Patient): void => {
      router.push(`/patients/history/${row.id}`);
    };

    onBeforeRouteLeave(() => {
      store.commit('filter/setWithDeleted', false);
    });

    return {
      mount,
      // formatDate,
      patients,
      link,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.row-style) {
  cursor: pointer;
}
</style>
