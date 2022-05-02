import RegisterProperty from '@/classes/registers/RegisterProperty';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import IRegisterPropertyExample from '@/interfaces/registers/IRegisterPropertyExample';

export default class RegisterPropertyExample implements IRegisterPropertyExample {
  id?: string;
  name = '';
  order = 0;
  registerPropertyId?: string;
  registerProperty: IRegisterProperty = new RegisterProperty();

  constructor(i?: IRegisterPropertyExample) {
    if (!i) {
      return;
    }

    this.id = i.id;
    this.name = i.name;
    this.order = i.order;
    this.registerPropertyId = i.registerPropertyId;
  }
}
