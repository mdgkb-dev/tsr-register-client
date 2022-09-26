import IRegisterPropertyVariant from '@/interfaces/IRegisterPropertyVariant';

export default class RegisterPropertyVariant implements IRegisterPropertyVariant {
  id?: string;
  name = '';
  registerPropertyId?: string;

  constructor(i?: IRegisterPropertyVariant) {
    if (!i) {
      return;
    }

    this.id = i.id;
    this.name = i.name;
    this.registerPropertyId = i.registerPropertyId;
  }
}
