<template>
  <div style="width: 50%; padding-left: 25%">
    <el-form :status-icon="true" :model="loginForm" label-width="130px" @submit.prevent="submitForm">
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
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import useMessage from '@/mixins/useMessage';

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const store = useStore();
    const router = useRouter();
    const loginForm: { login: string; password: string } = reactive({
      login: '',
      password: '',
    });
    const authError: ComputedRef<string> = computed(() => store.getters['auth/authError']);
    const { showMessageError } = useMessage();

    const submitForm = async (): Promise<void> => {
      try {
        await store.dispatch('auth/login', loginForm);
      } catch (error) {
        return;
      }

      if (authError.value) {
        showMessageError(authError.value);
      }

      if (!store.getters['auth/isAuth']) {
        await router.push('/login');
        return;
      }

      await router.push('/patients');
    };

    return {
      loginForm,
      submitForm,
    };
  },
});
</script>
