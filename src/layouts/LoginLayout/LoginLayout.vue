<template>
  <div class="container">
    <el-header></el-header>
    <el-main class="container">
      <slot />
    </el-main>
    <el-footer></el-footer>
  </div>
</template>

<script>
export default {
  name: "LoginLayout"
};
</script>
