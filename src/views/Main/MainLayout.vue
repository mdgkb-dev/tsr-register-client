<template>
  <el-container class="main-container" style="height: 100%">
    <MainSidePanel />
    <!-- <el-container direction="vertical" style="height: 100%;overflow: visible;position: relative">
      <el-row style="height: 100%; overflow: auto;position: relative">
        <div class="page-container" style="overflow: visible;position: relative"> -->
    <!-- <el-container direction="vertical" style="height: 100%; overflow: auto;">
      <el-row style="height: 100%">
        <div class="page-container"> -->
    <!-- <el-container direction="vertical" style="margin-right: 50px">
      <el-row style="margin-right: 50px; height: 100%">
        <div class="page-container"> -->
    <el-container direction="vertical" style="height: 100%; overflow: visible">
      <el-row style="height: 100%; overflow: auto; overflow-x: unset">
        <div class="page-container" style="margin-right: 100px; overflow: visible">
          <slot />
        </div>
      </el-row>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import MainHeader from './MainHeader.vue';
import MainSidePanel from './MainSidePanel.vue';

@Options({
  name: 'MainLayout',
  components: {
    MainHeader,
    MainSidePanel,
  },
})
export default class MainLayout extends Vue {}
</script>
