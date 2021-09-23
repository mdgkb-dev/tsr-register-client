import { ElMessage } from 'element-plus';

import MessageError from '@/classes/messages/MessageError';
import MessageSuccess from '@/classes/messages/MessageSuccess';
import IForm from '@/interfaces/elements/IForm';

interface IReturn {
  validate: (form: IForm) => boolean;
  validateWithoutMessageBox: (form: IForm) => boolean;
}

export default function (): IReturn {
  const validate = (form: IForm): boolean => {
    let validationResult = true;
    form.validate((valid: boolean, errorFields: Record<string, unknown>) => {
      if (!valid) {
        if (!ElMessage.error) {
          return;
        }
        ElMessage.error(new MessageError(errorFields));
        validationResult = false;
        return false;
      }
      ElMessage(new MessageSuccess());
      return true;
    });
    return validationResult;
  };

  const validateWithoutMessageBox = (form: IForm): boolean => {
    let validationResult = true;
    form.validate((valid: boolean) => {
      if (!valid) {
        validationResult = false;
        return false;
      }
      return true;
    });
    return validationResult;
  };

  return {
    validate,
    validateWithoutMessageBox,
  };
}
