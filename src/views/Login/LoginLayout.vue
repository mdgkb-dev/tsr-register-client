<template>
  <el-container>
    <el-header>Header</el-header>
    <el-main>
      <slot />
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class LoginLayout extends Vue {}
</script>
