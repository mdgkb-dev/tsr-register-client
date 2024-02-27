<template>
  <div style="min-height: 100vh">
    <KeepAlive :include="[]" :max="0">
      <div>
        <AdminHeaderTop v-if="showTopHeader" />
        <div class="admin-main-container">
          <AdminSideMenu />
          <div class="admin-container">
            <AdminHeaderBottom style="position: sticky; z-index: 2" />
            <div v-if="$route.meta.adminLayout === AdminLayout.TableList" class="field" style="height: inherit">
              <slot />
            </div>
            <div v-else class="field">
              <slot />
            </div>
          </div>
        </div>
        <AdminMenuDrawer />
      </div>
    </KeepAlive>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent } from 'vue';

import { AdminLayout } from '@/services/interfaces/AdminLayout';
import Provider from '@/services/Provider/Provider';
import AdminHeaderBottom from '@/views/adminLayout/AdminHeaderBottom.vue';
import AdminHeaderTop from '@/views/adminLayout/AdminHeaderTop.vue';
import AdminMenuDrawer from '@/views/adminLayout/AdminMenuDrawer.vue';
import AdminSideMenu from '@/views/adminLayout/AdminSideMenu.vue';

export default defineComponent({
  name: 'AdminLayout',
  components: {
    AdminHeaderTop,
    AdminHeaderBottom,
    AdminSideMenu,
    AdminMenuDrawer,
  },
  setup() {
    const isDrawerOpen: ComputedRef<boolean> = computed(() => Provider.store.getters['admin/isDrawerOpen']);
    const closeDrawer = () => Provider.store.commit('admin/closeDrawer');
    const showTopHeader = false;

    return { isDrawerOpen, closeDrawer, AdminLayout, showTopHeader };
  },
});
</script>

<style lang="scss" scoped>
.admin-main-container {
  height: calc(100vh);
  box-sizing: border-box;
}

.admin-container {
  height: calc(100vh - 61px);
  width: 100%;
  box-sizing: border-box;
}

.el-main {
  height: inherit;
  overflow: auto;
  padding: 0;
  box-sizing: border-box;
}

.field {
  height: calc(100% - 10px);
  box-sizing: border-box;
  height: inherit;
}

@media (max-width: 992px) {
  .el-main {
    height: inherit;
    overflow: auto;
  }
}
</style>
