<template>
  <el-container class="main-container">
    <div class="hidden-md-and-down side-panel-container">
      <MainSidePanel />
    </div>
    <el-container direction="vertical" style="height: 100%; overflow: visible">
      <!-- <div style="height: 100%; overflow: auto; overflow-x: unset"> -->
      <div class="page-container">
        <slot />
      </div>
      <!-- </div> -->
    </el-container>
    <MainSideDrawer />
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import MainSideDrawer from './MainSideDrawer.vue';
import MainSidePanel from './MainSidePanel.vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    MainSideDrawer,
    MainSidePanel,
  },
});
</script>

<style lang="scss" scoped>
.main-container {
  border: 1px solid #eee;
  background-color: rgb(238, 241, 246);
  height: 100%;
  overflow: visible;
  padding: 0 160px;
}

.page-container {
  margin-right: 100px;
  overflow: visible;
  height: 100%;
  // overflow: auto;
  // overflow-x: unset;
}

.side-panel-container {
  margin-right: 50px;
}

@media only screen and (max-width: 1500px) {
  .main-container {
    padding: 0 80px;
  }
  .side-panel-container {
    margin-right: 30px;
  }
}
</style>
