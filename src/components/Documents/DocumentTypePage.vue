<template>
  <h2>{{ title }}</h2>
  <el-form ref="form" :model="documentType" @submit.prevent="submitForm" label-width="10vw" label-position="right" v-if="mount" :rules="rules">
    <el-form-item label="Название документа" prop="name">
      <el-input v-model="documentType.name"></el-input>
    </el-form-item>

    <el-form-item v-for="(field, i) in documentType.documentTypeFields" :key="i" v-model="documentType.documentTypeFields">
      <el-form-item label="Название поля">
        <el-input v-model="documentType.documentTypeFields[i].name"></el-input>
      </el-form-item>

      <el-select placeholder="Выберите тип поля" v-model="documentType.documentTypeFields[i].type">
        <el-option v-for="option in options" :key="option.value" :label="option.label" :value="option.value"> </el-option>
      </el-select>

      <el-form-item label="Порядковый номер поля" label-width="12vw">
        <el-input-number v-model="documentType.documentTypeFields[i].order"></el-input-number>
      </el-form-item>

      ><el-button @click.prevent="remove(i)">Удалить поле</el-button>
    </el-form-item>

    <el-form-item>
      <el-button @click="add">Добавить поле</el-button>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" native-type="submit">Сохранить</el-button>
      <el-button @click="cancel">Отмена</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { mapActions, mapGetters } from 'vuex';

import DocumentType from '@/classes/documents/DocumentType';
import DocumentTypeField from '@/classes/documents/DocumentTypeField';

@Options({
  computed: {
    ...mapGetters('documentTypes', ['documentType']),
  },
  methods: {
    ...mapActions({
      documentTypesGet: 'documentTypes/get',
      documentTypesGetAll: 'documentTypes/getAll',
    }),
  },
})
export default class DocumentTypePage extends Vue {
  // Types.
  $refs!: {
    form: any;
    message: any;
  };
  $message!: any;
  isEditMode!: boolean;
  documentTypesGet!: (id: string) => Promise<void>;

  // Local state.
  documentType = new DocumentType();
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

  // Lifecycle methods.
  async created(): Promise<void> {
    if (!this.$route.params.documentTypeId) {
      this.isEditMode = false;
      this.title = 'Создать документ';
    } else {
      this.isEditMode = true;
      this.title = 'Редактировать документ';
      await this.documentTypesGet(String(this.$route.params.documentTypeId));
      this.documentType = this.$store.getters['documentTypes/documentType'];
    }
    this.mount = true;
  }

  // Methods.
  async submitForm(): Promise<void> {
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
      await this.$store.dispatch('documentTypes/edit', this.documentType);
    } else {
      await this.$store.dispatch('documentTypes/create', this.documentType);
    }

    this.$router.push('/document-types');
  }

  remove(fieldIndex: number): void {
    if (fieldIndex < 0) {
      return;
    }

    this.documentType.documentTypeFields.splice(fieldIndex, 1);
  }

  add(): void {
    this.documentType.documentTypeFields.push(new DocumentTypeField());
  }

  cancel(): void {
    this.$router.push('/document-types');
  }
}
</script>
