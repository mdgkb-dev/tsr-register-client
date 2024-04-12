<template>
  <InfoItem
    title="email"
    icon="edit-title"
    :with-open-window="false"
    :with-hover="false"
    border-color="#ffffff"
    base-box-margin="0 0 15px 0"
    padding="0"
    width="100%"
  >
    <el-input v-model="user.userAccount.email" />
  </InfoItem>
  <Button button-class="save-button" text="Создать" @click="create" />
</template>

<script lang="ts" setup>
import User from '@/classes/User';

const emit = defineEmits(['add']);
const user: Ref<User> = ref(User.Create());

const create = async (): Promise<void> => {
  await Store.Create('usersAccounts', user.value.userAccount);
  await Store.Create('users', user.value);
  Provider.store.commit('users/unshiftToAll', user.value);
  emit('add');
};
</script>
<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';
@import '@/assets/styles/elements/base-style.scss';

.save-button {
  width: 300px;
  border-radius: 5px;
  height: 42px;
  color: #006bb4;
  background: #dff2f8;
  margin: 0 auto;
  font-size: 14px;
}
</style>
