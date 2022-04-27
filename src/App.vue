<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount } from 'vue';
import { useStore } from 'vuex';

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
    const layout = computed(() => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        store.commit('auth/setIsAuth', true);
        store.commit('setLayout', 'main-layout');
      } else {
        store.commit('auth/setIsAuth', false);
        store.commit('setLayout', 'login-layout');
      }
      return store.getters.layout;
    });

    onBeforeMount(async (): Promise<void> => {
      await store.dispatch('meta/getSchema');
    });

    return {
      layout,
    };
  },
});
</script>

<style lang="scss"></style>
