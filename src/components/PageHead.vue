<template>
  <el-row>
    <el-col :span="8">
      <h2 class="header-top-table">{{ titleParent }} <i class="el-icon-arrow-right"> </i> {{ title }}</h2>
    </el-col>
    <el-col :span="3" :offset="11" style="margin-top: 8px" align="right">
      <el-affix :offset="20">
        <el-button type="success" round native-type="submit" @click="this.$emit('submitForm')">Сохранить изменения</el-button>
      </el-affix>
    </el-col>
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
