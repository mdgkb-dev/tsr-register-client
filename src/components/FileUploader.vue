<template>
  <div class="load-containet">
    <el-upload :on-change="changeFileHandler" action="#" :auto-upload="false" class="upload-container" :show-file-list="false" list-type="picture" accept=".pdf, .jpeg, .jpg">
      <Button button-class="save-button" :text="fileInfo && fileInfo.originalName ? 'Обновить' : 'Загрузить'" @click="addFile" />

      <template #tip>
        <div class="flex-block">
          <div v-if="fileInfo && fileInfo.originalName" class="file-name">
            <a :href="fileInfo.getFileUrl()" target="_blank">
              <div>{{ fileInfo.originalName }}</div>
            </a>
          </div>
          <div v-else class="file-name">Файл не загружен</div>
          <Button v-if="fileInfo.originalName" button-class="close-button" icon="close" icon-class="edit-icon" @click="removeFile" />
        </div>
      </template>
    </el-upload>
  </div>
</template>

<script lang="ts">
import { ElNotification } from 'element-plus';
import { defineComponent, PropType } from 'vue';

import FileInfo from '@/classes/files/FileInfo';
import Button from '@/components/Base/Button.vue';
import IFile from '@/interfaces/files/IFile';
import getExtension from '@/services/GetExtension';

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
  emits: ['remove', 'upload'],
  setup(props, { emit }) {
    const changeFileHandler = (file: IFile) => {
      if (!isAcceptedFormat(file.name)) {
        ElNotification.error({
          message: 'Загруженный файл должен быть в формате pdf, jpg или jpeg',
        });
        return;
      }
      console.log(props.fileInfo);
      props.fileInfo.uploadAndSetFile(file);
      emit('upload');
    };
    const removeFile = () => {
      props.fileInfo.clearFile();
      emit('remove');
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
  fill: #c4c4c4;
  padding: 7px;
}

:deep(.edit-icon):hover {
  fill: #e62c21;
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
  margin: 0 10px 0 0;
  font-size: 14px;
}

.close-button {
  width: 42px;
  border-radius: 5px;
  height: 42px;
  color: #c4c4c4;
  background: #ffffff;
  margin: 0;
  font-size: 14px;
}

.close-button:hover {
  color: #e62c21;
  background: #eeb2af;
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
