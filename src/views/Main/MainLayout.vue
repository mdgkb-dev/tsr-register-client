<template>
  <el-container class="main-container">
    <MainSidePanel />
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
import { defineComponent } from 'vue';

import MainSidePanel from './MainSidePanel.vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    MainSidePanel,
  },
});
</script>
