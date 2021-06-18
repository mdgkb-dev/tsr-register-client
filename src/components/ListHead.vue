<template>
  <el-row>
    <el-space style="width: 100%; justify-content: space-between; margin: 8px">
      <h2 small align="center" class="header-top-table" v-html="title"></h2>
      <el-button type="success" round @click="this.$emit('create')">Добавить<i class="el-icon-plus" style="margin-left: 10px"></i></el-button>
    </el-space>
  </el-row>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

@Options({
  props: ['title'],
})
export default class DocumentForm extends Vue {
  // Types.
  title!: string;

  async download(file: any): Promise<void> {
    await this.$store.dispatch('documentScans/download', file);
  }
}
</script>
