<template>
  <div class="container">
    <el-container style="border: 1px solid #eee">
      <main-aside></main-aside>
      <el-container direction="vertical">
        <el-container direction="vertical">
          <el-row style="height:80px">
            <main-header></main-header>
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

<script>
// import MainHeader from "@/layouts/MainHeader";
import MainAside from "./MainAside";
import MainHeader from "./MainHeader";
export default {
  name: "MainLayout",
  components: { MainHeader, MainAside }
};
</script>
