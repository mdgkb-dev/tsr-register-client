<template>
  <Suspense>
    <component :is="$route.meta.layout || 'AdminLayout'" v-if="mounted">
      <router-view />
    </component>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import { onBeforeMount, Ref, ref } from 'vue';

import AdminLayout from '@/views/adminLayout/AdminLayout.vue';
import LoginLayout from '@/views/loginLayout/LoginLayout.vue';

import Provider from './services/Provider/Provider';

export default defineComponent({
  name: 'App',
  components: {
    AdminLayout,
    LoginLayout,
  },
  setup() {
    const mounted: Ref<boolean> = ref(false);
    watch(
      () => Provider.route(),
      () => {
        changeDocumentTitle();
      }
    );

    const changeDocumentTitle = () => {
      const defaultTitle = 'ТСР';
      document.title = Provider.route().meta.title ? `${Provider.route().meta.title} | ТСР` : defaultTitle;
    };

    onBeforeMount(async (): Promise<void> => {
      changeDocumentTitle();
      // await Provider.store.dispatch('auth/setAuth');
      mounted.value = true;
    });

    return {
      mounted,
    };
  },
});
</script>
