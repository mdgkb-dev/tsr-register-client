<template>
  <el-container>
    <el-header>Header</el-header>
    <el-main>
      <slot />
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
export default {
  name: "LoginLayout"
};
</script>
