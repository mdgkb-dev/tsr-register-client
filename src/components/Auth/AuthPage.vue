<template>
  <AuthComponent />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AuthComponent from './AuthComponent.vue';

export default defineComponent({
  name: 'AuthPage',
  components: { AuthComponent },
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
.card-content {
  width: 60%;
  margin: 50px auto 65px auto;
}

.card-header {
  text-align: center;
}

.reg-item {
  margin-bottom: 0;
}

.warning {
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 15px;
  border: 1px solid #f56c6c;
  color: #f56c6c;
  background-color: lighten(#f56c6c, 25%);
  word-break: break-word;
}
</style>
