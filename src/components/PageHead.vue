<template>
  <div class="wrapper">
    <el-affix target=".wrapper">
      <el-row>
        <el-space>
          <el-breadcrumb separator-class="el-icon-arrow-right custom">
            <el-breadcrumb-item v-for="link in links" :key="link" :to="{ path: link.link }">{{ link.text }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
          </el-breadcrumb>
          <el-button type="success" round native-type="submit" v-if="showSaveButton" @click="$emit('submitForm')">Сохранить изменения</el-button>
          <el-button type="success" round v-if="showAddButton" @click="$emit('create')">Добавить<i class="el-icon-plus" style="margin-left: 10px"></i></el-button>
        </el-space>
      </el-row>
    </el-affix>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import Link from '@/classes/shared/Link';

@Options({
  name: 'PageHead',
  props: ['title', 'links', 'showSaveButton', 'showAddButton'],
})
export default class PageHead extends Vue {
  // Types.
  title!: string;
  links!: Link[];
  showSaveButton!: boolean;
  showAddButton!: boolean;
}
</script>

<style lang="scss" scoped>
.wrapper:deep {
  .el-row {
    background-color: #eef1f6;
  }
  .el-space {
    width: 100%;
    justify-content: space-between;
    margin: 20px 8px;
    // position: fixed;
    // top: 0;
    // z-index: 1;
  }
}
</style>
