<template>
  <div class="head-container">
    <div class="left-side">
      <el-button size="mini" class="hidden-lg-and-up" @click="openDrawer"><MenuOutlined /></el-button>
      <el-breadcrumb separator-class="el-icon-arrow-right custom">
        <el-breadcrumb-item v-for="link in mainHeader.links" :key="link" :to="{ path: link.link }">{{ link.text }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ mainHeader.title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-button v-if="mainHeader.save" type="success" round native-type="submit" @click="mainHeader.save()">Сохранить изменения</el-button>
    <el-button v-if="mainHeader.create" data-test="MainHeadAddButton" type="success" round @click="mainHeader.create()">
      <span>Добавить</span>
      <i class="el-icon-plus" style="margin-left: 10px"></i>
    </el-button>
  </div>
</template>

<script lang="ts">
import { MenuOutlined } from '@ant-design/icons-vue';
import { computed, defineComponent, Ref } from 'vue';
import { useStore } from 'vuex';

import IMainHeader from '@/interfaces/shared/IMainHeader';

export default defineComponent({
  name: 'MainHeader',
  components: { MenuOutlined },
  setup() {
    const store = useStore();
    const openDrawer = (): void => store.commit('main/openDrawer');
    const mainHeader: Ref<IMainHeader[]> = computed(() => store.getters['main/mainHeader']);

    return {
      openDrawer,
      mainHeader,
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
  height: 40px;
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
