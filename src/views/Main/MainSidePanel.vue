<template>
  <div class="wrapper">
    <el-aside width="250px" style="background-color: white">
      <div
        style="
          background-color: white;
          position: fixed;
          width: 250px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        "
      >
        <div>
          <el-row style="line-height: 100px; margin-top: 50px">
            <el-col>
              <el-avatar size="large" :src="circleUrl"></el-avatar>
            </el-col>
          </el-row>
          <el-row style="line-height: 10px">
            <el-col>
              <el-tag class="menu-badge">Пользователь</el-tag>
            </el-col>
          </el-row>
          <h1 class="main-side-menu-user-name">{{ userLogin }}</h1>
        </div>
        <el-scrollbar>
          <el-menu style="text-align: start">
            <el-menu-item-group :router="true">
              <el-menu
                id="menu"
                :router="true"
                :default-openeds="[0]"
                :default-active="activeMenu ? activeMenu : activeRoute"
                :unique-opened="true"
                @select="closeDrawer"
              >
                <div v-for="(menu, i) in menuItems" :key="menu.title" class="side-menu-elements-font">
                  <el-sub-menu v-if="menu.links" :index="i.toString()">
                    <template #title>
                      <i :class="menu.class"></i>
                      <span>{{ menu.title }} </span>
                    </template>
                    <div v-for="item in menu.links" :key="item.title">
                      <el-menu-item :id="item.name" :index="item.name" :route="{ name: item.name }" class="side-menu-elements-font">
                        <span>{{ item.title }} </span>
                      </el-menu-item>
                    </div>
                  </el-sub-menu>
                  <el-menu-item v-else :id="menu.name" :index="menu.name" :route="{ name: menu.name }" class="side-menu-elements-font">
                    <i :class="menu.class"></i>
                    <span>{{ menu.title }}</span>
                  </el-menu-item>
                </div>
              </el-menu>
            </el-menu-item-group>
          </el-menu>
        </el-scrollbar>
        <div class="logout-button-container">
          <el-button @click="logout()">Выйти из аккаунта</el-button>
        </div>
      </div>
    </el-aside>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, reactive, Ref, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import IMenuItemMultipleLinks from '@/interfaces/menu/IMenuItemMultipleLinks';
import IMenuItemSingleLink from '@/interfaces/menu/IMenuItemSingleLink';

export default defineComponent({
  name: 'MainSidePanel',
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const activeRoute: Ref<string> = ref('');
    const activeMenu: ComputedRef<string> = computed(() => store.getters['main/activeMenu']);

    onBeforeMount(() => {
      if (route.name) {
        activeRoute.value = route.name.toString();
      }
    });

    const circleUrl: Ref<string> = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png');
    const menuItems: (IMenuItemSingleLink | IMenuItemMultipleLinks)[] = reactive([
      {
        title: 'Персоналии',
        class: 'el-icon-user-solid',
        links: [
          {
            name: 'Patients',
            title: 'Пациенты',
            link: '/patients',
          },
          {
            name: 'Representatives',
            title: 'Представители',
            link: '/representatives',
          },
          {
            name: 'Disabilities',
            title: 'Инвалидность',
            link: '/disabilities',
          },
          {
            name: 'PatientsDocumentsList',
            title: 'Документы пациентов',
            link: '/patients/documents-list',
          },
        ],
      },
      {
        title: 'Справочники',
        class: 'el-icon-notebook-2',
        links: [
          {
            name: 'Mkb',
            title: 'МКБ10',
            link: '/mkb',
          },
          {
            name: 'InsuranceCompanies',
            title: 'Страховые Компании',
            link: '/insurance-companies',
          },
        ],
      },
      {
        title: 'Регистры',
        class: 'el-icon-s-order',
        name: 'RegisterLinkList',
        link: '/register-link-list',
      },
      {
        title: 'Лекарства',
        class: 'el-icon-first-aid-kit',
        name: 'DrugsList',
        link: '/grugs',
      },
      {
        title: 'Администрирование',
        class: 'el-icon-setting',
        links: [
          {
            name: 'Users',
            title: 'Пользователи',
            link: 'users',
          },
          {
            name: 'DocumentTypes',
            title: 'Типы документов',
            link: '/document-types',
          },
          {
            name: 'RepresentativeTypes',
            title: 'Типы представителей',
            link: '/representative-types',
          },
          {
            name: 'Registers',
            title: 'Регистры пациентов',
            link: '/registers',
          },
          {
            name: 'RegisterGroups',
            title: 'Группы для регистров',
            link: '/register-groups',
          },
          {
            name: 'RegisterProperties',
            title: 'Свойства для регистров',
            link: '/register-properties',
          },
          {
            name: 'RegisterExports',
            title: 'Экспорт регистров',
            link: '/register-exports',
          },
          {
            name: 'HistoryList',
            title: 'Архив',
            link: '/history',
          },
        ],
      },
    ]);

    const userLogin: ComputedRef = computed(() => store.getters['auth/getUserLogin']);
    const closeDrawer = () => store.commit('main/closeDrawer');

    const logout = async (): Promise<void> => {
      await store.dispatch('auth/logout');
      await store.dispatch('auth/setAuthorization');

      if (!store.getters['auth/isAuthorized']) {
        store.commit('setLayout', 'login-layout');
      }

      await router.push('/login');
    };

    return {
      circleUrl,
      menuItems,
      userLogin,
      logout,
      closeDrawer,
      activeRoute,
      activeMenu,
    };
  },
});
</script>

<style scoped>
.menu-badge {
  width: 50%;
  background-color: rgba(238, 55, 116, 255);
  border-radius: 25px;
  color: white;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  /* line-height: 260px; */
}

.el-container:nth-child(7) .el-aside {
  /* line-height: 320px; */
}

.el-menu-item.is-active,
.el-menu-item.is-active i {
  background-color: #3370ff !important;
  color: #fff;
}

i {
  color: #3370ff;
}

.logout-button-container {
  height: 150px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
