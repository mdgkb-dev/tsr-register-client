<template>
  <div v-if="mount" class="wrapper" style="height: 100%">
    <div class="table-background" style="height: auto">
      <el-scrollbar>
        <MkbTree />
      </el-scrollbar>
    </div>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import MainHeader from '@/classes/shared/MainHeader';

const MkbTree = defineAsyncComponent(() => import('@/components/Mkb/MkbTree.vue'));

export default defineComponent({
  name: 'MkbList',
  components: {
    MkbTree,
  },
  setup() {
    const store = useStore();
    const mount: Ref<boolean> = ref(false);

    onBeforeMount(() => {
      store.commit('main/setMainHeader', new MainHeader({ title: 'МКБ10' }));
      mount.value = true;
    });

    return {
      mount,
    };
  },
});
</script>
