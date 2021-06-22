<template>
  <el-row>
    <el-space style="width: 100%; justify-content: space-between; margin: 20px 8px">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="">
        <el-breadcrumb-item :replace="true">{{ title }}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button type="success" round v-if="showButton" @click="this.$emit('create')">Добавить<i class="el-icon-plus" style="margin-left: 10px"></i></el-button>
    </el-space>
  </el-row>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

@Options({
  props: ['title', 'hideButton'],
})
export default class ListHead extends Vue {
  // Types.
  title!: string;
  hideButton!: boolean;
  showButton = true;

  mounted() {
    if (this.hideButton) this.showButton = false;
  }
}
</script>x
