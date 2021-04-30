<template>
  <el-form :model="loginForm" @submit.prevent="submitForm" label-width="130px">
    <el-form-item label="Логин">
      <el-input v-model="loginForm.login"></el-input>
    </el-form-item>
    <el-form-item label="Пароль">
      <el-input v-model="loginForm.password" type="password"></el-input>
    </el-form-item>
    <el-form-item align="right">
      <el-button type="primary" native-type="submit">Войти</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class LoginPage extends Vue {
  loginForm = {
    login: '',
    password: '',
  };

  async submitForm(): Promise<void> {
    try {
      await this.$store.dispatch('auth/login', this.loginForm);
    } catch (error) {
      console.log(error);
      return;
    }

    if (!this.$store.getters['auth/isAuthorized']) {
      await this.$router.push('/login');
      return;
    }

    await this.$router.push(`/users/${this.$store.getters['auth/getUserId']}/forms`);
  }
}
</script>
