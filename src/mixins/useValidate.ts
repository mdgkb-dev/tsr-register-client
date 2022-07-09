import { ElNotification } from 'element-plus';

import MessageError from '@/classes/messages/MessageError';
import IForm from '@/interfaces/elements/IForm';

interface IReturn {
  validate: (form: IForm) => boolean;
  validateWithoutMessageBox: (form: IForm) => boolean;
}

export default function (): IReturn {
  const validate = (form: IForm, hideErrorList?: boolean, fieldsList?: string[]): boolean => {
    let validationResult = true;
    form.validate((valid: boolean, errorFields: Record<string, unknown>) => {
      if (!valid) {
        if (!ElNotification.error) {
          return;
        }
        if (hideErrorList) {
          ElNotification.error('Пожалуйста, проверьте правильность введенных данных');
        } else {
          ElNotification.error(new MessageError(errorFields));
        }
        validationResult = false;
        return false;
      }
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
