<template>
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <el-submenu index="1">
        <template #title>
          <span>Navigator One</span>
        </template>
        <el-menu-item-group :router="true">
          <el-menu :router="true">
            <div v-for="item in links" v-bind:key="item.title">
              <el-menu-item :index="item.link" :route="{ name: item.name }">{{
                item.title
              }}</el-menu-item>
            </div>
          </el-menu>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

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

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>

<script>
export default {
  name: "MainAside",
  data() {
    return {
      links: [
        {
          name: "Home",
          title: "Домой",
          link: "/home"
        },
        {
          name: "Humans",
          title: "Персоналии",
          link: "/humans"
        }
      ]
    };
  }
};
</script>
