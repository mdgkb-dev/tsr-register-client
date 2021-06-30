<template>
  <div class="login">
    <el-card class="box-card" style="width: 50%">
      <el-form class="login-form" @submit.prevent="submitForm">
        <div class="card-header">
          <h1>Войти в систему</h1>
          <el-button class="button" type="text">Забыли пароль?</el-button>
        </div>
        <el-form-item label="">
          <el-input v-model="v$.loginForm.login.$model" :class="{ 'wrong-input': v$.loginForm.login.$errors.length > 0 }" placeholder="Логин"></el-input>
          <div :class="['error-message']" v-for="(error, loginIndex) of v$.loginForm.login.$errors" :key="loginIndex">
            {{ error.$message }}
          </div>
        </el-form-item>
        <el-form-item label="">
          <el-input
            v-model="v$.loginForm.password.$model"
            :class="{ 'wrong-input': v$.loginForm.password.$errors.length > 0 }"
            placeholder="Пароль"
            show-password
          ></el-input>
          <div :class="['error-message']" v-for="(error, passwordIndex) of v$.loginForm.password.$errors" :key="passwordIndex">
            {{ error.$message }}
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit" :disabled="!v$.$dirty || (v$.$dirty && v$.$errors.length > 0)">Войти</el-button>
          <div :class="['error-message']">{{ $store.getters['auth/errorMessage'] }}</div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import useVuelidate from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { Options, Vue } from 'vue-class-component';

@Options({
  name: 'LoginForm',
  validations: {
    loginForm: {
      login: {
        required: helpers.withMessage('Пожалуйста, введите логин.', required),
      },
      password: {
        required: helpers.withMessage('Пожалуйста, введите пароль.', required),
      },
    },
  },
})
export default class LoginForm extends Vue {
  loginForm = {
    login: '',
    password: '',
  };

  v$ = useVuelidate();

  async submitForm(): Promise<void> {
    try {
      await this.$store.dispatch('auth/login', this.loginForm);
      this.$store.commit('setLayout', 'main-layout');
      await this.$router.push('/patients');
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
  width: 50%;
}

.login-button {
  width: 100%;
  margin-top: 40px;
}
.login-form {
  width: 50%;
}

.wrong-input {
  border-style: solid;
  border-width: 2px;
  border-color: rgb(252, 191, 102);
  border-radius: 6px;
  height: 40px;
}

.error-message {
  text-align: left;
  padding-left: 5px;
}
</style>
