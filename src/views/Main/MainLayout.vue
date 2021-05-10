<template>
  <el-container style="border: 1px solid #eee; background-color: rgb(238, 241, 246); height: 100%">
    <MainSidePanel />
    <el-container direction="vertical" style="margin-right: 50px">
      <el-row style="margin-top: 50px; margin-right: 50px; height: 100%">
        <slot />
      </el-row>
    </el-container>
  </el-container>
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
.container-custom {
  height: 100%;
}
</style>
