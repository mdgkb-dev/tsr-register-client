import { ElMessage } from 'element-plus';

import MessageError from '@/classes/messages/MessageError';
import MessageSuccess from '@/classes/messages/MessageSuccess';

export default function () {
  const validate = (form: any): boolean => {
    let validationResult = true;
    form.validate((valid: boolean, errorFields: any) => {
      if (!valid) {
        ElMessage.error(new MessageError(errorFields));
        validationResult = false;
        return false;
      }
      ElMessage(new MessageSuccess());
      return true;
    });
    return validationResult;
  }

  return {
    validate,
  };
}
