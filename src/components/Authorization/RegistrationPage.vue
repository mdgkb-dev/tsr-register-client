<template>
  <el-form
    ref="form"
    :status-icon="true"
    :inline-message="true"
    :model="registrationForm"
    label-width="130px"
    :rules="rules"
    :validate-on-rule-change="false"
    @submit.prevent="submitForm"
  >
    <el-form-item label="Логин" prop="login">
      <el-input v-model="registrationForm.login" />
    </el-form-item>
    <el-form-item label="Пароль" prop="password">
      <el-input v-model="registrationForm.password" type="password" />
    </el-form-item>
    <el-form-item label="Регион" prop="region">
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
import { defineComponent, onBeforeMount, reactive, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import createRegistrationFormRules from '@/classes/authorization/RegistrationFormRules';
import IRegistrationFormRules from '@/interfaces/auth/IRegistrationFormRules';
import useMessage from '@/mixins/useMessage';
import useValidate from '@/mixins/useValidate';

export default defineComponent({
  name: 'RegistrationPage',
  setup() {
    const store = useStore();
    const router = useRouter();

    const form = ref();
    const { validate } = useValidate();
    const { showMessageError } = useMessage();
    const registrationForm: { login: string; password: string; region: string } = reactive({
      login: '',
      password: '',
      region: '',
    });

    const rules: Ref<IRegistrationFormRules> = ref({ login: [], password: [], region: [] });

    onBeforeMount(async (): Promise<void> => {
      rules.value = await createRegistrationFormRules(store);
    });

    const submitForm = async (): Promise<void> => {
      if (!validate(form.value)) {
        return;
      }

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
      form,
      registrationForm,
      rules,
      submitForm,
    };
  },
});
</script>
