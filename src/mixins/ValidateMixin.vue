<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import MessageError from '@/classes/messages/MessageError';
import MessageSuccess from '@/classes/messages/MessageSuccess';
import IForm from '@/interfaces/elements/IForm';
import IMessage from '@/interfaces/shared/IMessage';

@Options({
  name: 'ValidateMixin',
})
export default class ValidateMixin extends Vue {
  $message!: IMessage;

  validate(form: IForm): boolean {
    let validationResult = true;
    form.validate((valid: boolean, errorFields: Record<string, unknown>) => {
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
