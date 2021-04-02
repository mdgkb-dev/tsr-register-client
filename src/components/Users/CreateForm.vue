<template>
  <el-form ref="form" :model="item" label-width="120px">
    <el-form-item label="Activity name">
      <el-input v-model="item.login"></el-input>
      <el-input v-model="item.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button @click="close">Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class CreateForm extends Vue {
  item = {
    login: '',
    password: '',
  };

  onSubmit(): void {
    this.$store.dispatch('items/create', this.item);
    this.$emit('close');
  }

  close(): void {
    this.$emit('close');
  }
}
</script>
