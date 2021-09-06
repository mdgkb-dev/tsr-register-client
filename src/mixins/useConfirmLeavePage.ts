import { ElMessage, ElMessageBox } from 'element-plus';
import { Ref, ref } from 'vue';
import { NavigationGuardNext } from 'vue-router';

interface IReturn {
  beforeWindowUnload: (e: BeforeUnloadEvent) => void;
  initialState: Ref<string>;
  showConfirmModal: (submit: CallableFunction, next: NavigationGuardNext) => void;
  formUpdated: () => void;
  confirmLeave: Ref<boolean>;
  saveButtonClick: Ref<boolean>;
}

export default function (): IReturn {
  const confirmLeave: Ref<boolean> = ref(false);
  const initialState: Ref<string> = ref('');
  const saveButtonClick: Ref<boolean> = ref(false);

  const formUpdated = () => {
    confirmLeave.value = true;
  };

  const beforeWindowUnload = (e: BeforeUnloadEvent) => {
    if (confirmLeave.value) {
      e.preventDefault();
      e.returnValue = '';
    }
  };

  const showConfirmModal = (submit: CallableFunction, next: NavigationGuardNext) => {
    if (confirmLeave.value && !saveButtonClick.value) {
      ElMessageBox.confirm('У вас есть несохранённые изменения', 'Вы уверены, что хотите покинуть страницу?', {
        distinguishCancelAndClose: true,
        confirmButtonText: 'Сохранить',
        cancelButtonText: 'Не сохранять',
      })
        .then(() => {
          // Вызывается при сохранении
          submit(next);
        })
        .catch((action: string) => {
          if (action === 'cancel') {
            ElMessage({
              type: 'warning',
              message: 'Изменения не были сохранены',
            });
            next();
          }
        });
    } else {
      next();
    }
  };

  return {
    confirmLeave,
    initialState,
    saveButtonClick,
    beforeWindowUnload,
    formUpdated,
    showConfirmModal,
  };
}
