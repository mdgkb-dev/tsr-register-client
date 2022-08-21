import { ElNotification } from 'element-plus';

import MessageError from '@/classes/messages/MessageError';
import IForm from '@/interfaces/elements/IForm';

interface IReturn {
  validate: (form: IForm) => Promise<boolean>;
  validateWithoutMessageBox: (form: IForm) => boolean;
}

export default function (): IReturn {
  const validate = async (form: IForm, hideErrorList?: boolean, fieldsList?: string[]): Promise<boolean> => {
    let validationResult = true;
    await form.validate((valid: boolean, errorFields: Record<string, unknown>) => {
      console.log(valid);
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
    });
    console.log(validationResult);
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
