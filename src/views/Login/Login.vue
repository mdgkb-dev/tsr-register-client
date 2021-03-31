<template>
  <div class="login">
    <el-card class="box-card">
      <el-form class="login-form" :model="login">
        <div class="card-header">
          <h1>Войти в систему</h1>
          <el-button class="button" type="text">Забыли пароль?</el-button>
        </div>
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
    </el-card>
  </div>
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
<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.login {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 150px;
}

.login-button {
  width: 100%;
  margin-top: 40px;
}
.login-form {
  width: 400px;
}
</style>
