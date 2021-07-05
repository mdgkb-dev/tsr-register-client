<template>
  <el-container class="main-container" style="height: 100%">
    <MainSidePanel />
    <el-container direction="vertical" style="height: 100%;overflow: visible">
      <el-row style="height: 100%; overflow: auto">
        <div class="page-container" style="overflow: visible;">
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
