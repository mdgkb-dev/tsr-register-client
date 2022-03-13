import IRegisterPropertyOther from '@/interfaces/registers/IRegisterPropertyOther';

export default class RegisterPropertyOther implements IRegisterPropertyOther {
  id?: string;
  name = '';
  registerPropertyRadioId?: string;
  registerPropertyId?: string;
  order = 0;
  constructor(i?: IRegisterPropertyOther) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.order = i.order;
    this.registerPropertyRadioId = i.registerPropertyRadioId;
    this.registerPropertyRadioId = i.registerPropertyRadioId;
    this.registerPropertyId = i.registerPropertyId;
  }
}
