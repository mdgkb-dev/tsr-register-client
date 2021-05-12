<template>
  <div class="form-under-collapse">
    <div v-for="document in documents" :key="document">
      <el-row style="margin-bottom: 50px">
        <el-col :span="2">
          <div style="font-weight: bold">{{ document.name }}</div>
        </el-col>
        <el-col :span="22">
          <el-form-item v-for="(field, j) in document.documentFields" :key="j" style="margin-bottom: 10px">
            <el-form-item v-if="field.type === 'string'" :label="field.name">
              <el-input :label="field.name" v-model="documentsValues[`${document.id}`][`${field.id}`].valueString"></el-input>
            </el-form-item>
            <el-form-item v-else-if="field.type === 'number'">
              <el-input-number label="field.name" v-model="documentsValues[`${document.id}`][`${field.id}`].valueNumber"></el-input-number>
            </el-form-item>
            <el-form-item v-else-if="field.type === 'date'">
              <el-date-picker type="date" placeholder="Выберете дату" v-model="documentsValues[`${document.id}`][`${field.id}`].valueDate"></el-date-picker>
            </el-form-item>
          </el-form-item>
        </el-col>

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
      </el-row>
      <el-divider></el-divider>
    </div>
  </div>
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
    const res = await this.$store.dispatch('documentScans/upload', formData);
    const re = await res.json();
    this.documentsScans[file.data.id].push({
      id: re.id as string,
      documentId: re.documentId,
    });
    return re;
  }

  onSuccess = (res: any, file: any): void => {
    // TODO: проверить после переделки доков
    // eslint-disable-next-line no-param-reassign
    file.url = res.id;
  };

  async onRemove(file: any): Promise<void> {
    await this.$store.dispatch('documentScans/delete', file.id);
    for (const document in this.documentsScans) {
      if (Object.prototype.hasOwnProperty.call(this.documentsScans, document)) {
        for (const scan of this.documentsScans[document]) {
          if (scan.id === file.id) {
            const i = this.documentsScans[document].findIndex((item: any) => item.id === file.id);
            this.documentsScans[document].splice(i, 1);
          }
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
    await this.$store.dispatch('documentScans/download', file);
  }
}
</script>
