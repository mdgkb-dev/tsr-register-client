<template>
  <div class="wrapper">
    <el-aside width="250px" style="background-color: white; margin-left: 10vh; margin-right: 5vh">
      <div style="background-color: white; position: fixed; width: 250px; height: 100%; display: flex; flex-direction: column; justify-content: space-between">
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
          <h1 class="main-side-menu-user-name">{{ $store.getters['auth/getUserLogin'] }}</h1>
        </div>
        <el-scrollbar>
          <el-menu style="text-align: start">
            <el-menu-item-group :router="true">
              <el-menu :router="true" :default-openeds="[0]">
                <div v-for="(menu, i) in menuItems" :key="menu.title" class="side-menu-elements-font">
                  <el-submenu v-if="menu.links" :index="i.toString()">
                    <template #title>
                      <i :class="menu.class"></i>
                      <span>{{ menu.title }} </span>
                    </template>
                    <div v-for="(item, j) in menu.links" v-bind:key="item.title">
                      <el-menu-item :index="i + '-' + j" :route="{ name: item.name }" class="side-menu-elements-font">
                        <span>{{ item.title }} </span>
                      </el-menu-item>
                    </div>
                  </el-submenu>
                  <el-menu-item v-else :index="i.toString()" :route="{ name: menu.name }" class="side-menu-elements-font">
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
import { Vue } from 'vue-class-component';

export default class MainSidePanel extends Vue {
  circleUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';

  menuItems = [
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
      title: 'Администрирование',
      class: 'el-icon-setting',
      links: [
        {
          name: 'Anthropometry',
          title: 'Антропометрия',
          link: '/anthropometry',
        },
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
      ],
    },
  ];

  async logout(): Promise<void> {
    await this.$store.dispatch('auth/logout');
    await this.$store.dispatch('auth/setAuthorization');
    if (!this.$store.getters['auth/isAuthorized']) {
      this.$store.commit('setLayout', 'login-layout');
    }
    this.$store.commit('setLayout', 'login-layout');
    await this.$router.push('/login');
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
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
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
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
}
</style>
