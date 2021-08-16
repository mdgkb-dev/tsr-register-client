<template>
  <!-- <div class="wrapper"> -->
  <el-affix>
    <div class="head-container">
      <div class="left-side">
        <el-button size="mini" icon="el-icon-menu" class="hidden-lg-and-up" @click="openDrawer"></el-button>
        <el-breadcrumb separator-class="el-icon-arrow-right custom">
          <el-breadcrumb-item v-for="link in links" :key="link" :to="{ path: link.link }">{{ link.text }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-button v-if="showSaveButton" type="success" round native-type="submit" @click="$emit('submitForm')"
        >Сохранить изменения</el-button
      >
      <el-button v-if="showAddButton" type="success" round @click="$emit('create')"
        >Добавить<i class="el-icon-plus" style="margin-left: 10px"></i
      ></el-button>
    </div>
  </el-affix>
  <!-- </div> -->
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useStore } from 'vuex';

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
      default: false,
    },
    showAddButton: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  emits: ['create', 'submitForm'],

  setup() {
    const store = useStore();

    const openDrawer = () => store.commit('drawer/openDrawer');
    return {
      openDrawer,
    };
  },
});
</script>

<style lang="scss" scoped>
.head-container {
  background-color: #eef1f6;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
}
.left-side {
  display: flex;
  align-items: center;

  :deep(.el-button) {
    margin-right: 10px;
  }
}
</style>
