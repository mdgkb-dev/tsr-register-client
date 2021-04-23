<template>
  <h3>Документы</h3>
  <el-form-item v-for="document in documents" :key="document">
    <h3>{{ document.name }}</h3>
    <div v-for="(field, j) in document.documentFields" :key="j">
      <el-form-item label-width="12vw" :label="field.name" v-if="field.type === 'string'">
        <el-input v-model="documentsValues[`${document.id}`][`${field.id}`].valueString"></el-input>
      </el-form-item>
      <el-form-item label-width="12vw" :label="field.name" v-else-if="field.type === 'number'">
        <el-input-number
          label="field.name"
          v-model="documentsValues[`${document.id}`][`${field.id}`].valueNumber"
        ></el-input-number>
      </el-form-item>
    </div>

    <el-upload
      action=""
      :limit="3"
      :on-preview="download"
      :on-success="onSuccess"
      :on-remove="onRemove"
      :http-request="upload"
      :data="document"
      ref="uploadFile"
      :file-list="documentsScans[document.id]"
    >
      <el-button size="small" type="primary">Загрузить изображение документа</el-button>
    </el-upload>
  </el-form-item>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

import IDocumentScan from '@/interfaces/documentScans/IDocumentScan';
import IDocument from '@/interfaces/documents/IDocument';
import IDocumentFieldValue from '@/interfaces/documents/IDocumentFieldValue';

@Options({
  props: ['in-documents', 'in-documents-scans', 'in-documents-values'],
})
export default class DocumentForm extends Vue {
  // Types.
  inDocumentsScans!: { [id: string]: IDocumentScan[] };

  inDocuments!: IDocument[];

  inDocumentsValues!: { [documentId: string]: { [fieldId: string]: IDocumentFieldValue } };

  // Local state.
  documentsScans = this.inDocumentsScans;

  documents = this.inDocuments;

  documentsValues = this.inDocumentsValues;

  //  документы
  async upload(file: any): Promise<any> {
    const formData = new FormData();
    formData.append('file', file.file);
    formData.append('documentId', file.data.id);
    const res = await this.$store.dispatch('documentsScans/upload', formData);
    const re = await res.json();
    this.documentsScans[file.data.id].push({
      id: re.id as string,
      documentId: re.documentId,
    });
    return re;
  }

  onSuccess(res: any, file: any, fileList: any): void {
    // file.url = res.id;
  }

  async onRemove(file: any): Promise<void> {
    await this.$store.dispatch('documentsScans/delete', file.id);
    for (const document in this.documentsScans) {
      for (const scan of this.documentsScans[document]) {
        if (scan.id === file.id) {
          const i = this.documentsScans[document].findIndex((item: any) => item.id === file.id);
          this.documentsScans[document].splice(i, 1);
        }
      }
    }
    //
    // for (const scan of this.documentsScans!) {
    //   const i = this.documentsScans!.findIndex((item: any) => item.id === file.id);
    //   this.documentsScans!.splice(i, 1);
    // }
  }

  async download(file: any): Promise<void> {
    await this.$store.dispatch('documentsScans/download', file);
  }
}
</script>
