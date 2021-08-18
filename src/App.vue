<template>
  <component :is="layout" style="height: 100%; margin: 0">
    <router-view />
  </component>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import LoginLayout from './views/Login/LoginLayout.vue';
import MainLayout from './views/Main/MainLayout.vue';
import store from '@/store';

export default defineComponent({
  name: 'App',
  components: {
    LoginLayout,
    MainLayout,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const layout = computed(() => {
      const userId = localStorage.getItem('userId');
      console.log(userId);
      if (userId) {
        store.commit('auth/setIsAuth', true);
        store.commit('setLayout', 'main-layout');
      } else {
        store.commit('auth/setIsAuth', false);
        store.commit('setLayout', 'login-layout');
      }
      return store.getters.layout;
    });

    // onBeforeMount(async (): Promise<void> => {
    //   try {
    //     await store.dispatch('auth/setAuthorization');
    //   } catch (e) {
    //     console.log(e);
    //   }
    //   if (store.getters['auth/isAuthorized']) {
    //     store.commit('setLayout', 'main-layout');
    //   } else {
    //     await router.push('/login/');
    //   }
    // });

    return {
      layout,
    };
  },
});
</script>

<style lang="scss"></style>
