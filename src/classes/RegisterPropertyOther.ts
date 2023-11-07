import ClassHelper from '@/services/ClassHelper';

export default class RegisterPropertyOther {
  id?: string;
  name = '';
  registerPropertyRadioId?: string;
  registerPropertyId?: string;
  order = 0;

  constructor(i?: RegisterPropertyOther) {
    ClassHelper.BuildClass(this, i);
  }
}
