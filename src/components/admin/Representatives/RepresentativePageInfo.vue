<template>
  <div class="slider">
    <LeftRightContainer left-width="280px">
      <template #left>
        <UploaderSingleScan
          :file-info="representative.human.photo"
          :height="280"
          :default-ratio="1"
          :emit-crop="true"
          @ratio="(e) => (element.ratio = e)"
          @crop="savePhoto"
        />
      </template>
      <template #right>
        <PassportForm store-module="representatives" :edit-mode="true" />
      </template>
    </LeftRightContainer>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';

import Representative from '@/classes/Representative';
import PassportForm from '@/components/admin/Patients/PassportForm.vue';
import LeftRightContainer from '@/services/components/LeftRightContainer.vue';
import UploaderSingleScan from '@/services/components/UploaderSingleScan.vue';
import Provider from '@/services/Provider/Provider';
export default defineComponent({
  name: 'RepresentativePageInfo',
  components: {
    UploaderSingleScan,
    LeftRightContainer,
    PassportForm,
  },
  setup() {
    const checked = ref(true);
    const notChecked = ref(false);

    const representative: Ref<Representative> = computed(() => Provider.store.getters['representatives/item']);

    const savePhoto = async () => {
      await Provider.store.dispatch('fileInfos/create', representative.value.human.photo);
      representative.value.human.photoId = representative.value.human.photo.id;
      await Provider.store.dispatch('representatives/update');
    };

    return {
      savePhoto,
      representative,
      checked,
      notChecked,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/pageInfo.scss';
@import '@/assets/styles/elements/base-style.scss';

.slider {
  height: auto;
  overflow-y: auto;
}

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

@media screen and (max-width: 2000px) {
  .slider {
    height: 600px;
  }
}

@media screen and (max-width: 820px) {
  .slider {
    height: 450px;
  }
}

@media screen and (max-width: 500px) {
  .slider {
    height: 430px;
  }
}

@media screen and (max-width: 452px) {
  .slider {
    height: 380px;
  }
}
</style>
