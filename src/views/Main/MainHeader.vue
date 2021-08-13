<template>
  <el-col :span="23"></el-col>
  <!--  <el-col :span="1"> <el-button @click="logout()">Выйти</el-button></el-col>-->
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'MainHeader',
  setup() {
    const store = useStore();

    const userName: ComputedRef = computed(() => store.getters['auth/getUserName']);

    return {
      userName,
    };
  },
});
</script>

<style scoped>
.h {
  display: flex;
  justify-content: right;
}
</style>
