<template>
  <div class="auth-card">
    <div class="auth-card-header">
      <h3>{{ auth.getAuthChunkTitle() }}</h3>
    </div>
    <div>
      <el-form ref="form" :model="auth.profile" :label-position="'left'" :rules="rules">
        <el-form-item v-if="auth.showEmailField()" prop="email">
          <el-input v-model="auth.profile.email" placeholder="Email" />
        </el-form-item>
        <el-form-item v-if="auth.showPasswordField()" prop="password">
          <el-input v-model="auth.profile.password" placeholder="Пароль" type="password" />
        </el-form-item>
        <div class="btn-group">
          <Button text="Войти" button-class="save-button" @click="authButtonClick(AuthButton.Login(true))" />
          <!-- Для всех режимов: -->
          <!-- <Button
            v-for="authButton in auth.getAuthButtons()"
            :key="authButton.getStatus()"
            :text="authButton.isSubmit ? 'Продолжить' : authButton.label"
            button-class="save-button"
            @click="authButtonClick(authButton)"
          /> -->
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, ComputedRef, defineComponent, ref } from 'vue';

import Button from '@/components/Base/Button.vue';
import { MyCallbackWithOptParam } from '@/interfaces/elements/Callback';
import Auth from '@/services/classes/auth/Auth';
import AuthButton from '@/services/classes/auth/AuthButton';
import Provider from '@/services/Provider/Provider';
import validate from '@/services/validate';

export default defineComponent({
  name: 'AuthComponent',
  components: {
    Button,
  },
  props: {
    isEvent: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const form = ref();
    const auth: ComputedRef<Auth> = computed(() => Provider.store.getters['auth/auth']);
    const emailExists: ComputedRef<boolean> = computed(() => Provider.store.getters['auth.profiles/emailExists']);

    const emailRule = async (_: unknown, value: string, callback: MyCallbackWithOptParam) => {
      if (!value.trim().length) {
        callback(new Error('Необходимо указать email'));
        return;
      }
      // await store.dispatch('auth.profiles/findEmail', value);
      if (auth.value.isRegister() && value && emailExists.value) {
        callback(new Error('Ведённый email уже существует'));
      }
      callback();
      return;
    };

    const passwordRule = async (_: unknown, value: string, callback: MyCallbackWithOptParam) => {
      if (!value) {
        callback(new Error('Необходимо ввести пароль'));
      } else if (value.length < 6) {
        callback(new Error('Пароль должен быть не менее 6 символов'));
      }
      callback();
      return;
    };
    const rules = ref({
      email: [
        { required: true, validator: emailRule, trigger: 'blur' },
        { type: 'email', message: 'Пожалуйста, введите корректный email', trigger: 'blur' },
      ],
      password: [{ required: true, validator: passwordRule, trigger: 'blur' }],
    });

    const authButtonClick = async (authButton: AuthButton): Promise<void> => {
      if (!authButton.isSubmit) {
        return auth.value.setStatus(authButton.getStatus());
      }
      if (!(await validate(form, false))) {
        return;
      }
      try {
        await Provider.store.dispatch(`auth/${auth.value.status}`);
        const message = auth.value.getSuccessMessage();
        if (message) {
          ElMessage.success(message);
        }
      } catch (e) {
        const message = auth.value.getErrorMessage();
        if (message) {
          ElMessage.error(message);
        }
      }
      auth.value.closeModal();
      await Provider.router.push('/');
    };

    return {
      auth,
      authButtonClick,
      rules,
      form,
      AuthButton,
    };
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/elements/base-style.scss';

h3 {
  font-size: 24px;
  font-weight: bold;
  word-break: break-word;
  margin: 0 0 8px 0;
}

.auth-card {
  background: white;
  padding: 30px 50px;
  text-align: center;
  margin: auto;
  border-radius: $normal-border-radius;
  max-width: 700px;

  &-header {
    display: flex;
    justify-content: space-around;
    margin: 10px 0 10px;
  }
}

.auth-card-header {
  margin-bottom: 15px;
}

.auth-login-link {
  color: blue;
  margin: 10px 0 5px 0;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

.save-button {
  width: 30%;
  max-width: 200px;
  border-radius: 5px;
  height: 42px;
  color: #006bb4;
  background: #dff2f8;
  margin: 10px 10px 0 0;
  font-size: 14px;
}

.save-button:last-child {
  margin: 10px 0 0 0;
}

.btn-group {
  width: 100%;
  display: flex;
  // Для всех режимов:
  // justify-content: space-between;
  justify-content: center;
  flex-wrap: wrap;
}

.auth-btn {
  color: white;
  background-color: #224af2;
}

@media screen and (max-width: 1024px) {
  h3 {
    font-size: 20px;
  }
  h2 {
    font-size: 18px;
  }
  .auth-card {
    width: auto;
  }
}

@media screen and (max-width: 800px) {
  h3 {
    font-size: 18px;
  }
  .auth-card {
    padding: 20px;
  }
  .save-button {
    width: 100%;
    max-width: 100%;
    border-radius: 5px;
    height: 42px;
    color: #006bb4;
    background: #dff2f8;
    margin: 10px 0 0 0;
    font-size: 14px;
  }
}
</style>
