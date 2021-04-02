<template>
  <el-col :span="23"></el-col>
  <el-col :span="1">
    <el-button @click="this.logout()">Выйти</el-button></el-col
  >
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapState } from 'vuex';

@Options({
  computed: {
    ...mapState(['auth']),
  },
})
export default class MainHeader extends Vue {
  userName = '';

  mounted(): void {
    this.userName = this.$store.getters['auth/getUserName'];
    this.userName = this.$store.getters['auth/getUserName'];
  }

  async logout(): Promise<void> {
    await this.$store.dispatch('auth/logout');
    this.$store.commit('setLayout', 'login-layout');
    await this.$router.push('/login');
  }
}
</script>

<style scoped>
.h {
  display: flex;
  justify-content: right;
}
</style>
