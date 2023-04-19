<template>
  <div class="human-form-container">
    <div class="line-item">
      <div class="item-left">
        <el-form-item label="Телефон">
          <!-- <el-input v-model="patient.telephoneNumber.number" /> -->
          <el-input v-model="patient.human.name" placeholder="Введите номер" @blur="checkCompleteName"></el-input>
        </el-form-item>
      </div>
      <div class="item-right">
        <el-form-item label="Email">
          <!-- <el-input v-model="patient.telephoneNumber.number" /> -->
          <el-input v-model="patient.human.name" placeholder="Введите Email" @blur="checkCompleteName"></el-input>
        </el-form-item>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref } from 'vue';

import Patient from '@/classes/Patient';

export default defineComponent({
  name: 'ContactForm',
  props: {
    patient: {
      type: Object as PropType<Patient>,
      required: true,
    },
  },
  setup() {
    const form = ref();
    const isToggle: Ref<boolean> = ref(false);

    const toggleAddress = () => {
      isToggle.value = !isToggle.value;
    };

    return {
      toggleAddress,
      isToggle,
      form,
    };
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/elements/base-style.scss';
.human-form-container {
  width: calc(100% - 10px);
  max-width: 768px;
  margin-left: 10px;

  .item-left{
    width: 50%;
    color: #343e5c;
    margin-right: 10px;
  }

  .item-right{
    width: 50%;
    color: #343e5c;
    margin-left: 10px;
  }

  .line-item {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  :deep(.el-form-item) {
    display: block;
    width: 100%;
    margin-bottom: 16px;
  }

  :deep(.el-form-item__content) {
    width: 100%;
  }

  :deep(.el-input__inner) {
    border-radius: 40px;
    padding-left: 25px;
    height: 32px;
    width: 100%;
    display: flex;
    font-family: Comfortaa, Arial, Helvetica, sans-serif;
    font-size: 15px;
    color: $site_dark_gray;
  }

  :deep(.el-input__inner::placeholder) {
    color: $site_light_pink;
  }

  :deep(.el-select .el-input .el-select__caret) {
    color: #343e5c;
    font-size: 15px;
    font-weight: bold;
    margin-right: 5px;
  }

  .el-select {
    width: 100%;
  }

  :deep(.el-input__prefix) {
    left: 230px;
    top: -3px;
  }

  :deep(.el-date-editor.el-input, .el-date-editor.el-input__inner) {
    width: 100%;
  }

  :deep(.el-input__icon) {
    color: #343e5c;
  }

  :deep(.el-input__suffix) {
    top: -3px;
  }

  :deep(.el-form-item__label) {
    color: $site_light_pink;
    padding: 0 !important;
    text-transform: uppercase;
    margin-left: 5px;
    font-size: 14px;
    margin-bottom: 6px;
  }

  :deep(.el-input__prefix) {
    left: auto;
    right: 10px;
  }


  @media screen and (max-width: 730px) {

    .line-item {
      display: flex;
      justify-content: center;
      flex-direction: column;
      width: 100%;
      margin-right: 20px;
    }

    .line-item:last-child {
      margin-right: 0;
    }

    .item-left{
      width: 100%;
      margin-right: 0px;
    }

    .item-right{
      width: 100%;
      margin-left: 0px;
    }
  }
}
</style>
