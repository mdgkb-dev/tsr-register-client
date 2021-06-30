<template>
  <el-row>
    <el-space style="width: 100%; justify-content: space-between; margin: 20px 8px">
      <el-breadcrumb separator-class="el-icon-arrow-right custom">
        <el-breadcrumb-item v-for="link in links" :key="link" :to="{ path: link.link }">{{ link.text }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button type="success" round native-type="submit" v-if="showButton" @click="this.$emit('submitForm')">Сохранить изменения</el-button>
    </el-space>
  </el-row>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import Link from '@/classes/shared/Link';

@Options({
  name: 'PageHead',
  props: ['title', 'links', 'hideButton'],
})
export default class PageHead extends Vue {
  // Types.
  title!: string;
  links!: Link[];
  hideButton!: boolean;
  showButton = true;

  mounted() {
    if (this.hideButton) this.showButton = false;
  }
}
</script>
