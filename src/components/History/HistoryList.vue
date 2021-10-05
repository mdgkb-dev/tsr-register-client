<template>
  <div v-if="mount" style="height: 100%; overflow: hidden">
    <div class="table-background">
      <el-table
        ref="table"
        :default-sort="{ prop: 'id', order: 'ascending' }"
        :data="historyList"
        class="table-shadow"
        header-row-class-name="header-style"
        row-class-name="row-style"
        style="width: 100%; margin-bottom: 20px; overflow: auto"
        @row-click="link"
      >
        <el-table-column width="60" align="center" />
        <el-table-column prop="title" label="Название архива" />
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import MainHeader from '@/classes/shared/MainHeader';
import IMenuLink from '@/interfaces/menu/IMenuLink';
export default defineComponent({
  name: 'HistoryList',
  setup() {
    const store = useStore();
    const router = useRouter();
    const mount: Ref<boolean> = ref(false);
    const historyList = ref([{ title: 'Пациенты', link: '/history/patients' }]);

    onBeforeMount(async () => {
      store.commit('main/setMainHeader', new MainHeader({ title: 'Архив' }));
      mount.value = true;
    });

    const link = (row: IMenuLink): void => {
      router.push(row.link);
    };

    return {
      historyList,
      mount,
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
