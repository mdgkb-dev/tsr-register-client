<template>
  <div class="container">
    <el-header>
      <el-menu-item index="/login">Войти</el-menu-item>
      <el-menu-item index="/register">Зарегистрироваться</el-menu-item>
    </el-header>
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
