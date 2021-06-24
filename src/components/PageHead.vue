<template>
  <el-row>
    <el-space style="width: 100%; justify-content: space-between; margin: 20px 8px">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="">
        <el-breadcrumb-item :to="{ path: link }">{{ titleParent }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button type="success" round native-type="submit" v-if="showButton" @click="this.$emit('submitForm')">Сохранить изменения</el-button>
    </el-space>
  </el-row>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

@Options({
  props: ['titleParent', 'title', 'link', 'hideButton'],
})
export default class PageHead extends Vue {
  // Types.
  titleParent!: string;
  title!: string;
  link!: string;
  hideButton!: boolean;
  showButton = true;

  mounted() {
    if (this.hideButton) this.showButton = false;
  }
}
</script>
