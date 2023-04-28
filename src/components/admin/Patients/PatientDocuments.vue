<template>
  <div class="form-under-collapse">
    <el-row v-if="isEditMode" type="flex" justify="start">
      <el-col :span="12">
        <el-button @click="add">Добавить документ</el-button>
      </el-col>
      <el-col :span="12">
        <el-form-item ref="selectDocType" :error="docTypeError">
          <el-select v-model="selectedDocumentTypeId" placeholder="Выберите тип документа" @change="selectDocTypeEvent">
            <el-option v-for="type in documentTypes" :key="type.id" :label="type.name" :value="type.id" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <section v-for="(document, documentIndex) in documents" :key="document.id">
      <el-card class="box-card" style="margin-top: 20px; position: relative">
        <h3>{{ document.documentType.name }}</h3>
        <div v-if="isEditMode" class="card-button-group">
          <el-tooltip effect="light" placement="top-end" content="Приложить файлы">
            <el-button :icon="Paperclip" @click="$refs[document.id].click()"></el-button>
          </el-tooltip>
          <el-popconfirm
            confirm-button-text="Да"
            cancel-button-text="Отмена"
            :icon="InfoFilled"
            icon-color="red"
            title="Вы уверен, что хотите удалить документ?"
            @confirm="() => remove(document.id)"
            @cancel="() => null"
          >
            <template #reference>
              <el-button class="table-button" :icon="Delete" />
              <el-button :icon="Delete"></el-button>
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
            <el-input v-if="isEditMode" v-model="document.documentFieldValues[valueIndex].valueString" size="mini" />
            <span v-else>{{ value.valueString }}</span>
          </el-form-item>

          <el-form-item
            v-if="value.documentTypeField.type === 'number'"
            :label="value.documentTypeField.name"
            :prop="`human.documents.${documentIndex}.documentFieldValues.${valueIndex}.valueNumber`"
            size="mini"
          >
            <el-input-number v-if="isEditMode" v-model="document.documentFieldValues[valueIndex].valueNumber" size="mini" />
            <span v-else>{{ value.valueNumber }}</span>
          </el-form-item>

          <el-form-item
            v-if="value.documentTypeField.type === 'date'"
            :label="value.documentTypeField.name"
            :prop="`human.documents.${documentIndex}.documentFieldValues.${valueIndex}.valueDate`"
            size="mini"
          >
            <el-date-picker
              v-if="isEditMode"
              v-model="document.documentFieldValues[valueIndex].valueDate"
              format="DD.MM.YYYY"
              type="date"
              placeholder="Выберите дату"
              size="mini"
              @keydown="dateFormat"
            />
            <span v-else>{{ $dateTimeFormatter.format(value.valueDate) }}</span>
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
        <el-table empty-text="Файлов нет" :data="document.fileInfoToDocument" size="mini" style="width: 100%">
          <el-table-column label="Приложенные файлы">
            <template #default="scope">
              {{ scope.row.fileInfo.originalName }}
            </template>
          </el-table-column>
          <el-table-column align="right">
            <template #default="scope">
              <TableButtonGroup
                v-if="isEditMode"
                :show-remove-button="true"
                :show-download-button="!scope.row.fileInfo.isDraft"
                :horizontal="true"
                @download="downloadFile(scope.row.fileInfo.id)"
                @remove="removeFile(scope.row.id)"
              />
              <TableButtonGroup
                v-else
                :show-download-button="!scope.row.fileInfo.isDraft"
                :horizontal="true"
                @download="downloadFile(scope.row.fileInfo.id)"
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
import { Delete, InfoFilled, Paperclip } from '@element-plus/icons-vue';
import { v4 as uuidv4 } from 'uuid';
import { computed, ComputedRef, defineComponent, onBeforeMount, PropType, Ref, ref, toRefs } from 'vue';
import { useStore } from 'vuex';

import Document from '@/classes/documents/Document';
import DocumentFieldValue from '@/classes/documents/DocumentFieldValue';
import FileInfoToDocument from '@/classes/documents/FileInfoToDocument';
import FileInfo from '@/classes/files/FileInfo';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import IDocument from '@/interfaces/documents/IDocument';
import IDocumentType from '@/interfaces/documents/IDocumentType';
import IFileInfoToDocument from '@/interfaces/documents/IFileInfoToDocument';
import IFileAnchor from '@/interfaces/files/IFileAnchor';
import IFileInfo from '@/interfaces/files/IFileInfo';
import dateFormat from '@/services/DateMask';
export default defineComponent({
  name: 'PatientDocuments',
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
    const documents: ComputedRef<IDocument[]> = computed(() => store.getters[`${storeModule.value}/documents`]);
    const fileInfos: ComputedRef<IFileInfo[]> = computed(() => store.getters[`${storeModule.value}/fileInfos`]);
    const documentTypes: ComputedRef<IDocumentType[]> = computed(() => store.getters['documentTypes/documentTypes']);
    const anchorInfo: ComputedRef<IFileAnchor> = computed(() => store.getters['files/fileAnchor']);
    const isEditMode: ComputedRef<boolean> = computed<boolean>(() => store.getters['patients/isEditMode']);

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
        (typeField) => new DocumentFieldValue({ id: uuidv4(), documentTypeField: typeField, documentTypeFieldId: typeField.id })
      );

      const document = new Document({
        id: uuidv4(),
        documentTypeId: selectedType.value.id,
        documentType: { ...selectedType.value },
        documentFieldValues,
        isDraft: true,
        fileInfoToDocument: [],
        fileInfoToDocumentForDelete: [],
      });

      store.commit(`${storeModule.value}/addDocument`, document);
    };

    const remove = (documentId: string): void => store.commit(`${storeModule.value}/removeDocument`, documentId);

    const addFiles = (event: InputEvent, documentId: string): void => {
      const target = event.target as HTMLInputElement;
      if (!target || !target.files) return;
      const newInfos: IFileInfoToDocument[] = Array.from(target.files).map((file: File) => {
        const fileInfo = FileInfo.CreateDraft(file, documentId);
        return new FileInfoToDocument({
          documentId: documentId,
          fileInfoId: fileInfo.id,
          fileInfo: fileInfo,
        });
      });
      store.commit(`${storeModule.value}/addDocumentsFiles`, newInfos);
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

    const filterFilesByDocId = (docId: string): IFileInfo[] => {
      return fileInfos.value.filter((info: IFileInfo) => info.category === docId);
    };

    return {
      filterFilesByDocId,
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
      isEditMode,
      Paperclip,
      InfoFilled,
      Delete,
      dateFormat,
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
