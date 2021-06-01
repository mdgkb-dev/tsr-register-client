<script lang="ts">
import { Vue } from 'vue-class-component';

export default class ConfirmLeavePage extends Vue {
  initialState = '';
  confirmStay = false;

  compareStates() {
    const initial = this.initialState;
    this.initialState = '';
    if (initial !== JSON.stringify(this)) {
      this.confirmStay = true;
    }
  }

  confirmLeave() {
    if (window.confirm('Вы уверены, что хотите покинуть страницу? У вас есть несохранённые изменения!')) {
      this.confirmStay = false;
      return true;
    }
    return false;
  }

  async beforeWindowUnload(e: any) {
    this.compareStates();
    if (this.confirmStay && !this.confirmLeave()) {
      e.preventDefault();
      e.returnValue = '';
    }
  }

  async beforeUnmount(): Promise<void> {
    window.removeEventListener('beforeunload', this.beforeWindowUnload);
  }

  // Methods.
  async beforeRouteLeave(to: any, from: any, next: any) {
    await this.compareStates();
    if (this.confirmStay && !this.confirmLeave()) {
      next(false);
    } else {
      next();
    }
  }
}
</script>
