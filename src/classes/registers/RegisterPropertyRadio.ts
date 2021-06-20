import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import IRegisterPropertyRadio from '@/interfaces/registers/IRegisterPropertyRadio';

export default class RegisterPropertyRadio implements IRegisterPropertyRadio {
  id?: string;
  name = '';
  registerPropertyId?: string;
  registerProperty?: IRegisterProperty;

  constructor(item?: IRegisterPropertyRadio) {
    if (!item) {
      return;
    }
    this.id = item.id;
    this.name = item.name;
    this.registerPropertyId = item.registerPropertyId;
  }
}
