import { ref, Ref } from 'vue';
import { NavigationGuardNext } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';

export default function () {
  const confirmLeave: Ref<boolean> = ref(false);
  const initialState: Ref<string> = ref('');
  const saveButtonClick: Ref<boolean> = ref(false);

  const formUpdated = () => {
    confirmLeave.value = true;
  };

  const beforeWindowUnload = (e: any) => {
    if (confirmLeave.value) {
      e.preventDefault();
      e.returnValue = '';
    }
  };

  const showConfirmModal = (submit: any, next: NavigationGuardNext) => {
    if (confirmLeave.value && !saveButtonClick.value) {
      ElMessageBox.confirm('У вас есть несохранённые изменения', 'Вы уверены, что хотите покинуть страницу?', {
        distinguishCancelAndClose: true, confirmButtonText: 'Сохранить', cancelButtonText: 'Не сохранять',
      })
        .then(() => {
          // Вызывается при сохранении
          submit(next);
        })
        .catch((action: any) => {
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
