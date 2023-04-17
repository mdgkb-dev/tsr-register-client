<template>
  <Suspense>
    <component :is="$route.meta.layout || 'AdminLayout'" v-if="mounted">
      <router-view />
    </component>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent, watch } from '@vue/runtime-core';
import { onBeforeMount, Ref, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import AdminLayout from '@/views/adminLayout/AdminLayout.vue';
import LoginLayout from '@/views/loginLayout/LoginLayout.vue';

export default defineComponent({
  name: 'App',
  components: {
    AdminLayout,
    LoginLayout,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const mounted: Ref<boolean> = ref(false);
    watch(route, () => {
      changeDocumentTitle();
    });

    const changeDocumentTitle = () => {
      const defaultTitle = 'ТСР';
      document.title = route.meta.title ? `${route.meta.title} | ТСР` : defaultTitle;
    };

    onBeforeMount(async (): Promise<void> => {
      changeDocumentTitle();
      await store.dispatch('meta/getSchema');
      await store.dispatch('search/searchGroups');
      await store.dispatch('auth/setAuth');
      mounted.value = true;
    });

    return {
      mounted,
    };
  },
});
</script>
