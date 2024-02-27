<template>
  <Button text="добавить документ" @click="addFile" />
  <div v-for="documentFileInfo in document.documentFileInfos" :key="documentFileInfo.id">
    {{ documentFileInfo.id }}
    <FileUploader :file-info="documentFileInfo.fileInfo" />
    <Button button-class="del-button" icon="del" icon-class="edit-icon" @click="removeFile(documentFileInfo.id)" />
  </div>
  <div v-for="value in document.documentFieldValues" :key="value.id">
    <el-form-item v-if="value.documentTypeField.valueType.isString()" :label="value.documentTypeField.name" size="mini">
      <el-input v-model="value.valueString" size="mini" @blur="updateDocumentField(value)" />
    </el-form-item>

    <el-form-item v-if="value.documentTypeField.valueType.isNumber()" :label="value.documentTypeField.name" size="mini">
      <el-input-number v-model="document.valueNumber" size="mini" @blur="updateDocumentField(value)" />
    </el-form-item>

    <el-form-item v-if="value.documentTypeField.valueType.isDate()" :label="value.documentTypeField.name" size="mini">
      <el-date-picker
        v-model="value.valueDate"
        format="DD.MM.YYYY"
        type="date"
        placeholder="Выберите дату"
        size="mini"
        @blur="updateDocumentField(value)"
        @change="updateDocumentField(value)"
      />
    </el-form-item>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref } from 'vue';

import Document from '@/classes/Document';
import DocumentFieldValue from '@/classes/DocumentFieldValue';
import Button from '@/services/components/Button.vue';
import FileUploader from '@/components/FileUploader.vue';
import ClassHelper from '@/services/ClassHelper';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'PatientDocumentForm',
  components: {
    Button,
    FileUploader,
  },
  props: {
    storeModule: {
      type: String as PropType<string>,
      default: '',
    },
  },
  setup() {
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

    return {
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
  width: calc(100% - 20px);
  border-radius: 5px;
  color: #00bea5;
  background: #c1efeb;
  height: 60px;
  margin: 0 10px;
}

:deep(.icon-plus) {
  width: 40px;
  height: 40px;
  cursor: pointer;
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
