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
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { v4 as uuidv4 } from 'uuid';

import IDocument from '@/interfaces/documents/IDocument';
import IDocumentType from '@/interfaces/documents/IDocumentType';

import Document from '@/classes/documents/Document';
import DocumentFieldValue from '@/classes/documents/DocumentFieldValue';

@Options({
  name: 'DocumentForm',
  props: ['documents', 'documentTypes'],
  emits: ['update:documents'],
})
export default class DocumentForm extends Vue {
  // Types.
  documents!: IDocument[];
  documentTypes!: IDocumentType[];
  tempVariable!: string;

  // Local state.
  selectedDocumentTypeId = '';

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
}
</script>
