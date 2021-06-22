<template>
  <el-row>
    <el-space style="width: 100%; justify-content: space-between; margin: 20px 8px">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="">
        <el-breadcrumb-item :to="{ path: link }">{{ titleParent }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button type="success" round native-type="submit" @click="this.$emit('submitForm')">Сохранить изменения</el-button>
    </el-space>
  </el-row>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

@Options({
  props: ['title-parent', 'title', 'link'],
})
export default class PageHead extends Vue {
  // Types.
  titleParent!: string;
  title!: string;
  link!: string;
}
</script>
