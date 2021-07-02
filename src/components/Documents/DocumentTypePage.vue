<template>
  <div v-if="mount">
    <PageHead :title="title" :links="links" @submitForm="submitForm" :showSaveButton="true" />
    <el-row>
      <div class="table-background" style="width: 100%; margin-bottom: 20px">
        <el-form ref="form" :model="documentType" label-width="10vw" label-position="right" v-if="mount" :rules="rules">
          <el-form-item label="Название документа" prop="name">
            <el-input v-model="documentType.name"></el-input>
          </el-form-item>
          <el-button @click="add" style="margin-bottom: 10px">Добавить поле</el-button>

          <el-table :data="documentType.documentTypeFields" style="width: 100%" class="table-shadow">
            <el-table-column type="index" width="60" align="center" />

            <el-table-column label="Название поля" min-width="250">
              <template #default="scope">
                <el-input v-model="scope.row.name"></el-input>
              </template>
            </el-table-column>

            <el-table-column label="Тип поля" min-width="250">
              <template #default="scope">
                <el-select placeholder="Выберите тип поля" v-model="scope.row.type">
                  <el-option v-for="option in options" :key="option.value" :label="option.label" :value="option.value"> </el-option>
                </el-select>
              </template>
            </el-table-column>

            <el-table-column label="Порядковый номер поля" min-width="250">
              <template #default="scope">
                <el-input-number v-model="scope.row.order"></el-input-number>
              </template>
            </el-table-column>

            <el-table-column fixed="right" width="200">
              <template #default="scope">
                <el-button @click.prevent="remove(scope.row)" round>Удалить поле</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </div>
    </el-row>
  </div>
</template>

<script lang="ts">
import { mixins, Options } from 'vue-class-component';
import { mapActions, mapGetters } from 'vuex';

import DocumentType from '@/classes/documents/DocumentType';
import DocumentTypeField from '@/classes/documents/DocumentTypeField';
import PageHead from '@/components/PageHead.vue';
import IDocumentTypeField from '@/interfaces/documents/IDocumentTypeField';
import BreadCrumbsLinks from '@/mixins/BreadCrumbsLinks.vue';
import ConfirmLeavePage from '@/mixins/ConfirmLeavePage.vue';

@Options({
  name: 'DocumentTypePage',
  components: {
    PageHead,
  },
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
export default class DocumentTypePage extends mixins(BreadCrumbsLinks, ConfirmLeavePage) {
  // Types.
  declare $refs: {
    form: any;
    message: any;
  };
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
    this.pushToLinks(['/document-types'], ['Регистры пациентов']);

    this.mount = true;

    window.addEventListener('beforeunload', this.beforeWindowUnload);
    this.$watch('documentType', this.formUpdated, { deep: true });
  }

  beforeRouteLeave(to: any, from: any, next: any) {
    this.showConfirmModal(this.submitForm, next);
  }

  // Methods.
  async submitForm(): Promise<void> {
    this.saveButtonClick = true;
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

  remove(item: IDocumentTypeField): void {
    const index = this.documentType.documentTypeFields.indexOf(item);
    if (index !== -1) {
      this.documentType.documentTypeFields.splice(index, 1);
    }
  }

  add(): void {
    this.documentType.documentTypeFields.push(new DocumentTypeField());
  }

  cancel(): void {
    this.$router.push('/document-types');
  }
}
</script>
