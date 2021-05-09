<template>
  <h2>{{ title }}</h2>
  <el-form ref="form" :model="document" @submit.prevent="submitForm" label-width="10vw" label-position="right" v-if="mount" :rules="rules">
    <el-form-item label="Название документа" prop="name">
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
      <el-button type="primary" native-type="submit" >Сохранить</el-button>
      <el-button @click="close">Отмена</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import Document from '@/classes/documents/Document';
import DocumentField from '@/classes/documents/DocumentField';
import IDocument from '@/interfaces/documents/IDocument';
import { mapActions, mapGetters } from 'vuex';

@Options({
  computed: {
    ...mapGetters('documents', ['document']),
  },
  methods: {
    ...mapActions({
      documentGet: 'documents/get',
    }),
  },
})
export default class DocumentPage extends Vue {
  $refs!: {
    form: any;
    message: any;
  };

  $message!: any;

  documentGet!: (documentId: string) => Promise<void>;

  isEditMode!: boolean;
  document: IDocument = new Document();
  title = '';
  mount = false;

  options = [
    { label: 'Строка', value: 'string' },
    { label: 'Число', value: 'number' },
    { label: 'Дата', value: 'date' },
  ];

  rules = {
    name: [
      {
        required: true,
        message: 'Пожалуйста, введите название документа',
        trigger: 'blur',
      },
    ],
  };

  submitForm(): void {
    let validationResult = true;

    this.$refs.form.validate((valid: boolean, errorFields: any) => {
      let errorMessage = '<strong>Проверьте правильность введенных данных:</strong><ul>';
      for (const item of Object.keys(errorFields)) {
        errorMessage += `<li>${errorFields[item][0].message}</li>`;
      }
      errorMessage += '</ul>';
      if (!valid) {
        this.$message({
          dangerouslyUseHTMLString: true,
          message: errorMessage,
          type: 'error',
        });
        validationResult = false;
        return false;
      }
      this.$message({
        message: 'Изменения успешно сохранены',
        type: 'success',
      });
      return true;
    });

    if (!validationResult) {
      return;
    }

    if (this.isEditMode) {
      this.$store.dispatch('documents/edit', this.document);
    } else {
      this.$store.dispatch('documents/create', this.document);
    }
    this.$router.push('/documents');
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
      await this.documentGet(`${this.$route.params.documentId}`);
      this.document = this.$store.getters['documents/document'];
    }
    this.mount = true;
  }
}
</script>
