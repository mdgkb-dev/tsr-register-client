<template>
  <!-- <el-container class="main-container">
    <div class="hidden-md-and-down side-panel-container">
      <MainSidePanel />
    </div>
    <el-container direction="vertical" style="height: 100%; overflow: visible">
      <div class="right-container">
        <MainHeader />
        <div class="page-container">
          <slot />
        </div>
      </div>
    </el-container>
    <MainSideDrawer />
  </el-container> -->
  <div class="main-container">
    <div class="hidden-md-and-down main-container-left">
      <MainSidePanel />
    </div>
    <div class="main-container-right">
      <div class="main-container-right-header">
        <MainHeader />
      </div>
      <div id="slot-container" class="main-container-right-body">
        <slot />
      </div>
    </div>
  </div>
  <MainSideDrawer />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import MainHeader from './MainHeader.vue';
import MainSideDrawer from './MainSideDrawer.vue';
import MainSidePanel from './MainSidePanel.vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    MainSideDrawer,
    MainSidePanel,
    MainHeader,
  },
});
</script>

<style lang="scss" scoped>
$max-side-padding: 160px;
$min-side-padding: 80px;
// Вычитается высота mainHeader
$page-container-height: calc(100vh - 80px);

// .main-container {
//   border: 1px solid #eee;
//   background-color: rgb(238, 241, 246);
//   height: 100%;
//   padding-left: $max-side-padding;
// }

// .right-container {
//   height: 100%;
//   // overflow: auto;
//   // overflow-x: unset;
//   overflow: hidden;
//   padding-right: $max-side-padding;
// }

// .page-container {
//   padding-right: $max-side-padding;
//   height: $page-container-height;
//   overflow: auto;
// }

// .side-panel-container {
//   margin-right: 50px;
// }

// @media only screen and (max-width: 1500px) {
//   .main-container {
//     padding-left: $min-side-padding;
//   }

//   .right-container,
//   .page-container {
//     padding-right: $min-side-padding;
//   }

//   .side-panel-container {
//     margin-right: 30px;
//   }
// }
.main-container {
  padding-left: $max-side-padding;
  background-color: rgb(238, 241, 246);
  height: 100%;
  // display: flex;

  &-left {
    float: left;
    margin-right: 50px;
    height: 100%;
  }
  &-right {
    display: flex;
    flex-direction: column;
    height: 100%;

    &-body {
      height: 100%;
      overflow: auto;
      flex-shrink: 1;
      position: relative;
    }
  }
  &-right-body,
  &-right-header {
    padding-right: $max-side-padding;
  }
}
@media only screen and (max-width: 1500px) {
  .main-container {
    padding-left: $min-side-padding;
    &-left {
      margin-right: 30px;
    }
    &-right-body,
    &-right-header {
      padding-right: $min-side-padding;
    }
  }
}
</style>
