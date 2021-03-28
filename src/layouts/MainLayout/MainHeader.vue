<template>
  <el-header style="text-align: right; font-size: 12px">
    <el-dropdown>
      <i class="el-icon-setting" style="margin-right: 15px"></i>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>View</el-dropdown-item>
          <el-dropdown-item>Add</el-dropdown-item>
          <el-dropdown-item>Delete</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <span>Tom</span>
  </el-header>
</template>
<style>
/*.el-header {*/
/*  background-color: #b3c0d1;*/
/*  color: #333;*/
/*  line-height: 60px;*/
/*}*/
</style>
<script>
export default {
  name: "MainHeader",
};
</script>
