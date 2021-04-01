<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import MainLayout from './views/Main/MainLayout.vue';
import LoginLayout from './views/Login/LoginLayout.vue';

@Options({
  components: {
    MainLayout,
    LoginLayout,
  },
})
export default class App extends Vue {
  get layout(): string {
    if (localStorage.getItem('user-token')) {
      this.$store.commit('setLayout', 'main-layout');
    } else {
      this.$store.commit('setLayout', 'login-layout');
    }

    return this.$store.getters.layout;
  }
}
</script>
