<template>
  <component :is="layout" style="height: 100%; margin: 0">
    <router-view />
  </component>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import MainLayout from './views/Main/MainLayout.vue';
import LoginLayout from './views/Login/LoginLayout.vue';

@Options({
  components: {
    MainLayout,
    LoginLayout,
  },
})
export default class App extends Vue {
  async mounted(): Promise<void> {
    try {
      await this.$store.dispatch('auth/setAuthorization');
    } catch (e) {
      console.log(e);
    }
    if (this.$store.getters['auth/isAuthorized']) {
      this.$store.commit('setLayout', 'main-layout');
    }
  }

  get layout(): string {
    if (this.$store.getters['auth/isAuthorized']) {
      this.$store.commit('setLayout', 'main-layout');
    } else {
      this.$store.commit('setLayout', 'login-layout');
    }
    return this.$store.getters.layout;
  }
}
</script>

<style lang="scss"></style>
