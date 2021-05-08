<template>
  <h2>{{ title }}</h2>
  <el-form ref="form" :model="document" label-width="10vw" label-position="right">
    <el-form-item label="Название документа">
      <el-input v-model="document.name"></el-input>
    </el-form-item>

    <el-form-item v-for="(field, i) in document.documentFields" :key="i" v-model="document.documentFields">
      <el-form-item label="Название поля">
        <el-input v-model="document.documentFields[i].name"></el-input>
      </el-form-item>

      <el-select placeholder="Выберите тип поля" v-model="document.documentFields[i].type">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
      </el-select>

      <el-form-item label="Порядковый номер поля" label-width="12vw">
        <el-input-number v-model="document.documentFields[i].order"></el-input-number>
      </el-form-item>

      ><el-button @click.prevent="remove(field)">Удалить поле</el-button>
    </el-form-item>

    <el-form-item>
      <el-button @click="add">Добавить поле</el-button>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">Сохранить</el-button>
      <el-button @click="close">Отмена</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

import Document from '@/classes/documents/Document';
import DocumentField from '@/classes/documents/DocumentField';

export default class DocumentPage extends Vue {
  isEditMode!: boolean;

  document = new Document();

  title = '';

  options = [
    { label: 'Строка', value: 'string' },
    { label: 'Число', value: 'number' },
    { label: 'Дата', value: 'date' },
  ];

  onSubmit(): void {
    if (this.isEditMode) {
      this.$store.dispatch('documents/edit', this.document);
    } else {
      this.$store.dispatch('documents/create', this.document);
    }
    this.$emit('close');
  }

  remove(item: any): void {
    let index = 0;
    if (this.document.documentFields) {
      index = this.document.documentFields.indexOf(item);
    }
    if (index !== -1 && this.document.documentFields) {
      this.document.documentFields.splice(index, 1);
    }
  }

  add(): void {
    if (this.document.documentFields) {
      this.document.documentFields.push(new DocumentField());
    }
  }

  // Lifecycle methods.
  async created(): Promise<void> {
    if (!this.$route.params.documentId) {
      this.isEditMode = false;
      this.title = 'Создать документ';
    } else {
      this.isEditMode = true;
      this.title = 'Редактировать документ';
      const response = await fetch(`${process.env.VUE_APP_BASE_URL}document/${this.$route.params.documentId}`);
      this.document = await response.json();
    }
  }
}
</script>
