<template>
  <div>
    <el-container style="border: 1px solid #eee">
      <MainSidePanel />
      <el-container direction="vertical">
        <el-container>
          <MainHeader />
        </el-container>
        <el-main>
          <slot />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import MainHeader from './MainHeader.vue';
import MainSidePanel from './MainSidePanel.vue';

@Options({
  components: {
    MainHeader,
    MainSidePanel,
  },
})
export default class MainLayout extends Vue {}
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
