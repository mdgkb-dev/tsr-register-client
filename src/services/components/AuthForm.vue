<template>
  <div class="auth-card">
    <div class="auth-card-header">
      <h3>{{ form.getTitle() }}</h3>
    </div>
    <div>
      <el-form ref="form" :model="form" :label-position="'left'">
        <el-form-item v-if="form.email.show(form.status)" prop="email" label="Почта">
          <el-input v-model="form.email.email" placeholder="Email" />
        </el-form-item>
        <el-form-item v-if="form.password.show(form.status)" prop="password" label="Пароль">
          <el-input v-model="form.password.password" placeholder="Пароль" type="password" />
        </el-form-item>
        <div class="btn-group">
          <Button
            v-for="btn in form.getAuthButtons()"
            :key="btn.getStatus()"
            :text="btn.isSubmit ? 'Продолжить' : btn.label"
            button-class="save-button"
            @click="authButtonClick(btn)"
          />
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AuthForm from '@/services/classes/AuthForm';
import Provider from '@/services/Provider/Provider';
import Message from '@/services/classes/Message';
import AuthButton from '@/services/classes/AuthButton';

const form: ComputedRef<AuthForm> = computed(() => Provider.store.getters['auth/form']);
const modal: ComputedRef<AuthModal> = computed(() => Provider.store.getters['auth/modal']);

const authButtonClick = async (authButton: AuthButton): Promise<void> => {
  // TODO: VALIDATION
  if (!authButton.isSubmit) {
    return form.value.setStatus(authButton.getStatus());
  }
  try {
    await Provider.store.dispatch(`auth/${form.value.getAction()}`);
    Message.Success(form.value.getSuccessMessage());
  } catch (error) {
    return;
  }
  form.value.reset();
  modal.value.close();
  if (form.value.isRestore()) {
    await Provider.router.push('/main');
  }
};
onBeforeUnmount(() => {
  form.value.reset;
});
</script>

<style scoped lang="scss">
.card-content {
  width: 60%;
  margin: 50px auto 65px auto;
}
.card-header {
  text-align: center;
}

.reg-item {
  margin-bottom: 0;
}
</style>
