<template>
  <div v-if="mount">
    <el-row>
      <div class="table-background" style="width: 100%; margin-bottom: 20px">
        <el-form
          ref="form"
          :status-icon="true"
          :inline-message="true"
          :model="documentType"
          label-width="10vw"
          label-position="right"
          :rules="rules"
        >
          <el-form-item label="Название документа" prop="name">
            <el-input v-model="documentType.name"></el-input>
          </el-form-item>
          <el-button style="margin-bottom: 10px" @click="add">Добавить поле</el-button>

          <el-table :data="documentType.documentTypeFields" style="width: 100%" class="table-shadow" header-row-class-name="header-style">
            <el-table-column type="index" width="60" align="center" />

            <el-table-column label="Название поля" min-width="250" align="center">
              <template #default="scope">
                <el-form-item
                  label-width="0"
                  style="margin-bottom: 0"
                  :prop="'documentTypeFields.' + scope.$index + '.name'"
                  :rules="rules.rowName"
                >
                  <el-input v-model="scope.row.name"></el-input>
                </el-form-item>
              </template>
            </el-table-column>

            <el-table-column label="Тип поля" min-width="250" align="center">
              <template #default="scope">
                <el-form-item
                  label-width="0"
                  style="margin-bottom: 0"
                  :prop="'documentTypeFields.' + scope.$index + '.type'"
                  :rules="rules.rowType"
                >
                  <el-select v-model="scope.row.type" placeholder="Выберите тип поля">
                    <el-option v-for="option in options" :key="option.value" :label="option.label" :value="option.value"> </el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>

            <el-table-column label="Порядковый номер поля" min-width="250" align="center">
              <template #default="scope">
                <el-form-item
                  label-width="0"
                  style="margin-bottom: 0"
                  :prop="'documentTypeFields.' + scope.$index + '.order'"
                  :rules="rules.rowNumber"
                >
                  <el-input-number v-model="scope.row.order" size="medium" :min="0" style="width: 120px"></el-input-number>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column width="40" fixed="right" align="center">
              <template #default="scope">
                <TableButtonGroup :show-remove-button="true" @remove="remove(scope.row)" />
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </div>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, reactive, Ref, ref, watch, WritableComputedRef } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import DocumentType from '@/classes/documents/DocumentType';
import DocumentTypeField from '@/classes/documents/DocumentTypeField';
import DocumentTypeRules from '@/classes/documents/DocumentTypeRules';
import MainHeader from '@/classes/shared/MainHeader';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import IDocumentType from '@/interfaces/documents/IDocumentType';
import IDocumentTypeField from '@/interfaces/documents/IDocumentTypeField';
import useBreadCrumbsLinks from '@/mixins/useBreadCrumbsLinks';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import useForm from '@/mixins/useForm';
import useValidate from '@/mixins/useValidate';

export default defineComponent({
  name: 'DocumentTypePage',
  components: {
    TableButtonGroup,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const form = ref();
    const isEditMode: Ref<boolean> = ref(!!route.params.documentTypeId);
    const mount: Ref<boolean> = ref(false);
    const options: { label: string; value: string }[] = reactive([
      { label: 'Строка', value: 'string' },
      { label: 'Число', value: 'number' },
      { label: 'Дата', value: 'date' },
    ]);
    const rules = DocumentTypeRules;

    const documentType: WritableComputedRef<IDocumentType> = computed({
      get(): IDocumentType {
        return store.getters['documentTypes/documentType'];
      },
      set(updatedType: IDocumentType): void {
        store.commit('documentTypes/set', updatedType);
      },
    });

    const { links, pushToLinks } = useBreadCrumbsLinks();
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    const { validate } = useValidate();
    const { submitHandling } = useForm(isEditMode.value);

    onBeforeMount(async (): Promise<void> => {
      let title: string;
      if (!route.params.documentTypeId) {
        store.commit('documentTypes/set', new DocumentType());
        title = 'Создать документ';
      } else {
        title = 'Редактировать документ';
        await store.dispatch('documentTypes/get', String(route.params.documentTypeId));
      }

      pushToLinks(['/document-types'], ['Регистры пациентов']);
      store.commit('main/setMainHeader', new MainHeader({ title, links, save: submitForm }));
      mount.value = true;

      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(documentType, formUpdated, { deep: true });
    });

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void => {
      showConfirmModal(submitForm, next);
    });

    const add = (): void => {
      documentType.value.documentTypeFields.push(new DocumentTypeField());
    };

    const remove = (field: IDocumentTypeField): void => {
      store.commit('documentTypes/removeField', field);
    };

    const cancel = async (): Promise<void> => {
      await router.push('/document-types');
    };

    const submitForm = async (next?: NavigationGuardNext): Promise<void> => {
      saveButtonClick.value = true;
      if (!validate(form.value)) return;

      await submitHandling('documentTypes', documentType.value, next, 'document-types');
    };

    return {
      documentType,
      form,
      links,
      mount,
      options,
      rules,
      add,
      cancel,
      remove,
      submitForm,
    };
  },
});
</script>
