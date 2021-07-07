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
      <el-card class="box-card" style="margin-top: 20px; position: relative">
        <h3>{{ document.documentType.name }}</h3>
        <div class="card-button-group">
          <el-tooltip effect="light" placement="top-end" content="Приложить файлы">
            <el-button icon="el-icon-paperclip" @click="$refs[document.id].click()"></el-button>
          </el-tooltip>
          <el-popconfirm
            confirmButtonText="Да"
            cancelButtonText="Отмена"
            icon="el-icon-info"
            iconColor="red"
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
            :prop="document.documentFieldValues[valueIndex].valueString"
            size="mini"
          >
            <el-input v-model="document.documentFieldValues[valueIndex].valueString" size="mini" />
          </el-form-item>

          <el-form-item
            v-if="value.documentTypeField.type === 'number'"
            :label="value.documentTypeField.name"
            :prop="document.documentFieldValues[valueIndex].valueString"
            size="mini"
          >
            <el-input-number v-model="document.documentFieldValues[valueIndex].valueNumber" size="mini" />
          </el-form-item>

          <el-form-item
            v-if="value.documentTypeField.type === 'date'"
            :label="value.documentTypeField.name"
            :prop="document.documentFieldValues[valueIndex].valueString"
            size="mini"
          >
            <el-date-picker v-model="document.documentFieldValues[valueIndex].valueDate" size="mini" />
          </el-form-item>
        </section>

        <input
          type="file"
          :ref="document.id"
          hidden
          multiple
          @change="
            event => {
              addFiles(event, document.id);
            }
          "
        />

        <el-table :data="fileInfos.filter(info => info.category === document.id)" size="mini" style="width: 100%">
          <el-table-column label="Приложенные файлы">
            <template #default="scope">
              {{ scope.row.originalName }}
            </template>
          </el-table-column>
          <el-table-column align="right">
            <template #default="scope">
              <TableButtonGroup
                @download="downloadFile(scope.row.id)"
                @remove="removeFile(scope.row.id)"
                :showRemoveButton="true"
                :showDownloadButton="!scope.row.isDraft"
                :horizontal="true"
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
import { Options, Vue } from 'vue-class-component';
import { mapActions, mapGetters } from 'vuex';

import Document from '@/classes/documents/Document';
import DocumentFieldValue from '@/classes/documents/DocumentFieldValue';
import FileInfo from '@/classes/files/FileInfo';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import IDocument from '@/interfaces/documents/IDocument';
import IDocumentType from '@/interfaces/documents/IDocumentType';
import IFileAnchor from '@/interfaces/files/IFileAnchor';
import IFileInfo from '@/interfaces/files/IFileInfo';

@Options({
  name: 'DocumentForm',
  components: {
    TableButtonGroup,
  },
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
    fileAnchor: HTMLAnchorElement;
  };

  documents!: IDocument[];
  downloadLink!: string;
  fileInfos!: IFileInfo[];
  selectedType!: IDocumentType | undefined;

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
    this.selectedType = this.documentTypes.find((type) => type.id === this.selectedDocumentTypeId);

    if (!this.selectedType || !this.selectedType.id || !this.selectedType?.documentTypeFields) {
      return;
    }

    const documentFieldValues: DocumentFieldValue[] = this.selectedType.documentTypeFields.map(
      (typeField) => new DocumentFieldValue({ id: uuidv4(), documentTypeField: typeField }),
    );

    const document = new Document({
      id: uuidv4(),
      documentType: { ...this.selectedType },
      documentFieldValues,
      isDraft: true,
    });

    this.$emit('update:documents', [...this.documents, document]);
  }

  remove(documentId: string): void {
    this.$emit('update:documents', [...this.documents.filter((document) => document.id !== documentId)]);
  }

  addFiles(event: InputEvent, category: string): void {
    const target = event.target as HTMLInputElement;

    if (!target || !target.files) {
      return;
    }

    const newInfos: IFileInfo[] = Array.from(target.files).map(
      (file: File) => new FileInfo({
        id: uuidv4(),
        category,
        originalName: file.name,
        file,
        isDraft: true,
      }),
    );

    this.$emit('update:fileInfos', [...this.fileInfos, ...newInfos]);
  }

  removeFile(fileId: string): void {
    this.$emit(
      'update:fileInfos',
      this.fileInfos.filter((info) => info.id !== fileId),
    );
  }

  // async downloadFile(event: MouseEvent): Promise<void> {
  //   if (!event || !event.target) {
  //     return;
  //   }

  //   const anchorElement = event.target as HTMLAnchorElement;
  //   const { fileId } = anchorElement.dataset;

  //   if (!fileId) {
  //     return;
  //   }

  //   try {
  //     await this.generateDownloadLink(fileId);
  //   } catch (error) {
  //     return;
  //   }

  //   const anchor: IFileAnchor = this.$store.getters['files/fileAnchor'];
  //   this.$refs.fileAnchor.href = anchor.href;
  //   this.$refs.fileAnchor.download = String(anchor.download);
  //   this.$refs.fileAnchor.click();
  // }
  async downloadFile(fileId: string): Promise<void> {
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
