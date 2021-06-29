<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import MessageError from '@/classes/messages/MessageError';
import MessageSuccess from '@/classes/messages/MessageSuccess';

@Options({
  name: 'ValidateMixin',
})
export default class ValidateMixin extends Vue {
  $message!: any;

  validate(form: any): boolean {
    let validationResult = true;
    form.validate((valid: boolean, errorFields: any) => {
      if (!valid) {
        this.$message(new MessageError(errorFields));
        validationResult = false;
        return false;
      }
      this.$message(new MessageSuccess());
      return true;
    });
    return validationResult;
  }
}
</script>
