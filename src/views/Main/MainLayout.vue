<template>
  <div class="container">
    <el-container style="border: 1px solid #eee">
      <MainSidePanel />

      <el-container direction="vertical">
        <el-container direction="vertical">
          <el-row style="height: 80px">
            <MainHeader />
          </el-row>
        </el-container>

        <el-main class="container">
          <el-row>
            <slot />
          </el-row>
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
