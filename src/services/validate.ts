import { ElNotification } from 'element-plus';
import { Ref } from 'vue';

import MessageError from '@/services/classes/messages/MessageError';
import IForm from '@/services/interfaces/IForm';

export default function validate(form: Ref<IForm>, hideErrorList?: boolean, fieldsList?: string[]): boolean {
  let validationResult = true;
  form.value.validate((valid: boolean, errorFields: Record<string, unknown>) => {
    if (!valid) {
      if (!ElNotification.error) {
        return;
      }
      if (hideErrorList) {
        ElNotification.error('Пожалуйста, проверьте правильность введенных данных');
      } else {
        console.log(errorFields);
        ElNotification.error(new MessageError(errorFields));
      }
      validationResult = false;
      return validationResult;
    }
    return validationResult;
  });
  return validationResult;
}
