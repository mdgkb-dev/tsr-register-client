<template>
  <div class="login">
    <el-card class="box-card" style="width: 50%">
      <el-form :status-icon="true" class="login-form" @submit.prevent="submitForm">
        <div class="card-header">
          <h1>Войти в систему</h1>
          <el-button class="button" type="text">Забыли пароль?</el-button>
        </div>
        <el-form-item label="">
          <el-input
            v-model="v$.loginForm.login.$model"
            :class="{ 'wrong-input': v$.loginForm.login.$errors.length > 0 }"
            placeholder="Логин"
          ></el-input>
          <div v-for="(error, loginIndex) of v$.loginForm.login.$errors" :key="loginIndex" :class="['error-message']">
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
          <div v-for="(error, passwordIndex) of v$.loginForm.password.$errors" :key="passwordIndex" :class="['error-message']">
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
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'LoginForm',
  validations() {
    return {
      loginForm: {
        login: {
          required: helpers.withMessage('Пожалуйста, введите логин.', required),
        },
        password: {
          required: helpers.withMessage('Пожалуйста, введите пароль.', required),
        },
      },
    };
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const loginForm: { login: string; password: string } = reactive({
      login: '',
      password: '',
    });
    const v$ = reactive(useVuelidate());

    const submitForm = async (): Promise<void> => {
      try {
        await store.dispatch('auth/login', loginForm);
        store.commit('setLayout', 'main-layout');
        await router.push('/patients');
      } catch (e) {
        console.log(e);
      }
    };

    return {
      loginForm,
      v$,
      submitForm,
    };
  },
});
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
