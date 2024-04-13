<template>
  <LeftRightContainer>
    <template #right>
      <ContactForm store-module="representatives" :edit-mode="true" />
    </template>
  </LeftRightContainer>
</template>

<script lang="ts" setup>
import Representative from '@/classes/Representative';
import Provider from '@/services/Provider/Provider';

const representative: Ref<Representative> = computed(() => Provider.store.getters['representatives/item']);

const savePhoto = async () => {
  await Provider.store.dispatch('fileInfos/create', representative.value.human.photo);
  representative.value.human.photoId = representative.value.human.photo.id;
  await Provider.store.dispatch('representatives/update');
};
</script>

<style lang="scss" scoped>
@import '@/assets/elements/pageInfo.scss';
@import '@/assets/styles/elements/base-style.scss';

.register-tag {
  &:hover {
    cursor: pointer;
    border-width: 2px;
  }
}

:deep(.el-upload--picture-card) {
  width: 150px;
  font-size: 50px;
}

:deep(.el-upload--picture-card i) {
  font-size: 50px;
  color: #00b5a4;
  padding: 0 114px;
}

.left-title {
  font-size: 14px;
  font-weight: bold;
  color: $site_dark_gray;
  margin-top: 28px;
  margin-left: 10px;
  text-transform: uppercase;
}

.left-info {
  font-size: 12px;
  color: $site_dark_gray;
  margin-top: 3px;
  margin-left: 10px;
}
</style>
