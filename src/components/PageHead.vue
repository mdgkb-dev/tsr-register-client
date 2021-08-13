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
import { defineComponent, PropType } from 'vue';

import Link from '@/classes/shared/Link';

export default defineComponent({
  name: 'PageHead',
  props: {
    title: {
      type: String as PropType<string>,
      required: true,
    },
    links: {
      type: Array as PropType<Link[]>,
      required: true,
    },
    showSaveButton: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
    showAddButton: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  },
  emits: ['create', 'submitForm'],
});
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
