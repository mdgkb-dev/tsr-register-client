<template>
  <el-container>
    <el-header>Header</el-header>
    <el-main>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
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
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
export default {
  name: "LoginLayout",
  data() {
    return {
      login: {
        login: "",
        password: ""
      }
    };
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("login", this.login);
    }
  }
};
</script>
