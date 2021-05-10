<template>
  <el-aside width="220px" style="background-color: white; margin-left: 10vh; margin-right: 5vh">
    <el-row style="line-height: 100px; margin-top: 50px">
      <el-col>
        <el-avatar :size="large" :src="circleUrl"></el-avatar>
      </el-col>
    </el-row>
    <el-row style="line-height: 10px">
      <el-col>
        <el-tag class="menu-badge">Пользователь</el-tag>
      </el-col>
    </el-row>
    <h1 class="main-side-menu-user-name">{{ $store.getters['auth/getUserLogin'] }}</h1>
    <el-menu>
      <el-menu-item-group :router="true">
        <el-menu :router="true" :default-openeds="[0]">
          <div v-for="(menu, i) in menuItems" :key="menu.title" class="side-menu-elements-font">
            <el-submenu :index="i">
              <template #title><i :class="menu.class"></i>{{ menu.title }}</template>
              <div v-for="(item, j) in menu.links" v-bind:key="item.title">
                <el-menu-item :index="i + '-' + j" :route="{ name: item.name }" class="side-menu-elements-font">{{ item.title }}</el-menu-item>
              </div>
            </el-submenu>
          </div>
        </el-menu>
      </el-menu-item-group>
    </el-menu>
    <div style="margin-top: 50vh">
      <el-button @click="logout()">Выйти</el-button>
    </div>
  </el-aside>
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
          name: 'Documents',
          title: 'Документы',
          link: '/documents',
        },
        {
          name: 'InsuranceCompanies',
          title: 'Страховые Компании',
          link: '/insurance-companies',
        },
        {
          name: 'Anthropometry',
          title: 'Антропометрия',
          link: '/anthropometry',
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

<style>
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
</style>
