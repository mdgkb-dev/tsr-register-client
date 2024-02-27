<template>
  <el-form v-if="document.id">
    <Button button-class="plus-button" text="Добавить скан документа" @click="addFile" />
    <div v-for="documentFileInfo in document.documentFileInfos" :key="documentFileInfo.id" class="background-field">
      <FileUploader :file-info="documentFileInfo.fileInfo" @upload="uploadFile(documentFileInfo)" @remove="removeFileInfo(documentFileInfo)" />
      <Button button-class="delete-button" icon-class="edit-icon" text="Удалить файл" @click="removeFile(documentFileInfo.id)" />
    </div>
    <div v-for="value in document.documentFieldValues" :key="value.id" class="margin-field">
      <el-form-item v-if="value.documentTypeField.valueType.isString()" :label="value.documentTypeField.name" size="mini">
        <el-input
          v-if="document.documentType.code === 'snils' && value.documentTypeField.name === 'Номер'"
          v-model="value.valueString"
          v-maska="{ mask: '###-###-### ##', eager: true }"
          size="mini"
          @blur="updateDocumentField(value)"
        />
        <el-input v-else v-model="value.valueString" size="mini" @blur="updateDocumentField(value)" />
      </el-form-item>

      <el-form-item v-if="value.documentTypeField.valueType.isNumber()" :label="value.documentTypeField.name" size="mini">
        <el-input-number v-model="value.valueNumber" size="mini" @blur="updateDocumentField(value)" />
      </el-form-item>
      <el-form-item v-if="value.documentTypeField.valueType.isDate()" :label="value.documentTypeField.name" size="mini">
        <DateInput v-model:model-value="value.valueDate" placeholder="Выбрать" @change="updateDocumentField(value)" @before-change="(date) => value.setDate(date)" />
      </el-form-item>
    </div>
    <Button button-class="delete-document-button" text="Удалить документ" @click="removeDocument" />
  </el-form>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref } from 'vue';

import Document from '@/classes/Document';
import DocumentFieldValue from '@/classes/DocumentFieldValue';
import DocumentFileInfo from '@/classes/DocumentFileInfo';
import FileUploader from '@/components/FileUploader.vue';
import ClassHelper from '@/services/ClassHelper';
import Button from '@/services/components/Button.vue';
import DateInput from '@/services/components/DateInput.vue';
import Provider from '@/services/Provider/Provider';
export default defineComponent({
  name: 'DocumentForm',
  components: {
    Button,
    FileUploader,
    DateInput,
  },
  props: {
    storeModule: {
      type: String as PropType<string>,
      default: '',
    },
  },
  emits: ['remove'],
  setup(_, { emit }) {
    const document: Ref<Document> = computed(() => Provider.store.getters['documents/item']);

    const removeFile = async (id: string) => {
      await Provider.store.dispatch('documentFileInfos/remove', id);
      ClassHelper.RemoveFromClassById(id, document.value.documentFileInfos);
    };

    const addFile = async () => {
      const file = document.value.addFile();
      await Provider.store.dispatch('documentFileInfos/create', file);
    };

    const updateDocumentField = async (field: DocumentFieldValue) => {
      await Provider.store.dispatch('documentFieldValues/update', field);
    };

    const removeDocument = async () => {
      await Provider.store.dispatch('documents/remove', document.value.id);
      emit('remove', document.value.id);
    };
    const uploadFile = async (documentFileInfo: DocumentFileInfo) => {
      await Provider.store.dispatch('fileInfos/create', documentFileInfo.fileInfo);
      documentFileInfo.fileInfoId = documentFileInfo.fileInfo.id;
      await Provider.store.dispatch('documentFileInfos/update', documentFileInfo);
    };

    const removeFileInfo = async (documentFileInfo: DocumentFileInfo) => {
      documentFileInfo.fileInfoId = undefined;
      await Provider.store.dispatch('documentFileInfos/update', documentFileInfo);
    };
    return {
      removeFileInfo,
      uploadFile,
      removeDocument,
      updateDocumentField,
      addFile,
      removeFile,
      document,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';
@import '@/assets/styles/elements/base-style.scss';

.background-field {
  background: $grey-background;
  margin-top: 10px;
  width: calc(100% - 22px);
  padding: 10px;
  border-radius: $normal-border-radius;
  border: $normal-border;
}

.xlsx-button {
  width: auto;
  height: 34px;
  border-radius: 5px;
  color: #006bb4;
  background: #dff2f8;
  font-size: 12px;
}

.back-button {
  background: #ffffff;
  margin: 0 10px 0 0;
  height: 42px;
  font-size: 16px;
  border-radius: 5px;
  color: #343e5c;
}

.chart-button {
  width: 63px;
  height: 42px;
  border-radius: 5px;
  color: #343e5c;
  background: #ffffff;
  font-size: 16px;
}

.hidden {
  display: none;
}

.el-form-item {
  margin: 0;
}

.el-divider {
  margin: 10px 0;
}

.slider-body {
  width: 180px;
  height: auto;
  border: 1px solid #379fff;
  border-top-left-radius: $normal-border-radius;
  border-bottom-left-radius: $normal-border-radius;
  background: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
  display: grid;
  grid-gap: 6px;
  grid-template-rows: repeat(0 0px);
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  padding: 6px;
}

.slider-body > div {
  object-fit: cover;
}

.slider-item {
  width: 163px;
  height: 40px;
  border: 1px solid #b0a4c0;
  border-radius: $normal-border-radius;
  background: $base-background;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 3px;
  font-size: 14px;
  color: #b0a4c0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.slider-item:hover {
  border: 1px solid #379fff;
  background: $base-background;
  color: #379fff;
}

.slider-item-active {
  width: 163px;
  height: 40px;
  border: 1px solid #379fff;
  border-radius: $normal-border-radius;
  background: $custom-background;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 3px;
  font-size: 14px;
  color: #343e5c;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.slider-item:active {
  border: 1px solid #379fff;
  background: $custom-background;
  color: #343e5c;
}

.tabs-item {
  width: 101px;
  height: 51px;
  border: 1px solid #b0a4c0;
  border-top-right-radius: $normal-border-radius;
  border-bottom-right-radius: $normal-border-radius;
  border-left: none;
  background: $base-background;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 3px;
  font-size: 14px;
  color: #b0a4c0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 5px;
  transition: 0.3s;
}

.tabs-item:hover {
  width: 105px;
}

.tabs-item-active {
  position: relative;
  width: 106px;
  height: 56px;
  border: 1px solid #379fff;
  border-top-right-radius: $normal-border-radius;
  border-bottom-right-radius: $normal-border-radius;
  border-left: none;
  background: $custom-background;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 3px;
  font-size: 14px;
  font-weight: bold;
  color: #343e5c;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-left: 0;
  z-index: 2;
}

.tabs-item-active:hover {
  width: 106px;
}

.icon-plus {
  width: 40px;
  height: 40px;
  cursor: pointer;
}

.body {
  width: 100%;
  height: 100%;
  border-right: 1px solid #379fff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
  z-index: 5;
}

.researche-title {
  width: calc(100% - 22px);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  margin: 0 10px;
}

.researche-name {
  min-height: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #343e5c;
  font-size: 14px;
  text-transform: uppercase;
}

.plus-button {
  width: 100%;
  border-radius: 5px;
  height: 42px;
  color: #00bea5;
  background: #c1efeb;
  margin: 0px 10px 0 0;
  font-size: 14px;
}

.delete-button {
  width: 120px;
  border-radius: 5px;
  height: 42px;
  color: #c4c4c4;
  background: #ffffff;
  margin: 2px 10px 0 0;
  font-size: 14px;
}

.delete-button:hover {
  color: #e62c21;
  background: #eeb2af;
}

.delete-document-button {
  width: 100%;
  border-radius: 5px;
  height: 42px;
  color: #c4c4c4;
  background: #ffffff;
  margin: 2px 10px 0 0;
  font-size: 14px;
}

.delete-document-button:hover {
  color: #e62c21;
  background: #eeb2af;
}

.patient-research {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: calc(100% - 32px);
  height: 40px;
  border-radius: $normal-border-radius;
  border: $light-pink-border;
  background: #ffffff;
  padding: 0 10px;
  margin: 10px 10px 10px 0;
  cursor: pointer;
}

.blur {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000000;
  opacity: 0.3;
  z-index: 20;
}

.research-info {
  position: fixed;
  top: 49%;
  left: 50%;
  width: calc(99% - 22px);
  height: calc(98% - 22px);
  transform: translate(-50%, -50%);
  background: #dff2f8;
  border: $light-pink-border;
  border-radius: $normal-border-radius;
  margin: 10px 10px 0 0;
  padding: 10px 10px 10px 10px;
  overflow: hidden;
  overflow-y: auto;
  z-index: 21;
}

.tools {
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
  height: auto;
  padding: 10px 0;
  width: calc(100% - 2px);
  background: #dff2f8;
}

.scroll-block {
  width: 100%;
  height: calc(100% - 220px);
  overflow: hidden;
  overflow-y: auto;
}

.question-item {
  background: #dff2f8;
  border: $light-pink-border;
  border-radius: $normal-border-radius;
  padding: 10px;
  margin-bottom: 10px;
  background: #ffffff;
}

.question-name {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 22px;
  color: #343e5c;
  margin-bottom: 10px;
}

.background-container {
  width: auto;
  padding: 10px;
  margin: 0 10px 10px 10px;
  background: #dff2f8;
  background: #ffffff;
  border-radius: 5px;
  border: 1px solid #c3c3c3;
}

.patient-name {
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 24px;
  height: 40px;
  color: #343e5c;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.researche-title-name {
  font-size: 20px;
  display: block;
  color: #343e5c;
  padding: 10px 0;
}

.researche-counter {
  font-size: 20px;
  color: #379fff;
  display: flex;
  justify-content: right;
  align-items: flex-start;
  text-transform: uppercase;
  white-space: nowrap;
  height: 100%;
}

.control-buttons {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // padding-bottom: 10px;
}

.left {
  min-width: 300px;
  display: flex;
  justify-content: left;
  align-items: center;
}

.right {
  max-width: 300px;
  display: flex;
  justify-content: right;
  align-items: center;
}

.search {
  display: flex;
  justify-content: left;
  align-items: center;
}

.icon-xlsx {
  width: 40px;
  height: 40px;
  fill: #343e5c;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 10px;
}

.icon-xlsx:hover {
  fill: #379fff;
}

.line-item {
  display: flex;
  justify-content: right;
  align-items: center;
  width: calc(100% - 20px);
  margin: 10px 0;
  max-width: 100%;
  height: 54px;
}

.flex-line {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.flex-line2 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.flex-line3 {
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
  height: 60px;
}

.flex-line4 {
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
  height: auto;
  padding: 10px 0;
  color: #00b5a4;
  font-size: 18px;
}

.res-name {
  margin-right: 10px;
}

.save-button {
  width: 100%;
  border-radius: 5px;
  height: 42px;
  color: #006bb4;
  background: #dff2f8;
  margin: 2px 10px 0 0;
  font-size: 14px;
}

:deep(.del-button) {
  width: 42px;
  height: 42px;
  border-radius: 5px;
  background: #ffffff;
  color: #343e5c;
  border: none;
}

:deep(.el-timeline) {
  padding: 0 0 0 10px;
}

:deep(.el-timeline-item) {
  padding-bottom: 8px;
}

:deep(.el-timeline-item__node) {
  background: #b0a4c0;
}

:deep(.el-timeline-item__wrapper) {
  padding-left: 20px;
}

.el-select {
  width: 100%;
}

:deep(.el-date-editor.el-input, .el-date-editor.el-input__inner) {
  width: 100%;
}

:deep(.el-form-item) {
  display: block;
  margin-bottom: 16px;
}

:deep(.el-input__inner) {
  height: 40px;
  width: 100%;
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 15px;
  color: $site_dark_gray;
}

// :deep(.el-input__inner) {
//   height: 34px;
//   display: flex;
//   font-family: Comfortaa, Arial, Helvetica, sans-serif;
//   font-size: 14px;
//   color: $site_dark_gray;
//   padding-left: 0;
//   padding-right: 0;
//   // border: none;
//   width: 100%;
// }

:deep(.el-input__inner::placeholder) {
  color: $site_light_pink;
}

:deep(.el-input__icon) {
  color: $site_dark_gray;
}

:deep(.el-form-item__label) {
  color: $site_light_pink;
  padding: 0 !important;
  text-transform: uppercase;
  margin-left: 5px;
  font-size: 14px;
  margin-bottom: 6px;
}

:deep(.el-input-number__increase) {
  border-radius: 0;
}

:deep(.el-input-number__decrease) {
  border-radius: 0;
}

@media screen and (max-width: 768px) {
  .tabs-item {
    width: 40px;
    height: 100px;
  }

  .tabs-item:hover {
    width: 44px;
  }

  .tabs-item-active {
    position: relative;
    width: 45px;
    height: 100px;
  }

  .tabs-item-active:hover {
    width: 45px;
  }

  .tab-item-text {
    transform: rotate(90deg);
  }
}
</style>
