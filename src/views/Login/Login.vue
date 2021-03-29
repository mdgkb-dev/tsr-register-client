<template>
  <el-form :inline="true" :model="login" class="demo-form-inline">
    <el-form-item label="">
      <el-input v-model="login.login" placeholder="Логин"></el-input>
    </el-form-item>
    <el-form-item label="">
      <el-input
        placeholder="Пароль"
        v-model="login.password"
        show-password
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Войти</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      login: {
        login: "",
        password: ""
      }
    };
  },
  methods: {
    async onSubmit() {
      try {
        await this.$store.dispatch("auth/login", this.login);
        await this.$router.push("/");
        this.$store.commit("setLayout", "main-layout");
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
