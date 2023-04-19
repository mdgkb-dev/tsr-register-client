<template>
  <LeftRightContainer leftWidth="280px">
    <template #left>
      <UploaderSingleScan 
        :file-info="patient.human.photo" 
        :height="280" 
        @ratio="(e) => (element.ratio = e)" 
        :default-ratio="1" 
        @remove-file="$classHelper.RemoveFromClassByIndex(index, fileList, fileListForDelete)"
        />
        <div class="left-title">Диагноз</div>
        <div class="left-info">G12.1</div>
        <div class="left-title">Инвалидность</div>
        <div class="left-info">Не установлена</div>
    </template>
    <template #right>
        <PassportForm :patient="patient"/>
        <ContactForm :patient="patient"/>
    </template>
  </LeftRightContainer>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

import Patient from '@/classes/Patient';
import UploaderSingleScan from '@/services/components/UploaderSingleScan.vue';
import LeftRightContainer from '@/components/admin/Patients/LeftRightContainer.vue';
import PassportForm from '@/components/admin/Patients/PassportForm.vue';
import ContactForm from '@/components/admin/Patients/ContactForm.vue';

export default defineComponent({
  name: 'PatientPageInfo',
  components: {
    UploaderSingleScan,
    LeftRightContainer,
    PassportForm,
    ContactForm,
  },
  props: {
    patient: {
      type: Object as PropType<Patient>,
      required: true,
    },
  },
  setup(props) {
    const checked = ref(true);
    const notChecked = ref(false);

    return {
      checked,
      notChecked,
    };
  },
});
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

