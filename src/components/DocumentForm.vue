<template>
  <div class="form-under-collapse">
    <el-row type="flex" justify="start">
      <el-col :span="12">
        <el-button @click="add">Добавить документ</el-button>
      </el-col>
      <el-col :span="12">
        <el-form-item ref="selectDocType" :error="docTypeError">
          <el-select @change="selectDocTypeEvent" v-model="selectedDocumentTypeId" placeholder="Выберите тип документа">
            <el-option v-for="type in documentTypes" :key="type.id" :label="type.name" :value="type.id" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <section v-for="(document, documentIndex) in documents" :key="document.id">
      <el-card class="box-card" style="margin-top: 20px; position: relative">
        <h3>{{ document.documentType.name }}</h3>
        <div class="card-button-group">
          <el-tooltip effect="light" placement="top-end" content="Приложить файлы">
            <el-button icon="el-icon-paperclip" @click="$refs[document.id].click()"></el-button>
          </el-tooltip>
          <el-popconfirm
            confirm-button-text="Да"
            cancel-button-text="Отмена"
            icon="el-icon-info"
            icon-color="red"
            title="Вы уверен, что хотите удалить документ?"
            @confirm="() => remove(document.id)"
            @cancel="() => {}"
          >
            <template #reference>
              <el-button class="table-button" icon="el-icon-delete" />
              <el-button icon="el-icon-delete"></el-button>
            </template>
          </el-popconfirm>
        </div>

        <section v-for="(value, valueIndex) in document.documentFieldValues" :key="value.id">
          <el-form-item
            v-if="value.documentTypeField.type === 'string'"
            :label="value.documentTypeField.name"
            :prop="`human.documents.${documentIndex}.documentFieldValues.${valueIndex}.valueString`"
            size="mini"
          >
            <el-input v-model="document.documentFieldValues[valueIndex].valueString" size="mini" />
          </el-form-item>

          <el-form-item
            v-if="value.documentTypeField.type === 'number'"
            :label="value.documentTypeField.name"
            :prop="`human.documents.${documentIndex}.documentFieldValues.${valueIndex}.valueNumber`"
            size="mini"
          >
            <el-input-number v-model="document.documentFieldValues[valueIndex].valueNumber" size="mini" />
          </el-form-item>

          <el-form-item
            v-if="value.documentTypeField.type === 'date'"
            :label="value.documentTypeField.name"
            :prop="`human.documents.${documentIndex}.documentFieldValues.${valueIndex}.valueDate`"
            size="mini"
          >
            <el-date-picker v-model="document.documentFieldValues[valueIndex].valueDate" size="mini" />
          </el-form-item>
        </section>

        <input
          :ref="document.id"
          type="file"
          hidden
          multiple
          @change="
            (event) => {
              addFiles(event, document.id);
            }
          "
        />

        <el-table :data="fileInfos.filter((info) => info.category === document.id)" size="mini" style="width: 100%">
          <el-table-column label="Приложенные файлы">
            <template #default="scope">
              {{ scope.row.originalName }}
            </template>
          </el-table-column>
          <el-table-column align="right">
            <template #default="scope">
              <TableButtonGroup
                :show-remove-button="true"
                :show-download-button="!scope.row.isDraft"
                :horizontal="true"
                @download="downloadFile(scope.row.id)"
                @remove="removeFile(scope.row.id)"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </section>

    <a ref="fileAnchor" style="display: none" />
  </div>
</template>

<script lang="ts">
import { v4 as uuidv4 } from 'uuid';
import { computed, ComputedRef, defineComponent, onBeforeMount, PropType, Ref, ref, toRefs } from 'vue';
import { useStore } from 'vuex';

import Document from '@/classes/documents/Document';
import DocumentFieldValue from '@/classes/documents/DocumentFieldValue';
import FileInfo from '@/classes/files/FileInfo';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import IDocument from '@/interfaces/documents/IDocument';
import IDocumentType from '@/interfaces/documents/IDocumentType';
import IFileAnchor from '@/interfaces/files/IFileAnchor';
import IFileInfo from '@/interfaces/files/IFileInfo';

export default defineComponent({
  name: 'DocumentForm',
  components: {
    TableButtonGroup,
  },
  props: {
    storeModule: {
      type: String as PropType<string>,
      default: '',
    },
  },
  setup(props) {
    const store = useStore();

    const fileAnchor: Ref<HTMLAnchorElement | undefined> = ref<HTMLAnchorElement>();
    const selectedDocumentTypeId: Ref<string> = ref('');
    const selectedType: Ref<IDocumentType | undefined> = ref(undefined);
    const selectDocType = ref();
    const docTypeError = ref('');
    const { storeModule } = toRefs(props);
    const documents: Ref<IDocument[]> = computed(() => store.getters[`${storeModule.value}/documents`]);
    const fileInfos: Ref<IFileInfo[]> = computed(() => store.getters[`${storeModule.value}/fileInfos`]);
    const documentTypes: Ref<IDocumentType[]> = computed(() => store.getters['documentTypes/documentTypes']);
    const anchorInfo: ComputedRef<IFileAnchor> = computed(() => store.getters['files/fileAnchor']);

    onBeforeMount(async (): Promise<void> => {
      await store.dispatch('documentTypes/getAll');
    });

    const selectDocTypeEvent = (): void => {
      docTypeError.value = '';
    };

    const add = (): void => {
      selectedType.value = documentTypes.value.find((type) => type.id === selectedDocumentTypeId.value);

      if (!selectedType.value || !selectedType.value.id || !selectedType.value?.documentTypeFields) {
        docTypeError.value = 'Необходим тип документа';
        return;
      }

      const documentFieldValues: DocumentFieldValue[] = selectedType.value.documentTypeFields.map(
        (typeField) => new DocumentFieldValue({ id: uuidv4(), documentTypeField: typeField })
      );

      const document = new Document({
        id: uuidv4(),
        documentType: { ...selectedType.value },
        documentFieldValues,
        isDraft: true,
      });

      store.commit(`${storeModule.value}/addDocument`, document);
    };

    const remove = (documentId: string): void => store.commit(`${storeModule.value}/removeDocument`, documentId);

    const addFiles = (event: InputEvent, category: string): void => {
      const target = event.target as HTMLInputElement;
      if (!target || !target.files) return;
      const newInfos: IFileInfo[] = Array.from(target.files).map((file: File) => FileInfo.CreateDraft(file, category));
      store.commit(`${storeModule.value}/addFiles`, newInfos);
    };

    const removeFile = (fileId: string): void => store.commit(`${storeModule.value}/removeFile`, fileId);

    const downloadFile = async (fileId: string): Promise<void> => {
      try {
        await store.dispatch('files/generateLink', fileId);
      } catch (error) {
        return;
      }

      if (!fileAnchor.value) return;
      fileAnchor.value.href = anchorInfo.value.href;
      fileAnchor.value.download = String(anchorInfo.value.download);
      fileAnchor.value.click();
    };

    return {
      selectDocTypeEvent,
      docTypeError,
      selectDocType,
      documents,
      documentTypes,
      fileAnchor,
      fileInfos,
      selectedDocumentTypeId,
      add,
      addFiles,
      downloadFile,
      remove,
      removeFile,
    };
  },
});
</script>

<style scoped>
h3 {
  margin-top: 0;
}
.card-button-group {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
