<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  name: 'MessageMixin',
})
export default class MessageMixin extends Vue {
  $message!: {
    error: any;
  };

  showMessageError(error: string): void {
    this.$message.error(error);
  }
}
</script>
