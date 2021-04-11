<template>
  <el-aside width="220px" style="background-color: rgb(238, 241, 246)">
    <el-avatar :size="large" :src="circleUrl"></el-avatar>

    <el-menu>
      <el-menu-item-group :router="true">
        <el-menu :router="true" :default-openeds="[0]">
          <div v-for="(menu, i) in menuItems" :key="menu.title">
            <el-submenu :index="i">
              <template #title><i :class="menu.class"></i>{{ menu.title }}</template>
              <div v-for="(item, j) in menu.links" v-bind:key="item.title">
                <el-menu-item :index="i + '-' + j" :route="{ name: item.name }">{{
                  item.title
                }}</el-menu-item>
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

<script>
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
}
</script>

<style scoped>
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
