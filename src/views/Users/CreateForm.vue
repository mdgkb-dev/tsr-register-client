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
import { defineComponent } from "vue";
export default defineComponent({
  name: "CreateForm",

  data() {
    return {
      item: {
        login: "",
        password: ""
      }
    };
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("items/create", this.item);
      this.$emit("close");
    },
    close() {
      this.$emit("close");
    }
  }
});
</script>
