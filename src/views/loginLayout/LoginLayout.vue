<template>
  <el-container class="main-container">
    <el-header style="width: 100%; padding: 0"></el-header>
    <el-main class="container" style="padding: 10%">
      <slot />
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoginLayout',
});
</script>

<style>
#app {
  height: 100%;
}
</style>
