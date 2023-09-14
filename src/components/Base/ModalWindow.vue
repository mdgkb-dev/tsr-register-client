<template>
  <el-dialog v-if="show" top="10vh" :model-value="show" width="60%" :show-close="true" :before-close="beforeClose" @close="$emit('close')">
    <template #title>
      {{ title }}
    </template>
    <slot />
  </el-dialog>
</template>

<script lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus';
import { v4 as uuidv4 } from 'uuid';
import { computed, defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

import Representative from '@/classes/Representative';
import RepresentativeRules from '@/classes/RepresentativeRules';
// import DocumentForm from '@/components/admin/Patients/DocumentForm.vue';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'ModalWindow',
  props: {
    showCloseDialog: { type: Boolean as PropType<boolean>, required: false, default: false },
    show: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    title: {
      type: String as PropType<string>,
      default: '',
    },
  },
  emits: ['save', 'close'],

  setup(props, { emit }) {
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
      if (props.showCloseDialog) {
        ElMessageBox.confirm('У вас есть несохранённые изменения', 'Вы уверены, что хотите закрыть окно?', {
          distinguishCancelAndClose: true,
          confirmButtonText: 'Закрыть',
          cancelButtonText: 'Не закрывать',
        })
          .then(() => {
            // Вызывается при сохранении
            ElMessage({
              type: 'warning',
              message: 'Данные не были сохранёны',
            });
            done();
          })
          .catch(() => null);
      } else {
        done();
      }
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
            message: 'Данные не были сохранёны',
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

// .el-row {
//   display: block;
//   &:last-child {
//     margin-bottom: 0;
//   }
// }

// .row-bg {
//   padding: 10px 0;
//   background-color: #f9fafc;
// }

.modal-wrapper {
  width: 100%;
  height: 100%;
}

:deep(.el-dialog) {
  background-color: #eef1f6;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

:deep(.el-dialog__body) {
  padding-top: 0;
  overflow: auto;
}

:deep(.el-dialog__header) {
  padding-top: 0;
  font-size: 20px;
}
</style>
