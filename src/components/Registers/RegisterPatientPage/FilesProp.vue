<template>
  <div v-if="prop.valueType.isFiles()">
    <div v-for="(propToFile, i) in registerGroupToPatient.getRegisterPropertyValue(prop, true)" :key="propToFile.id">
      <FileUploader :file-info="propToFile.fileInfo" />
      <el-button
        @click="
          RemoveFromClass(
            i,
            registerGroupToPatient.findProperty(prop.id).registerPropertiesToPatientsToFileInfos,
            registerGroupToPatient.findProperty(prop.id).registerPropertiesToPatientsToFileInfosForDelete
          )
        "
        >Удалить файл</el-button
      >
    </div>
    <el-button @click="registerGroupToPatient.findProperty(prop.id).addPropertyToFile()">Добавить файл</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import FileUploader from '@/components/FileUploader.vue';
import IRegisterGroup from '@/interfaces/IRegisterGroup';
import IRegisterGroupToPatient from '@/interfaces/IRegisterGroupToPatient';
import IRegisterProperty from '@/interfaces/IRegisterProperty';
import RemoveFromClass from '@/services/RemoveFromClass';

export default defineComponent({
  name: 'FilesProp',
  components: { FileUploader },
  props: {
    registerGroupToPatient: {
      type: Object as PropType<IRegisterGroupToPatient>,
      required: true,
    },
    prop: {
      type: Object as PropType<IRegisterProperty>,
      required: true,
    },
    registerGroup: {
      type: Object as PropType<IRegisterGroup>,
      required: true,
    },
  },
  setup() {
    return { RemoveFromClass };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';
.register-property-block {
  background-color: #eef1f6;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  h3 {
    margin-top: 0;
  }
}
.el-form-item {
  margin: 0;
}
.el-divider {
  margin: 10px 0;
}
</style>
