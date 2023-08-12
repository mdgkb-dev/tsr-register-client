<template>
  <div v-if="showMenuBar" class="blur" @click="showMenuBar = false"></div>
  <div class="menu-icon" @click="openMenuBar()">
    <svg class="menu-icon-svg">
      <use xlink:href="#menu-icon"></use>
    </svg>
  </div>
  <div
    v-if="mounted"
    class="admin-side-menu"
    :style="{
      marginLeft: showMenuBar ? '0px' : '',
    }"
  >
    <el-menu :default-active="activePath" :collapse="isCollapseSideMenu" background-color="whitesmoke" unique-opened @select="closeDrawer">
      <template v-for="item in menus" :key="item.title">
        <el-sub-menu v-if="item?.children?.length" :index="item.title">
          <template #title>
            <div class="sub-menu-container">
              <el-badge v-if="item.children.some((i) => i.count && i.count > 0)" is-dot type="danger"></el-badge>
              <i :class="item.icon"></i>
              <span class="row-menu-title">{{ item.title }}</span>
            </div>
          </template>

          <el-menu-item v-for="children in item.children" :key="children.to" :index="children.to" @click="$router.push(children.to)">
            <div class="menu-item-container">
              {{ children.title }}
              <el-badge v-if="children.count && children.count > 0" :value="children.count" type="danger"></el-badge>
            </div>
          </el-menu-item>
        </el-sub-menu>
        <div v-else @click="showMenuBar = false">
          <el-menu-item v-if="item.to !== '/'" :index="item.to" @click="$router.push(item.to)">
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </div>
      </template>
    </el-menu>
    <div class="exit-button-container">
      <el-button @click="logout">Выйти</el-button>
    </div>
  </div>
  <Menu />
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, onBeforeUnmount, Ref, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import Menu from '@/assets/svg/Menu.svg';
import IAdminMenu from '@/interfaces/IAdminMenu';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'AdminSideMenu',
  components: {
    Menu,
  },
  props: { isCollapse: { type: Boolean } },

  setup() {
    const store = useStore();
    const isCollapseSideMenu = computed(() => store.getters['admin/isCollapseSideMenu']);
    const closeDrawer = () => store.commit('admin/closeDrawer');
    const route = useRoute();
    const activePath: Ref<string> = ref('');
    // const applicationsCounts: Ref<IApplicationsCount[]> = computed(() => store.getters['admin/applicationsCounts']);
    const mounted = ref(false);
    const showMenuBar: Ref<boolean> = ref(false);
    // const userPermissions: ComputedRef<IPathPermission[]> = computed(() => store.getters['auth/userPathPermissions']);
    const menus: ComputedRef<IAdminMenu[]> = computed<IAdminMenu[]>(() => store.getters['admin/menus']);
    watch(
      () => route.path,
      () => {
        activePath.value = route.path;
      }
    );

    onBeforeMount(async () => {
      // await store.dispatch('auth/getUserPathPermissions');
      // store.commit('admin/filterMenus', userPermissions.value);
      // await store.dispatch('admin/updateApplicationsCounts');
      // await store.dispatch('meta/getApplicationsCounts');
      // store.commit('admin/setApplicationsCounts', applicationsCounts.value);
      // await store.dispatch('admin/subscribeApplicationsCountsGet');
      activePath.value = route.path;
      mounted.value = true;
    });

    onBeforeUnmount(async () => {
      // await store.dispatch('admin/unsubscribeApplicationsCountsGet');
    });

    const openMenuBar = async () => {
      showMenuBar.value = true;
    };

    const logout = async () => {
      await Provider.store.dispatch('auth/logout');
      await Provider.router.push('/login');
    };
    return { logout, menus, closeDrawer, isCollapseSideMenu, activePath, mounted, openMenuBar, showMenuBar };
  },
});
</script>

<style lang="scss" scoped>
$background-color: whitesmoke;

.hidden {
  display: none;
}

.exit-button-container {
  display: flex;
  justify-content: left;
  position: absolute;
  bottom: 50px;
  left: 25%;
}

::-webkit-scrollbar {
  display: block;
  width: 8px;
  height: 8px;
  background-color: rgba(245, 245, 245, 0.47);
}

::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #f5f5f5;
  margin: 5px 0;
}

::-webkit-scrollbar-thumb {
  height: 20px;
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: rgba(85, 85, 85, 0.25);
}

.admin-side-menu {
  position: relative;
  min-height: inherit;
  height: inherit;
  float: left;
  background-color: $background-color;
  border-right: 1px solid #e6e6e6;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-right: 0;

  :deep(.el-sub-menu__icon-arrow) {
    margin-left: 10px;
  }

  :deep(i) {
    font-size: 24px;
  }

  :deep(.el-sub-menu__icon-arrow) {
    font-size: unset;
  }
}

.el-menu,
.el-menu-item {
  border: none;
}

.row-menu-title {
  margin-right: 20px;
}

.sub-menu-container {
  position: relative;

  .el-badge {
    position: absolute;
    top: -10px;
    left: -10px;
  }
}

.menu-item-container {
  display: flex;
  align-items: center;

  .el-badge {
    margin-left: 5px;
  }
}

.menu-icon-svg {
  width: 32px;
  height: 32px;
  fill: #409eff;
}

.menu-icon {
  display: none;
}

.blur {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 4;
}

@media screen and (max-width: 992px) {
  .admin-side-menu {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
    margin-left: -250px;
  }

  .menu-icon {
    position: absolute;
    top: 14px;
    left: 5px;
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
