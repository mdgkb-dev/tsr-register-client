<template>
  <div v-if="mount" class="wrapper" style="height: 100%">
    <PageHead :title="title" />
    <div class="table-background" style="height: auto">
      <el-scrollbar>
        <MkbTree />
      </el-scrollbar>
    </div>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, onBeforeMount, Ref, ref } from 'vue';

import PageHead from '@/components/PageHead.vue';

const MkbTree = defineAsyncComponent(() => import('@/components/Mkb/MkbTree.vue'));

export default defineComponent({
  name: 'MkbList',
  components: {
    PageHead,
    MkbTree,
  },
  setup() {
    const mount: Ref<boolean> = ref(false);
    const title: Ref<string> = ref('МКБ10');

    onBeforeMount(() => {
      mount.value = true;
    });

    return {
      mount,
      title,
    };
  },
});
</script>
