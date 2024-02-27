<template>
  <InfoItem title="документы" margin="0 0 0 0px" close-window-overflow="hidden" :with-hover="true" :with-open-window="true">
    <!--    <div v-for="(document, i) in human.documents" :key="document.id">-->
    <StringItem :string="documentsShortList" font-size="14px" width="100%" />
    <!--    </div>-->

    <template #open-inside-content>
      <GridContainer custom-class="grid">
        <div v-for="document in human.documents" :key="document.id">
          <InfoItem icon="edit-title" margin="0" :with-open-window="false" height="32px" @click="selectDocument(document.id)">
            <StringItem :string="document.documentType.getTagName()" font-size="11px" />
          </InfoItem>
        </div>

        <div v-if="documentsIsToggle">
          <Button v-for="docType in notExistingDocumentTypes" :key="docType.id" button-class="save-button" :text="docType.name" @click="addDocument(docType.id)" />
        </div>
        <Button v-else button-class="plus-button" icon="plus" icon-class="icon-plus" @click="toggleDocuments(true)" />
      </GridContainer>
    </template>
  </InfoItem>
  <ModalWindow :show="showDocumentModal" title="Документ" @close="showDocumentModal = false">
    <DocumentForm @remove="removeDocument" />
  </ModalWindow>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, defineComponent, PropType, Ref, ref } from 'vue';

import Document from '@/classes/Document';
import DocumentType from '@/classes/DocumentType';
import Human from '@/classes/Human';
import DocumentForm from '@/components/admin/DocumentForm.vue';
import ModalWindow from '@/services/components/ModalWindow.vue';
import ClassHelper from '@/services/ClassHelper';
import Button from '@/services/components/Button.vue';
import GridContainer from '@/services/components/GridContainer.vue';
import InfoItem from '@/services/components/InfoItem.vue';
import StringItem from '@/services/components/StringItem.vue';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'ToggleDocumentsForm',
  components: {
    DocumentForm,
    ModalWindow,
    StringItem,
    InfoItem,
    GridContainer,
    Button,
  },
  props: {
    human: {
      type: Object as PropType<Human>,
      required: true,
    },
  },
  setup(props) {
    const showDocumentModal: Ref<boolean> = ref(false);
    const documentTypes: Ref<DocumentType[]> = computed(() => Provider.store.getters['documentTypes/items']);
    const documentsIsToggle: Ref<boolean> = ref(false);
    const documentType: Ref<DocumentType> = computed(() => Provider.store.getters['documentTypes/item']);
    const notExistingDocumentTypes: Ref<DocumentType[]> = computed(() => documentTypes.value.filter((dt: DocumentType) => !props.human.documentTypeExists(dt.id)));
    const documentsShortList = computed(() => {
      let list = '';
      props.human.documents.forEach((d: Document, i: number) => {
        list += d.documentType.name;
        if (i < props.human.documents.length - 1) {
          list += ', ';
        }
      });
      if (list.length > 30) {
        return list.slice(0, 30) + '...';
      }
      return list;
    });
    const removeDocument = async (id?: string) => {
      ClassHelper.RemoveFromClassById(id, props.human.documents);
      showDocumentModal.value = false;
      Provider.store.commit('documents/set');
    };

    const toggleDocuments = async (toggle: boolean) => {
      if (toggle) {
        await Provider.store.dispatch('documentTypes/getAll');
      }
      documentsIsToggle.value = toggle;
    };

    const addDocument = async (id: string): Promise<void> => {
      if (props.human.documentTypeExists(id)) {
        ElMessage({
          type: 'warning',
          message: 'Документ уже добавлен',
        });
        return;
      }
      await Provider.store.dispatch('documentTypes/get', id);
      const item = props.human.addDocument(documentType.value);
      await Provider.store.dispatch('documents/create', item);

      await selectDocument(props.human.documents[props.human.documents.length - 1].id);
    };

    const selectDocument = async (id?: string) => {
      await Provider.store.dispatch('documents/get', id);
      showDocumentModal.value = true;
      documentsIsToggle.value = false;
    };

    return {
      notExistingDocumentTypes,
      documentsShortList,
      toggleDocuments,
      addDocument,
      documentTypes,
      documentsIsToggle,
      removeDocument,
      selectDocument,
      showDocumentModal,
    };
  },
});
</script>
<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

.button {
  width: auto;
  height: 34px;
  border-radius: 5px;
  color: #006bb4;
  font-size: 12px;

  &-filter {
    background: #ffffff;
  }

  &-download {
    background: #dff2f8;
  }
}

.doc-list {
  color: #343e5c;
  padding: 10px 0;
  border: 1px solid #006bb4;
  border-radius: $normal-border-radius;
}

.doc-list:not(:last-child) {
  margin-bottom: 10px;
}

.doc-list:hover {
  color: #006bb4;
}

:deep(.button-register) {
  width: auto;
  height: 34px;
  border-radius: 5px;
  color: #006bb4;
  background: #ffffff;
  font-size: 12px;
}

:deep(.name-item) {
  margin: 0;
  width: auto;
  border-color: #ffffff;
  padding: 0;
}

.grid {
  max-width: initial;
  grid-gap: 7px;
  margin: 0;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
}

.plus-button {
  width: 100%;
  height: 34px;
  border-radius: 5px;
  color: #00bea5;
  background: #c1efeb;
}

.save-picker-button {
  width: 100%;
  height: 34px;
  border-radius: 5px;
  color: #006bb4;
  background: #dff2f8;
}

.gender-button {
  width: 42px;
  border-radius: 5px;
  height: 42px;
  color: #006bb4;
  background: #dff2f8;
  margin: 2px 10px 0 0;
  font-size: 18px;
}

.save-button {
  width: 100%;
  border-radius: 5px;
  height: 42px;
  color: #006bb4;
  background: #dff2f8;
  margin: 0 0 10px 0;
  font-size: 14px;
}

.save-button:last-child {
  margin: 0;
}

:deep(.edit-button) {
  min-width: 40px;
  max-width: 40px;
  height: 40px;
  border-radius: 5px;
  color: #006bb4;
  background: #dff2f8;
}

:deep(.files-buttons) {
  width: auto;
  height: 34px;
  border-radius: 5px;
  color: #006bb4;
  background: #dff2f8;
  font-size: 12px;

  &:hover {
    background: #dff2f8;
  }
}

.edv {
  font-size: 14px;
  padding: 0;
  margin: 0 5px 0 0;

  &-active {
    color: #b0a4c0;
  }
}

.patient-name {
  color: #006bb4;
  font-size: 17px;
  min-width: 150px;
  width: 100%;
  padding: 0;
}

.hidden {
  display: none;
}

.scroll-block {
  height: 75vh;
  overflow: hidden;
  overflow-y: scroll;
  margin-left: 8px;
}

.registers-tooltip {
  &:hover {
    cursor: pointer;
  }
}

.patient-link {
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

.tag-link:hover {
  background-color: darken(white, 10%);
  cursor: pointer;
}

.flex-block {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

:deep(.edit-icon) {
  width: 28px;
  height: 28px;
  color: #006bb4;
}

.item-flex {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin: 0 10px 0 0;
}

.item-flex:last-child {
  margin: 10px 0;
}

.line-item-left {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: auto;
  padding: 0;
}

.line-item-right {
  display: flex;
  justify-content: right;
  align-items: center;
  width: auto;
  padding: 0;
}

:deep(.icon-plus) {
  fill: #00b5a4;
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.icon-filter {
  width: 24px;
  height: 24px;
  cursor: pointer;
  stroke: #006bb4;
  fill: none;
}

.icon-del {
  width: 10px;
  height: 10px;
  cursor: pointer;
}

.patient-count {
  margin-top: 10px;
  color: $site_light_pink;
  font-size: 14px;
}

:deep(.el-form-item) {
  margin: 8px 0 0 0;
}

@media (max-width: 1915px) {
  .flex-block {
    width: 100%;
    display: block;
    justify-content: space-between;
    align-items: center;
  }
  .line-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0;
  }
  .item-flex {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }

  .item-flex:last-child {
    margin-top: 10px;
    margin-bottom: 10px;
  }
}

@media (max-width: 560px) {
  .line-item-left {
    margin: 10px 0;
  }

  .line-item-right {
    margin: 10px 0;
    justify-content: space-between;
  }

  .item-flex:first-child {
    display: block;
    width: 100%;
    margin: 0 0px 10px 0;
  }
}
</style>
