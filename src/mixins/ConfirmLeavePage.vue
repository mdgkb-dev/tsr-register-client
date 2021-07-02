<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  name: 'ConfirmLeavePage',
})
export default class ConfirmLeavePage extends Vue {
  $confirm: any;
  $message: any;

  initialState = '';
  confirmStay = false;
  saveButtonClick = false;

  formUpdated() {
    this.confirmStay = true;
  }

  beforeWindowUnload(e: any) {
    if (this.confirmStay) {
      e.preventDefault();
      e.returnValue = '';
    }
  }

  beforeUnmount() {
    window.removeEventListener('beforeunload', this.beforeWindowUnload);
  }

  showConfirmModal(submit: any, next: any) {
    if (this.confirmStay && !this.saveButtonClick) {
      this.$confirm('У вас есть несохранённые изменения', 'Вы уверены, что хотите покинуть страницу?', {
        distinguishCancelAndClose: true,
        confirmButtonText: 'Сохранить',
        cancelButtonText: 'Не сохранять',
      })
        .then(() => {
          // Вызывается при сохранении
          submit();
        })
        .catch((action: any) => {
          if (action === 'cancel') {
            this.$message({
              type: 'warning',
              message: 'Изменения не были сохранены',
            });
            next();
          }
        });
    } else {
      next();
    }
  }
}
</script>
