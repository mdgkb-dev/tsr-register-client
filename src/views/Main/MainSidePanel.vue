<template>
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu>
      <el-menu-item-group :router="true">
        <el-menu :router="true">
          <div v-for="item in links" v-bind:key="item.title">
            <el-menu-item :index="item.link" :route="{ name: item.name }">{{
              item.title
            }}</el-menu-item>
          </div>
        </el-menu>
      </el-menu-item-group>
    </el-menu>
  </el-aside>
</template>

<script>
import { Vue } from 'vue-class-component';

export default class MainSidePanel extends Vue {
  links = [
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
      name: 'Documents',
      title: 'Документы',
      link: '/documents',
    },
  ];
}
</script>

<style>
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
