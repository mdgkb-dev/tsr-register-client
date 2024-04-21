<template>
  <div v-if="showMenuBar" class="blur" @click="showMenuBar = false" />
  <div class="menu-icon" @click="openMenuBar()">
    <svg class="menu-icon-svg">
      <use xlink:href="#menu-icon" />
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
              @click="Router.To(item.link)"
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

<script lang="ts" setup>
import MenuIcon from '@/assets/svg/Menu.svg';
import MenusSortsLib from '@/libs/sorts/MenusSortsLib';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import Menu from '@/services/classes/Menu';
import Router from '@/services/Router';
const props = defineProps({ isCollapse: { type: Boolean } });

const isCollapseSideMenu = Store.Item('admin', 'isCollapseSideMenu');
const closeDrawer = () => Store.Commit('admin/closeDrawer');
const activePath: Ref<string> = ref('');
const auth = Store.Item('auth', 'auth');
// const applicationsCounts: Ref<IApplicationsCount[]> = computed(() => store.getters['admin/applicationsCounts']);
const mounted = ref(false);
const showMenuBar: Ref<boolean> = ref(false);
// const userPermissions: ComputedRef<IPathPermission[]> = computed(() => store.getters['auth/userPathPermissions']);
const menus: ComputedRef<Menu[]> = Store.Items('menus');

watch(
  () => Router.Route().path,
  () => {
    activePath.value = Router.Route().path;
  }
);

onBeforeMount(async () => {
  const filterQuery = new FilterQuery();
  filterQuery.setSortModel(MenusSortsLib.byOrder());
  await Store.GetAll('menus', { withCache: true, filterQuery });
  activePath.value = Router.Route().path;
  mounted.value = true;
});

onBeforeUnmount(async () => {
  // await store.dispatch('admin/unsubscribeApplicationsCountsGet');
});

const openMenuBar = async () => {
  showMenuBar.value = true;
};

const logout = async () => {
  // auth.value.logout();
  await Router.To('/login');
};
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
