<template>
  <div v-if="mount">
    <PageHead :title="title" :links="links" @submitForm="submitForm" :showSaveButton="true" />
    <el-row>
      <div class="table-background" style="width: 100%; margin-bottom: 20px">
        <el-form :status-icon="true" :inline-message="true" ref="form" :model="documentType" label-width="10vw" label-position="right" :rules="rules">
          <el-form-item label="Название документа" prop="name">
            <el-input v-model="documentType.name"></el-input>
          </el-form-item>
          <el-button @click="add" style="margin-bottom: 10px">Добавить поле</el-button>

          <el-table :data="documentType.documentTypeFields" style="width: 100%" class="table-shadow" header-row-class-name="header-style">
            <el-table-column type="index" width="60" align="center" />

            <el-table-column label="Название поля" min-width="250" align="center">
              <template #default="scope">
                <el-form-item label-width="0" style="margin-bottom: 0" :prop="'documentTypeFields.' + scope.$index + '.name'" :rules="rules.rowName">
                  <el-input v-model="scope.row.name"></el-input>
                </el-form-item>
              </template>
            </el-table-column>

            <el-table-column label="Тип поля" min-width="250" align="center">
              <template #default="scope">
                <el-form-item label-width="0" style="margin-bottom: 0" :prop="'documentTypeFields.' + scope.$index + '.type'" :rules="rules.rowType">
                  <el-select placeholder="Выберите тип поля" v-model="scope.row.type">
                    <el-option v-for="option in options" :key="option.value" :label="option.label" :value="option.value"> </el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>

            <el-table-column label="Порядковый номер поля" min-width="250" align="center">
              <template #default="scope">
                <el-form-item label-width="0" style="margin-bottom: 0" :prop="'documentTypeFields.' + scope.$index + '.order'" :rules="rules.rowNumber">
                  <el-input-number size="medium" v-model="scope.row.order" min="0" style="width: 120px"></el-input-number>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column width="40" fixed="right" align="center">
              <template #default="scope">
                <TableButtonGroup @remove="remove(scope.row)" :showRemoveButton="true" />
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
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { mapActions, mapGetters } from 'vuex';

import DocumentType from '@/classes/documents/DocumentType';
import DocumentTypeField from '@/classes/documents/DocumentTypeField';
import DocumentTypeRules from '@/classes/documents/DocumentTypeRules';
import PageHead from '@/components/PageHead.vue';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import IDocumentTypeField from '@/interfaces/documents/IDocumentTypeField';
import BreadCrumbsLinks from '@/mixins/BreadCrumbsLinks.vue';
import ConfirmLeavePage from '@/mixins/ConfirmLeavePage.vue';
import FormMixin from '@/mixins/FormMixin.vue';
import ValidateMixin from '@/mixins/ValidateMixin.vue';

@Options({
  name: 'DocumentTypePage',
  components: {
    PageHead,
    TableButtonGroup,
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
export default class DocumentTypePage extends mixins(ValidateMixin, ConfirmLeavePage, FormMixin, BreadCrumbsLinks) {
  // Types.
  declare $refs: {
    form: any;
    message: any;
  };
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

  rules = DocumentTypeRules;

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

  beforeRouteLeave(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    this.showConfirmModal(this.submitForm, next);
  }

  // Methods.
  async submitForm(next?: NavigationGuardNext): Promise<void> {
    this.saveButtonClick = true;
    if (!this.validate(this.$refs.form)) return;

    await this.submitHandling('documentTypes', this.documentType, next, 'document-types');
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
