<template>
  <el-header style="text-align: right; font-size: 12px">
    <el-dropdown>
      <i class="el-icon-setting" style="margin-right: 15px"></i>
      <el-dropdown-item @click="this.logout()">Выйти</el-dropdown-item>
    </el-dropdown>
    <span>{{ this.userName }}</span>
  </el-header>
</template>
<style></style>
<script>
import { mapState } from "vuex";

export default {
  name: "MainHeader",
  data() {
    return {
      userName: ""
    };
  },
  computed: {
    ...mapState(["auth"]) // this getter would return the Promise
  },
  async mounted() {
    this.userName = this.$store.getters["auth/getUserName"];
    console.log(this.$store.getters["auth/getUserName"]);
    this.userName = this.$store.getters["auth/getUserName"];
  },
  methods: {
    async logout() {
      await this.$store.dispatch("auth/logout");
      this.$store.commit("setLayout", "login-layout");
      await this.$router.push("/login");
    }
  }
};
</script>
