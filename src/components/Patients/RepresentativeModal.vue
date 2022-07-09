<template>
  <div class="representative-page-container">
    <el-dialog
      v-if="show"
      top="0vh"
      :model-value="show"
      width="70%"
      :show-close="false"
      :before-close="beforeClose"
      @close="$emit('close')"
    >
      <template #title>
        <div class="dialog-header">
          <div>
            <h2>Создать представителя</h2>
          </div>
          <div>
            <el-button type="success" @click="submitForm">Сохранить</el-button>
            <el-button type="warning" @click="close">Отмена</el-button>
          </div>
        </div>
      </template>
      <el-row>
        <RepresentativePageInfo />
      </el-row>
      <el-row>
        <el-collapse>
          <el-form
            ref="form"
            :status-icon="true"
            :inline-message="true"
            :model="representative"
            label-width="150px"
            :rules="rules"
            @submit.prevent="submitForm"
          >
            <div>
              <el-collapse-item>
                <template #title>
                  <h2 class="collapseHeader">Паспортные данные</h2>
                </template>
                <HumanForm store-name="representatives" :addresses="representative.getChildrenAddresses()" />
              </el-collapse-item>
              <el-collapse-item>
                <template #title>
                  <h2 class="collapseHeader">Документы</h2>
                </template>
                <DocumentForm :store-module="'representatives'" />
              </el-collapse-item>
            </div>
          </el-form>
        </el-collapse>
      </el-row>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus';
import { computed, defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';
import { NavigationGuardNext } from 'vue-router';
import { useStore } from 'vuex';

import MessageSuccess from '@/classes/messages/MessageSuccess';
import Representative from '@/classes/representatives/Representative';
import RepresentativeRules from '@/classes/representatives/RepresentativeRules';
import DocumentForm from '@/components/DocumentForm.vue';
import HumanForm from '@/components/HumanForm.vue';
import RepresentativePageInfo from '@/components/Representatives/RepresentativePageInfo.vue';
import IRepresentative from '@/interfaces/representatives/IRepresentative';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import useForm from '@/mixins/useForm';
import useValidate from '@/mixins/useValidate';

export default defineComponent({
  name: 'RepresentativeModal',
  components: {
    HumanForm,
    DocumentForm,
    RepresentativePageInfo,
  },
  props: {
    show: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  emits: ['save', 'close'],
  setup(_, { emit }) {
    const store = useStore();
    const { submitHandling } = useForm();
    const { validate } = useValidate();
    const mount = ref(false);
    const { saveButtonClick } = useConfirmLeavePage();
    const form = ref();
    const representative: Ref<IRepresentative> = computed(() => store.getters['representatives/representative']);
    const rules = RepresentativeRules;

    onBeforeMount(async () => {
      store.commit('representatives/resetRepresentative');
    });

    const submitForm = async (next?: NavigationGuardNext): Promise<void> => {
      saveButtonClick.value = true;
      if (!validate(form.value)) {
        return;
      }
      await store.dispatch(`representatives/create`, representative.value);
      emit('save');
      representative.value = new Representative();
      ElNotification.error(new MessageSuccess());
    };

    const beforeClose = (done: () => void) => {
      ElMessageBox.confirm('У вас есть несохранённые изменения', 'Вы уверены, что хотите закрыть окно?', {
        distinguishCancelAndClose: true,
        confirmButtonText: 'Закрыть (изменения не будут сохранены)',
        cancelButtonText: 'Не закрывать',
      })
        .then(() => {
          // Вызывается при сохранении
          ElMessage({
            type: 'warning',
            message: 'Представитель не был сохранён',
          });
          done();
        })
        .catch((action: string) => null);
    };

    const close = () => {
      ElMessageBox.confirm('У вас есть несохранённые изменения', 'Вы уверены, что хотите закрыть окно?', {
        distinguishCancelAndClose: true,
        confirmButtonText: 'Закрыть (изменения не будут сохранены)',
        cancelButtonText: 'Не закрывать',
      })
        .then(() => {
          ElMessage({
            type: 'warning',
            message: 'Представитель не был сохранён',
          });
          emit('close');
        })
        .catch((action: string) => null);
    };

    return {
      close,
      beforeClose,
      form,
      rules,
      submitForm,
      representative,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';

.dialog-header {
  display: flex;
  justify-content: space-between;
}

.el-row {
  &:last-child {
    margin-bottom: 0;
  }
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.modal-wrapper {
  width: 100%;
  height: 100%;
}
</style>
