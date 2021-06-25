import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import IRegisterPropertySet from '@/interfaces/registers/IRegisterPropertySet';

export default class RegisterPropertySet implements IRegisterPropertySet {
  id?: string;
  name = '';
  registerPropertyId?: string;
  registerProperty?: IRegisterProperty;

  constructor(registerPropertySet?: IRegisterPropertySet) {
    if (!registerPropertySet) {
      return;
    }
    this.id = registerPropertySet.id;
    this.name = registerPropertySet.name;
    this.registerPropertyId = registerPropertySet.registerPropertyId;
  }
}
