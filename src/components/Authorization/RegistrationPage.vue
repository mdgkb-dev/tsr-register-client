<template>
  <el-form :model="registrationForm" @submit.prevent="submitForm" label-width="130px">
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
import { mixins, Vue } from 'vue-class-component';
import MessageMixin from '@/mixins/MessageMixin.vue';

export default class RegistrationPage extends mixins(MessageMixin) {
  registrationForm = {
    login: '',
    password: '',
    region: '',
  };

  async submitForm(): Promise<void> {
    try {
      await this.$store.dispatch('auth/register', this.registrationForm);
    } catch (error) {
      console.log(error);
      return;
    }

    if (!this.$store.getters['auth/isAuthorized']) {
      this.showMessageError('Не удалось зарегистрироваться, обратитесь к разработчиками');
      return;
    }

    await this.$router.push(`/patients`);
  }
}
</script>
