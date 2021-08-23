<template>
  <el-form :status-icon="true" :model="registrationForm" label-width="130px" @submit.prevent="submitForm">
    <el-form-item label="Логин">
      <el-input v-model="registrationForm.login"></el-input>
    </el-form-item>
    <el-form-item label="Пароль">
      <el-input v-model="registrationForm.password" type="password"></el-input>
    </el-form-item>
    <el-form-item label="Регион">
      <el-select v-model="registrationForm.region" class="width-full">
        <el-option label="Ленинградская область" value="Ленинградская область" />
        <el-option label="Москва" value="Москва" />
        <el-option label="Московская область" value="Московская область" />
        <el-option label="Нижний Новгород" value="Нижний Новгород" />
        <el-option label="Псковская область" value="Псковская область" />
        <el-option label="Санкт-Петербург" value="Санкт-Петербург" />
        <el-option label="Севастополь" value="Севастополь" />
        <el-option label="Томск" value="Томск" />
      </el-select>
    </el-form-item>
    <el-form-item align="right">
      <el-button type="primary" native-type="submit">Зарегистрироваться</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import useMessage from '@/mixins/useMessage';

export default defineComponent({
  name: 'RegistrationPage',
  setup() {
    const store = useStore();
    const router = useRouter();

    const { showMessageError } = useMessage();
    const registrationForm: { login: string; password: string; region: string } = reactive({
      login: '',
      password: '',
      region: '',
    });

    const submitForm = async (): Promise<void> => {
      try {
        await store.dispatch('auth/register', registrationForm);
      } catch (error) {
        return;
      }

      if (!store.getters['auth/isAuth']) {
        showMessageError('Не удалось зарегистрироваться, обратитесь к разработчиками');
        return;
      }

      await router.push('/patients');
    };

    return {
      registrationForm,
      submitForm,
    };
  },
});
</script>
