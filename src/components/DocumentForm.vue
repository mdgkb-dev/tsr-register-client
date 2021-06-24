<template>
  <div class="form-under-collapse">
    <el-row type="flex" justify="start">
      <el-col :span="12">
        <el-button @click="add">Добавить документ</el-button>
      </el-col>
      <el-col :span="12">
        <el-select v-model="selectedDocumentTypeId" placeholder="Выберите тип документа">
          <el-option v-for="type in documentTypes" :key="type.id" :label="type.name" :value="type.id" />
        </el-select>
      </el-col>
    </el-row>

    <section v-for="document in documents" :key="document.id">
      <h3>
        {{ document.documentType.name }}
        <el-divider direction="vertical" />
        <el-button @click="() => remove(document.id)" type="text" size="small">Удалить</el-button>
      </h3>

      <section v-for="(value, valueIndex) in document.documentFieldValues" :key="value.id">
        <el-form-item v-if="value.documentTypeField.type === 'string'" :label="value.documentTypeField.name" :prop="document.documentFieldValues[valueIndex].valueString">
          <el-input v-model="document.documentFieldValues[valueIndex].valueString" />
        </el-form-item>

        <el-form-item v-if="value.documentTypeField.type === 'number'" :label="value.documentTypeField.name" :prop="document.documentFieldValues[valueIndex].valueString">
          <el-input-number v-model="document.documentFieldValues[valueIndex].valueNumber" />
        </el-form-item>

        <el-form-item v-if="value.documentTypeField.type === 'date'" :label="value.documentTypeField.name" :prop="document.documentFieldValues[valueIndex].valueString">
          <el-date-picker v-model="document.documentFieldValues[valueIndex].valueDate" />
        </el-form-item>
      </section>

      <el-button @click="$refs[document.id].click()" size="mini"> Приложить файлы </el-button>
      <input
        type="file"
        :ref="document.id"
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
            <a v-if="scope.row.isDraft" >{{ scope.row.originalName }}</a>
            <a v-else href="DownloadFile" :data-file-id="scope.row.id" @click.prevent="downloadFile">{{ scope.row.originalName }}</a>
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template #default="scope">
            <el-button @click="() => removeFile(scope.row.id)" type="text" size="small">Удалить</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>

    <a ref="fileAnchor" style="display: none" />
  </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
import { Vue, Options } from 'vue-class-component';
import { v4 as uuidv4 } from 'uuid';

import IDocument from '@/interfaces/documents/IDocument';
import IDocumentType from '@/interfaces/documents/IDocumentType';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IFileAnchor from '@/interfaces/files/IFileAnchor';

import Document from '@/classes/documents/Document';
import DocumentFieldValue from '@/classes/documents/DocumentFieldValue';
import FileInfo from '@/classes/files/FileInfo';

@Options({
  name: 'DocumentForm',
  computed: {
    ...mapGetters('documentTypes', ['documentTypes']),
    ...mapGetters('files', ['fileAnchor']),
  },
  methods: {
    ...mapActions({
      documentTypesGetAll: 'documentTypes/getAll',
      generateDownloadLink: 'files/generateLink',
    }),
  },
  props: ['documents', 'fileInfos'],
  emits: ['update:documents', 'update:fileInfos'],
})
export default class DocumentForm extends Vue {
  // Types.
  declare $refs: {
    fileAnchor: HTMLAnchorElement
  };

  documents!: IDocument[];
  downloadLink!: string;
  fileInfos!: IFileInfo[];

  documentTypesGetAll!: () => Promise<void>;
  generateDownloadLink!: (fileId: string) => Promise<void>;

  // Local state.
  documentTypes: IDocumentType[] = [];
  selectedDocumentTypeId = '';

  // Lifecycle methods.
  async created(): Promise<void> {
    await this.documentTypesGetAll();
    this.documentTypes = [...(await this.$store.getters['documentTypes/documentTypes'])];
  }

  // Methods.
  add(): void {
    const selectedType = this.documentTypes.find((type) => type.id === this.selectedDocumentTypeId);

    if (!selectedType || !selectedType.id || !selectedType?.documentTypeFields) {
      return;
    }

    const documentFieldValues: DocumentFieldValue[] = selectedType.documentTypeFields.map(
      (typeField) => new DocumentFieldValue({ id: uuidv4(), documentTypeField: typeField }),
    );

    const document = new Document({
      id: uuidv4(), documentType: { ...selectedType }, documentFieldValues, isDraft: true,
    });

    this.$emit('update:documents', [...this.documents, document]);
  }

  remove(documentId: string): void {
    this.$emit('update:documents', [...(this.documents.filter((document) => document.id !== documentId))]);
  }

  addFiles(event: InputEvent, category: string): void {
    const target = event.target as HTMLInputElement;

    if (!target || !target.files) {
      return;
    }

    const newInfos: IFileInfo[] = Array.from(target.files).map((file: File) => new FileInfo({
      id: uuidv4(), category, originalName: file.name, file, isDraft: true,
    }));

    this.$emit('update:fileInfos', [...this.fileInfos, ...newInfos]);
  }

  removeFile(fileId: string): void {
    this.$emit('update:fileInfos', this.fileInfos.filter((info) => info.id !== fileId));
  }

  async downloadFile(event: MouseEvent): Promise<void> {
    if (!event || !event.target) {
      return;
    }

    const anchorElement = event.target as HTMLAnchorElement;
    const { fileId } = anchorElement.dataset;

    if (!fileId) {
      return;
    }

    try {
      await this.generateDownloadLink(fileId);
    } catch (error) {
      return;
    }

    const anchor: IFileAnchor = this.$store.getters['files/fileAnchor'];
    this.$refs.fileAnchor.href = anchor.href;
    this.$refs.fileAnchor.download = String(anchor.download);
    this.$refs.fileAnchor.click();
  }
}
</script>
