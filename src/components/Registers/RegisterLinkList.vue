<template>
  <div v-if="mount" class="wrapper" style="height: 100%; overflow: hidden">
    <div class="table-background">
      <el-table
        :default-sort="{ prop: 'id', order: 'ascending' }"
        :data="registers"
        class="table-shadow"
        header-row-class-name="header-style"
        style="width: 100%; margin-bottom: 20px; max-height: calc(100vh - 310px); overflow: auto"
        @row-click="link"
      >
        <el-table-column type="index" width="60" align="center" />
        <el-table-column prop="name" label="Название регистра" min-width="150" sortable />
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import MainHeader from '@/classes/shared/MainHeader';
import IRegister from '@/interfaces/registers/IRegister';

export default defineComponent({
  name: 'RegisterLinkList',

  setup() {
    const router = useRouter();
    const store = useStore();
    const mount: Ref<boolean> = ref(false);
    const registers: Ref<IRegister[]> = computed(() => store.getters['registers/registers']);

    const link = (row: IRegister): void => {
      router.push(`/registers/patients/${row.id}`);
    };

    onBeforeMount(async () => {
      store.commit('main/setMainHeader', new MainHeader({ title: 'Регистры пациентов' }));
      await store.dispatch('registers/getAll');
      mount.value = true;
    });

    return {
      registers,
      mount,
      link,
    };
  },
});
</script>

<style scoped>
:deep(.el-table__row) {
  cursor: pointer;
}
</style>
