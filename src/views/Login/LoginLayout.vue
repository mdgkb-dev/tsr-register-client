ь
<template>
  <el-container class="main-container">
    <el-header style="width: 100%; padding: 0">
      <el-menu mode="horizontal" background-color="#f2f2f2" class="no-border display-flex justify-content-right" :router="true">
        <el-menu-item index="/login">Войти</el-menu-item>
        <el-menu-item index="/register">Зарегистрироваться</el-menu-item>
      </el-menu>
    </el-header>
    <el-main class="container" style="padding: 10%">
      <slot />
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  name: 'LoginLayout',
})
export default class LoginLayout extends Vue {}
</script>
<style>
#app {
  height: 100%;
}
</style>
