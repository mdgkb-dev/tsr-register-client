<template>
  <div class="hidden-lg-and-up drawer-container">
    <el-drawer v-model="isDrawerOpen" custom-class="admin-drawer" :size="'auto'" direction="ltr" :with-header="false" @closed="closeDrawer">
      <MainSidePanel />
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

import MainSidePanel from './MainSidePanel.vue';

export default defineComponent({
  name: 'MainSideDrawer',
  components: { MainSidePanel },

  setup() {
    const store = useStore();
    const isDrawerOpen = computed(() => store.getters['main/isDrawerOpen']);
    const closeDrawer = () => store.commit('main/closeDrawer');

    return { isDrawerOpen, closeDrawer };
  },
});
</script>

<style lang="scss" scoped>
$header-background-color: whitesmoke;

:deep(.admin-drawer) {
  background-color: $header-background-color;
}

.drawer-container {
  height: 100%;
}
</style>
