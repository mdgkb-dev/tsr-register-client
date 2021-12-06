import IRegisterPropertyOther from '@/interfaces/registers/IRegisterPropertyOther';

export default class RegisterPropertyOther implements IRegisterPropertyOther {
  id?: string;
  name = '';
  registerPropertyRadioId?: string;
  registerPropertyId?: string;

  constructor(i?: IRegisterPropertyOther) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.registerPropertyRadioId = i.registerPropertyRadioId;
    this.registerPropertyRadioId = i.registerPropertyRadioId;
    this.registerPropertyId = i.registerPropertyId;
  }
}
