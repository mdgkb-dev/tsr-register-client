import { RuleItem } from 'async-validator';
import { Store } from 'vuex';

import IRegistrationFormRules from '@/interfaces/auth/IRegistrationFormRules';
import State from '@/store/modules/auth/state';

const createRegistrationFormRules = async (store: Store<State>): Promise<IRegistrationFormRules> => {
  const checkUnicity = async (_: RuleItem, value: string, callback: (error?: Error) => void): Promise<void> => {
    if (!value || value.length <= 0) {
      callback(new Error('Пожалуйста, введите логин.'));
      return;
    }

    await store.dispatch('auth/checkLoginUnicity', value);
    const doesLoginExist = store.getters['auth/doesLoginExist'];

    if (doesLoginExist) {
      callback(new Error('Логин занят.'));
      return;
    }

    callback();
  };

  const rules: IRegistrationFormRules = {
    login: [{ validator: checkUnicity, trigger: 'blur' }],
    password: [{ required: true, message: 'Пожалуйста, введите пароль.', trigger: 'blur' }],
    region: [{ required: true, message: 'Пожалуйста, выберите регион.', trigger: 'change' }],
  };

  return rules;
};

export default createRegistrationFormRules;
