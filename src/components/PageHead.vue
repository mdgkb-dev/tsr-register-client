<template>
  <!-- <div class="wrapper"> -->
  <el-affix>
    <div class="head-container">
      <div class="left-side">
        <el-button size="mini" class="hidden-lg-and-up" @click="openDrawer"><MenuOutlined /></el-button>
        <el-breadcrumb separator-class="el-icon-arrow-right custom">
          <el-breadcrumb-item v-for="link in links" :key="link" :to="{ path: link.link }">{{ link.text }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-button v-if="showSaveButton" type="success" round native-type="submit" @click="$emit('submitForm')"
        >Сохранить изменения</el-button
      >
      <el-button v-if="showAddButton" type="success" round data-test="PageHeadAddButton" @click="$emit('create')">
        Добавить<i class="el-icon-plus" style="margin-left: 10px"></i>
      </el-button>
    </div>
  </el-affix>
  <!-- </div> -->
</template>

<script lang="ts">
import { MenuOutlined } from '@ant-design/icons-vue';
import { defineComponent, PropType } from 'vue';
import { useStore } from 'vuex';

import Link from '@/classes/shared/Link';

export default defineComponent({
  name: 'PageHead',
  components: { MenuOutlined },
  props: {
    title: {
      type: String as PropType<string>,
      required: true,
    },
    links: {
      type: Array as PropType<Link[]>,
      default: () => [],
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

    const openDrawer = () => store.commit('main/openDrawer');
    return {
      openDrawer,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  display: flex;
  align-items: center;
}
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
    margin-right: 20px;
    padding: 0;
    border: none;
    background-color: inherit;
  }
  :deep(.anticon) {
    font-size: 25px;
  }
}
</style>
