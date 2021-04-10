<template>
  <div class="container">
    <el-header></el-header>
    <el-main class="container">
      <slot />
    </el-main>
    <el-footer></el-footer>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class LoginLayout extends Vue {}
</script>
