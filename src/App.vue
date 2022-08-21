<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, onMounted } from 'vue';
import { useStore } from 'vuex';

import User from './classes/User';
import TokenService from './services/Token';
import LoginLayout from './views/Login/LoginLayout.vue';
import MainLayout from './views/Main/MainLayout.vue';

export default defineComponent({
  name: 'App',
  components: {
    LoginLayout,
    MainLayout,
  },
  setup() {
    const store = useStore();
    const isAuth = computed(() => store.getters['auth/isAuth']);

    const layout = computed(() => {
      if (isAuth.value) {
        store.commit('setLayout', 'main-layout');
      } else {
        store.commit('setLayout', 'login-layout');
      }
      return store.getters.layout;
    });

    const setLocalStorageToVuex = () => {
      const userData = localStorage.getItem('user');
      const token = TokenService.getAccessToken();
      if (userData && token) {
        const user = new User(JSON.parse(userData));
        store.commit('auth/setTokens', token);
        store.commit('auth/setUser', user);
        store.commit('auth/setIsAuth', true);
      }
    };

    onBeforeMount(async (): Promise<void> => {
      await store.dispatch('meta/getSchema');
      await store.dispatch('search/searchGroups');
    });

    onMounted(() => {
      setLocalStorageToVuex();
    });

    return {
      layout,
    };
  },
});
</script>

<style lang="scss"></style>
