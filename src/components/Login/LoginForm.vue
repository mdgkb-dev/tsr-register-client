<template>
  <div class="login">
    <el-card class="box-card">
      <el-form class="login-form" @submit.prevent="submitForm" :model="loginForm">
        <div class="card-header">
          <h1>Войти в систему</h1>
          <el-button class="button" type="text">Забыли пароль?</el-button>
        </div>
        <el-form-item label="">
          <el-input v-model="loginForm.login" placeholder="Логин"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input
            placeholder="Пароль"
            v-model="loginForm.password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">Войти</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class LoginForm extends Vue {
  loginForm = {
    login: '',
    password: '',
  };

  async submitForm(): Promise<void> {
    try {
      await this.$store.dispatch('auth/login', this.loginForm);
      await this.$router.push('/');
      this.$store.commit('setLayout', 'main-layout');
    } catch (e) {
      console.log(e);
    }
  }
}
</script>

<style scoped>
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
