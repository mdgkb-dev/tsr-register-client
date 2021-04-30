<script lang="ts">
import { Vue } from 'vue-class-component';

export default class MessageMixin extends Vue {
  $message!: {
    error: any;
  };

  showMessageError(error: string): void {
    this.$message.error(error);
  }
}
</script>
