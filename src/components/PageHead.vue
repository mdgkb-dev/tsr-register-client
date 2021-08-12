<template>
  <div class="wrapper">
    <el-affix target=".wrapper">
      <el-row>
        <el-space>
          <el-breadcrumb separator-class="el-icon-arrow-right custom">
            <el-breadcrumb-item v-for="link in links" :key="link" :to="{ path: link.link }">{{ link.text }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
          </el-breadcrumb>
          <el-button v-if="showSaveButton" type="success" round native-type="submit" @click="$emit('submitForm')"
            >Сохранить изменения</el-button
          >
          <el-button v-if="showAddButton" type="success" round @click="$emit('create')"
            >Добавить<i class="el-icon-plus" style="margin-left: 10px"></i
          ></el-button>
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

<style scoped>
.el-row {
  background-color: #eef1f6;
}
.el-space {
  width: 100%;
  justify-content: space-between;
  margin: 20px 8px;
}
</style>
