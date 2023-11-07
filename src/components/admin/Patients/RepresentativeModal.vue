<template>
  <div class="representative-page-container">
    <el-dialog v-if="show" top="0vh" :model-value="show" width="70%" :show-close="false" :before-close="beforeClose" @close="$emit('close')">
      <template #title>
        <div class="dialog-header">
          <div>
            <h2>Создать представителя</h2>
          </div>
          <div style="margin: auto 0">
            <el-button type="success" @click="submitForm">Сохранить</el-button>
            <el-button type="warning" @click="close">Отмена</el-button>
          </div>
        </div>
      </template>
      <el-row>
        <PassportForm :edit-mode="false" store-module="representatives" />
      </el-row>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus';
import { v4 as uuidv4 } from 'uuid';
import { computed, defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

import Representative from '@/classes/Representative';
import RepresentativeRules from '@/classes/RepresentativeRules';
import PassportForm from '@/components/admin/Patients/PassportForm.vue';
// import DocumentForm from '@/components/admin/Patients/DocumentForm.vue';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'RepresentativeModal',
  components: {
    PassportForm,
  },
  props: {
    show: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  emits: ['save', 'close'],
  setup(_, { emit }) {
    const form = ref();
    const representative: Ref<Representative> = computed(() => Provider.store.getters['representatives/item']);
    const rules = RepresentativeRules;

    onBeforeMount(async () => {
      Provider.store.commit('representatives/resetItem');
    });

    const submitForm = async (): Promise<void> => {
      // saveButtonClick.value = true;
      // if (!validate(form.value)) {
      //   return;
      // }
      representative.value.id = uuidv4();
      await emit('save', representative.value);
      // ElNotification.error(new MessageSuccess());
    };

    const beforeClose = (done: () => void) => {
      ElMessageBox.confirm('У вас есть несохранённые изменения', 'Вы уверены, что хотите закрыть окно?', {
        distinguishCancelAndClose: true,
        confirmButtonText: 'Закрыть',
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
        .catch(() => null);
    };

    const close = () => {
      ElMessageBox.confirm('У вас есть несохранённые изменения', 'Вы уверены, что хотите закрыть окно?', {
        distinguishCancelAndClose: true,
        confirmButtonText: 'Закрыть',
        cancelButtonText: 'Отмена',
      })
        .then(() => {
          ElMessage({
            type: 'warning',
            message: 'Представитель не был сохранён',
          });
          emit('close');
        })
        .catch(() => null);
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

:deep(.el-dialog) {
  background-color: #eef1f6;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

:deep(.el-dialog__body) {
  padding-top: 0;
  height: 100%;
  overflow: auto;
}

:deep(.el-dialog__header) {
  padding-top: 0;
}
</style>
