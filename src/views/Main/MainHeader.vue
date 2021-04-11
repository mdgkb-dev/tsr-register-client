<template>
  <el-col :span="23"></el-col>
  <!--  <el-col :span="1"> <el-button @click="logout()">Выйти</el-button></el-col>-->
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapState } from 'vuex';

@Options({
  computed: {
    ...mapState(['auth']),
  },
})
export default class MainHeader extends Vue {
  userName = '';

  mounted(): void {
    this.userName = this.$store.getters['auth/getUserName'];
  }
}
</script>

<style scoped>
.h {
  display: flex;
  justify-content: right;
}
</style>
