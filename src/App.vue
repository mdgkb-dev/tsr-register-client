<template>
  <ion-app>
    <MainLayout>
      <ion-router-outlet />
    </MainLayout>
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";
import MainLayout from "./layouts/MainLayout.vue";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
    MainLayout,
  },
});
</script>
