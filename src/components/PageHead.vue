<template>
  <el-row>
    <el-space style="width: 100%; justify-content: space-between; margin: 8px">
      <h2 class="header-top-table">{{ titleParent }} <i class="el-icon-arrow-right"> </i> {{ title }}</h2>
      <el-button type="success" round native-type="submit" @click="this.$emit('submitForm')">Сохранить изменения</el-button>
    </el-space>
  </el-row>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

@Options({
  props: ['title-parent', 'title'],
})
export default class PageHead extends Vue {
  // Types.
  titleParent!: string;
  title!: string;
}
</script>
