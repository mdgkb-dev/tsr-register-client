<template>
  <el-upload
    ref="uploader"
    :multiple="false"
    action="#"
    list-type="picture-card"
    class="avatar-uploader-cover"
    :file-list="fileList"
    :auto-upload="false"
    :limit="parseInt('1')"
    :on-change="toggleUpload"
    :class="{ hideUpload: !showUpload }"
    accept="image/jpeg,image/png,image/jng"
  >
    <template #default>
      <el-icon>
        <Plus />
      </el-icon>
    </template>
    <template #file="{ file }">
      <div>
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
      </div>
      <span class="el-upload-list__item-actions">
        <span class="el-upload-list__item-preview" @click="openCropper(file)">
          <el-icon>
            <ZoomIn />
          </el-icon>
        </span>
        <span class="el-upload-list__item-delete" @click="handleRemove()">
          <el-icon>
            <Delete />
          </el-icon>
        </span>
      </span>
    </template>
  </el-upload>

  <ImageCropper />
</template>

<script lang="ts">
import { Delete, Plus, ZoomIn } from '@element-plus/icons-vue';
import { computed, defineComponent, PropType, Ref, ref, toRefs } from 'vue';
import { useStore } from 'vuex';

import Cropper from '@/classes/cropper/Cropper';
import FileInfo from '@/classes/files/FileInfo';
import ImageCropper from '@/components/ImageCropper.vue';
import IFile from '@/interfaces/files/IFile';
import IFilesList from '@/interfaces/files/IFIlesList';

export default defineComponent({
  name: 'Uploader',
  components: {
    ImageCropper,
    Plus,
    ZoomIn,
    Delete,
  },
  props: {
    storeModule: {
      type: String as PropType<string>,
      default: '',
    },
    fileListGetter: {
      type: String as PropType<string>,
      default: 'fileList',
    },
    fileInfoGetter: {
      type: String as PropType<string>,
      default: 'fileInfo',
    },
    setFileListMutation: {
      type: String as PropType<string>,
      default: 'setFileList',
    },
    setFileMutation: {
      type: String as PropType<string>,
      default: 'setFile',
    },
    removeFileMutation: {
      type: String as PropType<string>,
      default: 'removeFile',
    },
  },
  setup: function (props) {
    const store = useStore();
    const { storeModule, fileListGetter, fileInfoGetter, setFileListMutation, setFileMutation, removeFileMutation } = toRefs(props);
    const fileList: Ref<IFilesList[]> = computed(() => store.getters[`${storeModule.value}/${fileListGetter.value}`]);
    const fileInfo = computed(() => store.getters[`${storeModule.value}/${fileInfoGetter.value}`]);

    let showUpload = ref(fileList.value.length === 0);
    let uploader = ref();

    const openCropper = (file: IFile) => {
      store.commit('cropper/open', Cropper.CreateCropper(file.url, storeModule.value, setFileListMutation.value, 1));
    };
    const toggleUpload = (file: IFile) => {
      showUpload.value = !showUpload.value;
      store.commit(
        `${storeModule.value}/${setFileMutation.value}`,
        FileInfo.CreateFileFromBlob(file, fileInfo.value ? fileInfo.value.id : undefined)
      );
      openCropper(file);
    };

    const handleRemove = () => {
      uploader.value.clearFiles();
      showUpload.value = !showUpload.value;
      store.commit(`${storeModule.value}/${removeFileMutation.value}`);
    };

    return {
      openCropper,
      fileList,
      uploader,
      handleRemove,
      showUpload,
      toggleUpload,
    };
  },
});
</script>

<style lang="scss" scoped>
$news-content-max-width: 312px;
$news-content-max-height: $news-content-max-width;

.hideUpload {
  :deep(.el-upload) {
    display: none;
  }
}

.avatar-uploader-cover {
  height: 300px;
  text-align: center;
}

.custom-plus {
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
}

:deep(.el-upload) {
  width: $news-content-max-width;
  height: $news-content-max-height;
  background: white;
  text-align: center;
  line-height: $news-content-max-height;
}

:deep(.el-upload-list__item) {
  width: $news-content-max-width !important;
  height: $news-content-max-height !important;
}

:deep(.el-upload-list__item-thumbnail) {
  width: $news-content-max-width !important;
  height: $news-content-max-height !important;
}

:deep(.el-upload-list__item) {
  transition: unset;
}
</style>
