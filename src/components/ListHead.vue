<template>
  <el-row>
    <el-col :span="4">
      <h2 small align="center" class="header-top-table" v-html="title"></h2>
    </el-col>
    <el-col :span="4" :offset="15" style="margin-top: 8px" align="right">
      <el-button type="success" round @click="this.$emit('create')">Добавить<i class="el-icon-plus" style="margin-left: 10px"></i></el-button>
    </el-col>
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
