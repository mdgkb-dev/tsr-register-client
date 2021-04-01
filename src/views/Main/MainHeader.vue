<template>
  <el-header style="text-align: right; font-size: 12px">
    <el-dropdown>
      <i class="el-icon-setting" style="margin-right: 15px"></i>
      <el-dropdown-item @click="this.logout()">Выйти</el-dropdown-item>
    </el-dropdown>
    <span>{{ this.userName }}</span>
  </el-header>
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
    // console.log(this.$store.getters['auth/getUserName']);
    this.userName = this.$store.getters['auth/getUserName'];
  }

  async logout(): Promise<void> {
    await this.$store.dispatch('auth/logout');
    this.$store.commit('setLayout', 'login-layout');
    await this.$router.push('/login');
  }
}
</script>
