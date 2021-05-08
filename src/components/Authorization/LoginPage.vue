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
import { Options, mixins } from 'vue-class-component';
import { mapGetters } from 'vuex';
import MessageMixin from '@/mixins/MessageMixin.vue';

@Options({
  computed: {
    ...mapGetters('auth', ['authError']),
  },
})
export default class LoginPage extends mixins(MessageMixin) {
  authError!: '';

  loginForm = {
    login: '',
    password: '',
  };

  async submitForm(): Promise<void> {
    try {
      await this.$store.dispatch('auth/login', this.loginForm);
    } catch (error) {
      return;
    }

    if (this.authError) {
      this.showMessageError(this.authError);
    }

    if (!this.$store.getters['auth/isAuthorized']) {
      await this.$router.push('/login');
      return;
    }

    await this.$router.push('/patients');
  }
}
</script>
