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
    <div class="menu-body">
      <div @select="closeDrawer">
        <template v-for="item in menus" :key="item.name">
          <div @click="showMenuBar = false">
            <div
              v-if="item.link !== '/'"
              :class="{ 'selected-menu-item': item.link === activePath, 'menu-item': item.to !== activePath }"
              :index="item.link"
              @click="$router.push(item.link)"
            >
              {{ item.name }}
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="exit-button-container">
      <Button button-class="save-button" text="Выйти" @click="logout" />
    </div>
  </div>
  <MenuIcon />
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, onBeforeUnmount, Ref, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import MenuIcon from '@/assets/svg/Menu.svg';
import Button from '@/components/Base/Button.vue';
import MenusSortsLib from '@/libs/sorts/MenusSortsLib';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import Menu from '@/services/classes/Menu';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'AdminSideMenu',
  components: {
    MenuIcon,
    Button,
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
    const menus: ComputedRef<Menu[]> = computed<Menu[]>(() => store.getters['menus/items' + '']);
    watch(
      () => route.path,
      () => {
        activePath.value = route.path;
      }
    );

    onBeforeMount(async () => {
      const filterQuery = new FilterQuery();
      filterQuery.setSortModel(MenusSortsLib.byOrder());
      await store.dispatch('menus/getAll', { withCache: true, filterQuery });
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

.save-button {
  width: calc(100% - 20px);
  border-radius: 5px;
  height: 34px;
  color: #006bb4;
  background: #dff2f8;
  margin: 0 10px;
  font-size: 14px;
}

.hidden {
  display: none;
}

.exit-button-container {
  margin: 0;
  width: 100%;
  display: flex;
  justify-content: left;
  position: absolute;
  bottom: 50px;
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
  width: 240px;
  position: relative;
  min-height: inherit;
  height: inherit;
  float: left;
  background-color: $background-color;
  border-right: 1px solid #e6e6e6;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0;
  border-right: 1px solid #c4c4c4;
  z-index: 10;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
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

// .menu-body {
// }

.menu-item {
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 0 10px;
  width: calc(100% - 20px);
  height: 60px;
  border-bottom: 1px solid #c4c4c4;
  cursor: pointer;
}

.selected-menu-item {
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 0 10px;
  width: calc(100% - 20px);
  height: 60px;
  background: #dff2f8;
  border-bottom: 1px solid #c4c4c4;
}

.menu-item:hover {
  background: #ffffff;
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
