<template>
  <el-form ref="form" :model="editDocument" label-width="120px">
    <h1>{{ modalTitle }}</h1>
    <el-form-item label="Название документа">
      <el-input v-model="editDocument.name"></el-input>
    </el-form-item>

    <el-form-item
      v-for="field in editDocument.documentFields"
      :key="field.name"
      v-model="editDocument.documentFields"
    >
      <el-form-item label="Название поля">
        <el-input v-model="field.name"></el-input>
      </el-form-item>
      <el-cascader
        placeholder="Выберите тип поля"
        :options="options"
        v-model="field.type"
      ></el-cascader>
      ><el-button @click.prevent="remove(editDocument)">Delete</el-button>
    </el-form-item>

    <el-form-item>
      <el-button @click="add">Добавить поля</el-button>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">Создать</el-button>
      <el-button @click="close">Отмена</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

import IDocument from '@/interfaces/documents/IDocument';

@Options({
  props: ['document', 'is-create-form', 'modal-title'],
})
export default class ModalForm extends Vue {
  document!: IDocument;

  isCreateForm!: boolean;

  editDocument = this.document;

  options = [
    { label: 'Строка', value: 'string' },
    { label: 'Число', value: 'number' },
    { label: 'Дата', value: 'date' },
  ];

  onSubmit(): void {
    if (this.isCreateForm) {
      this.$store.dispatch('documents/create', this.editDocument);
    } else {
      this.$store.dispatch('documents/edit', this.editDocument);
    }
    this.$emit('close');
  }

  close(): void {
    this.$emit('close');
  }

  remove(item: any): void {
    const index = this.editDocument.documentFields!.indexOf(item);
    if (index !== -1) {
      this.editDocument.documentFields!.splice(index, 1);
    }
  }

  add(): void {
    this.editDocument.documentFields!.push({
      name: '',
      type: '',
    });
  }

  beforeUpdate(): void {
    this.editDocument = this.document;
  }
}
</script>
