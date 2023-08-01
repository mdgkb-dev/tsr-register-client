<template>
  <div class="load-containet">
    <el-upload
      :on-change="changeFileHandler"
      action="#"
      :auto-upload="false"
      class="upload-container"
      :show-file-list="false"
      list-type="picture"
      accept=".pdf, .jpeg, .jpg"
    >
      <Button button-class="save-button" @click="addFile" :text="fileInfo && fileInfo.originalName ? 'Обновить' : 'Загрузить'"/>

      <template #tip>
        <div class="flex-block">
          <div v-if="fileInfo && fileInfo.originalName" class="file-name">
            <a :href="fileInfo.getFileUrl()" target="_blank">
              <div>{{ fileInfo.originalName }}</div>
            </a>
          </div>
          <div v-else class="file-name">Файл не загружен</div>
        <Button button-class="close-button" @click="removeFile" icon="close" icon-class="edit-icon"/>
        </div>
      </template>
    </el-upload>
  </div>
</template>

<script lang="ts">
import { ElNotification } from 'element-plus';
import { defineComponent, PropType } from 'vue';

import FileInfo from '@/classes/files/FileInfo';
import IFile from '@/interfaces/files/IFile';
import getExtension from '@/services/GetExtension';
import Button from '@/components/Base/Button.vue';

export default defineComponent({
  name: 'FileUploader',
  components: {
    Button,
  },
  props: {
    fileInfo: {
      type: Object as PropType<FileInfo>,
      required: true,
    },
  },

  setup(props) {
    const changeFileHandler = (file: IFile) => {
      if (!isAcceptedFormat(file.name)) {
        ElNotification.error({
          message: 'Загруженный файл должен быть в формате pdf, jpg или jpeg',
        });
        return;
      }
      props.fileInfo.uploadAndSetFile(file);
    };
    const removeFile = () => {
      props.fileInfo.clearFile();
    };

    function isAcceptedFormat(filename: string): boolean {
      let ext = getExtension(filename);
      switch (ext.toLowerCase()) {
        case 'pdf':
        case 'jpg':
        case 'jpeg':
          return true;
      }
      return false;
    }

    return {
      changeFileHandler,
      removeFile,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

.load-containet {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

:deep(.edit-icon) {
  width: 28px;
  height: 28px;
  fill: #E62C21;
}

.flex-block {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}


.file-name {
  margin-left: 5px;
  display: flex;
  align-items: center;
  a {
    line-height: 1.1;
  }
  .el-button {
    margin-left: 2px;
    padding: 5px;
    margin: 0;
    min-height: unset;
    border: none;
  }
}
.upload-container {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.save-button {
  width: 120px;
  border-radius: 5px;
  height: 42px;
  color: #006bb4;
  background: #dff2f8;
  margin: 0px 10px 0 0;
  font-size: 14px;
}

.close-button {
  width: 42px;
  border-radius: 5px;
  height: 42px;
  color: #E62C21;
  background: #eeb2af;
  margin: 0;
  font-size: 14px;
}

@media screen and (max-width: 1280px) {
  .upload-container {
    display: block;
  }
}

@media screen and (max-width: 1200px) {
  .upload-container {
    display: flex;
  }
}

// @media screen and (max-width: 1024px) {
//   .upload-container {
//     display: block;
//   }
// }
</style>
