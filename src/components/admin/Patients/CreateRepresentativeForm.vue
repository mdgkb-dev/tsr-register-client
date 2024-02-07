<template>
  <el-form v-if="mounted">
    <div v-if="showSnilsForm">
      <div v-for="value in representative.human.getOrCreateDocument(snils).documentFieldValues" :key="value.id" class="margin-field">
        <InfoItem title="снилс" icon="edit-title" :with-open-window="false" :with-hover="false" border-color="#ffffff" base-box-margin="0 0 15px 0" padding="0" width="100%">
          <el-input v-model="value.valueString" v-maska="{ mask: '###-###-### ##', eager: true }" />
        </InfoItem>
      </div>
      <Button button-class="save-button" text="Проверить наличие СНИЛС в системе" @click="toNameStep" />
    </div>
    <div v-else>
      <InfoItem title="фамилия" icon="edit-title" :with-open-window="false" :with-hover="false" border-color="#ffffff" base-box-margin="0 0 15px 0" padding="0" width="100%">
        <el-form-item style="width: 100%" prop="surname" :rules="representative.human.getValidationRules().surname">
          <el-input v-model="representative.human.surname" />
        </el-form-item>
      </InfoItem>
      <InfoItem title="имя" icon="edit-title" :with-open-window="false" :with-hover="false" border-color="#ffffff" base-box-margin="0 0 15px 0" padding="0" width="100%">
        <el-form-item style="width: 100%" prop="name" :rules="representative.human.getValidationRules().name">
          <el-input v-model="representative.human.name" />
        </el-form-item>
      </InfoItem>
      <InfoItem title="отчество" icon="edit-title" :with-open-window="false" :with-hover="false" border-color="#ffffff" base-box-margin="0 0 15px 0" padding="0" width="100%">
        <el-form-item style="width: 100%" prop="patronymic" :rules="representative.human.getValidationRules().patronymic">
          <el-input v-model="representative.human.patronymic" />
          <!-- <el-input :model-value="human.patronymic" @input="(e) => human.setPatronymic(e)" @click.stop="() => undefined" /> -->
        </el-form-item>
      </InfoItem>
      <Button button-class="save-button" text="Создать представителя" @click="createRepresentative" />
    </div>
  </el-form>
</template>

<script lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus';
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';

import Document from '@/classes/Document';
import DocumentFieldValue from '@/classes/DocumentFieldValue';
import DocumentType from '@/classes/DocumentType';
import Representative from '@/classes/Representative';
import Button from '@/services/components/Button.vue';
import DocumentTypeFieldsCodes from '@/interfaces/DocumentTypeFieldsCodes';
import DocumentTypesCodes from '@/interfaces/DocumentTypesCodes';
import DocumentTypesFiltersLib from '@/libs/filters/DocumentTypesFiltersLib';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import InfoItem from '@/services/components/InfoItem.vue';
import Provider from '@/services/Provider/Provider';
import TokenService from '@/services/Token';

export default defineComponent({
  name: 'CreateRepresentativeForm',
  components: { Button, InfoItem },
  emits: ['add'],
  setup(_, { emit }) {
    const documentTypes: Ref<DocumentType[]> = computed(() => Provider.store.getters['documentTypes/items']);
    const snils: Ref<DocumentType> = ref(new DocumentType());
    const existingValues: Ref<DocumentFieldValue[]> = computed(() => Provider.store.getters['documentFieldValues/items']);
    const existsInDomain: Ref<boolean> = computed(() => Provider.store.getters['representatives/existsInDomain']);
    const existingRepresentative: Ref<Representative> = computed(() => Provider.store.getters['representatives/item']);
    const showSnilsForm: Ref<boolean> = ref(true);
    const representative: Ref<Representative> = ref(Representative.Create(TokenService.getUser()));
    const mounted = ref(false);

    const getSnils = async (): Promise<void> => {
      const fq = new FilterQuery();
      fq.setFilterModel(DocumentTypesFiltersLib.byCode(DocumentTypesCodes.Snils));
      await Provider.store.dispatch('documentTypes/getAll', { filterQuery: fq });
      snils.value = documentTypes.value.find((d: DocumentType) => d.code === DocumentTypesCodes.Snils) ?? snils.value;
    };

    onBeforeMount(async () => {
      await getSnils();
      mounted.value = true;
    });

    const findExistingRepresentative = async (): Promise<boolean> => {
      let snilsNumber = '';
      const snilsNumberField = snils.value.getFieldByCode(DocumentTypeFieldsCodes.Number);
      representative.value.human.documents.some((d: Document) => {
        return d.documentFieldValues.some(async (dfv: DocumentFieldValue) => {
          if (dfv.documentTypeFieldId === snilsNumberField?.id && dfv.valueString) {
            snilsNumber = dfv.valueString;
          }
        });
      });
      await Provider.store.dispatch('representatives/getBySnils', snilsNumber);
      return existingValues.value.length > 0;
    };

    const addToDomain = async (): Promise<void> => {
      await Provider.store.dispatch('representativesDomains/addToDomain', existingRepresentative.value.id);
      await Provider.store.dispatch('representatives/get', existingRepresentative.value.id);
      Provider.store.commit('representatives/unshiftToAll', existingRepresentative.value.id);
      emit('add');
    };

    const toNameStep = async (): Promise<void> => {
      await findExistingRepresentative();
      console.log(existsInDomain.value);
      if (existsInDomain.value) {
        ElMessage.warning({ message: 'Представитель с данным СНИЛС уже добавлен' });
        return;
      }
      if (existingRepresentative.value.id) {
        ElMessageBox.confirm('Найден представитель с введённым СНИЛС. Добавить?', {
          distinguishCancelAndClose: true,
          confirmButtonText: 'Да',
          cancelButtonText: 'Отмена',
        }).then(async () => {
          await addToDomain();
        });
      }
      if (!existingRepresentative.value.id) {
        showSnilsForm.value = false;
      }
    };

    const createRepresentative = async (): Promise<void> => {
      await Provider.store.dispatch('representatives/create', representative.value);
      await Provider.store.dispatch('documents/create', representative.value.human.getOrCreateDocument(snils.value));
      await Provider.store.dispatch('representatives/get', representative.value.id);
      Provider.store.commit('representatives/unshiftToAll', representative.value);
      emit('add');
    };

    return { representative, documentTypes, mounted, toNameStep, showSnilsForm, snils, createRepresentative };
  },
});
</script>
<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';
@import '@/assets/styles/elements/base-style.scss';

.save-button {
  width: 300px;
  border-radius: 5px;
  height: 42px;
  color: #006bb4;
  background: #dff2f8;
  margin: 0 auto;
  font-size: 14px;
}
</style>
