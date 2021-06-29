<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import IPatient from '@/interfaces/patients/IPatient';
import IRepresentative from '@/interfaces/representatives/IRepresentative';

@Options({
  name: 'FormMixin',
})
export default class FormMixin extends Vue {
  isEditMode!: boolean;
  $message!: any;
  title = '';

  async submitHandling(store: string, payload: IPatient | IRepresentative): Promise<void> {
    try {
      if (this.isEditMode) {
        await this.$store.dispatch(`${store}/edit`, payload);
      } else {
        await this.$store.dispatch(`${store}/create`, payload);
      }
    } catch (e) {
      this.$message.error(e.toString());
      return;
    }

    await this.$router.push(`/${store}`);
  }

  syncSubmitHandling(store: string, payload: IPatient | IRepresentative): void {
    try {
      if (this.isEditMode) {
        this.$store.dispatch(`${store}/edit`, payload);
      } else {
        this.$store.dispatch(`${store}/create`, payload);
      }
    } catch (e) {
      this.$message.error(e.toString());
      return;
    }

    this.$router.push(`/${store}`);
  }
}
</script>
