<template>
  <div v-if="mount" style="height: 100%; overflow: hidden">
    <div class="table-background">
      <el-table
        ref="table"
        :default-sort="{ prop: 'id', order: 'ascending' }"
        :data="patientsHistory"
        class="table-shadow"
        header-row-class-name="header-style"
        row-class-name="row-style"
        style="width: 100%; margin-bottom: 20px; overflow: auto"
        height="calc(100vh - 120px)"
        @row-click="link"
      >
        <el-table-column width="60" align="center" />
        <el-table-column prop="history.requestType" label="Тип операции" align="center" />
        <el-table-column prop="history.requestDate" label="Дата операции" align="center">
          <template #default="scope">
            {{ $dateTimeFormatter.format(scope.row.history.requestDate) }}
          </template>
        </el-table-column>
        <el-table-column prop="updatedBy.login" label="Пользователь" align="center" />
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { ElLoading } from 'element-plus';
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import Patient from '@/classes/Patient';

export default defineComponent({
  name: 'PatientsHistoryList',
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    // const { formatDate } = useDateFormat();
    // const { links, pushToLinks } = useBreadCrumbsLinks();
    const mount: Ref<boolean> = ref(false);

    const patientsHistory: Ref<Patient[]> = computed(() => store.getters['patients/patientsHistory']);

    onBeforeMount(async () => {
      const loading = ElLoading.service({
        lock: true,
        text: 'Загрузка',
      });
      await store.dispatch('patients/getAllHistory', route.params.patientId);
      store.commit('patients/set', patientsHistory.value[patientsHistory.value.length - 1]);
      // pushToLinks(['/history/patients'], ['Архив пациентов']);
      // store.commit('main/setMainHeader', new MainHeader({ title: `${patient.value.human.getFullName()}`, links }));
      store.commit('main/setActiveMenu', 'HistoryList');
      mount.value = true;
      loading.close();
    });

    const link = (row: Patient): void => {
      router.push(`/patients/history/${route.params.patientId}/${row.patientHistoryId}`);
    };

    return {
      mount,
      patientsHistory,
      // formatDate,
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
