<template>
  <component :is="layout">
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

<style>
.center-align {
  text-align: center;
  margin-left: 0vw;
}

.container {
  height: 100vh;
  margin: 0;
  padding: 0;
}

.el-form-item__label {
  word-break: normal;
}

.error-message {
  text-align: left;
  padding-left: 5px;
}

.wrong-input {
  border-style: solid;
  border-width: 2px;
  border-color: rgb(252, 191, 102);
  border-radius: 6px;
  height: 40px;
}

el-table {
  width: 100%;
}
</style>
