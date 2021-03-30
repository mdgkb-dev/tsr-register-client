<template>
  <component v-bind:is="layout">
    <router-view />
  </component>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MainLayout from "./layouts/MainLayout/MainLayout.vue";
import LoginLayout from "./layouts/LoginLayout/LoginLayout.vue";

export default defineComponent({
  name: "App",
  components: {
    MainLayout,
    LoginLayout
  },
  computed: {
    layout() {
      if (localStorage.getItem("user-token")) {
        this.$store.commit("setLayout", "main-layout");
      } else {
        this.$store.commit("setLayout", "login-layout");
      }
      return this.$store.getters.layout;
    }
  }
});
</script>
