<template>
  <el-col :span="23"></el-col>
  <el-col :span="1">
    <el-button @click="this.logout()">Выйти</el-button></el-col
  >
</template>
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

<style>
.h {
  display: flex;
  justify-content: right;
}
</style>
