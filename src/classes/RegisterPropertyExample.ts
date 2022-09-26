import RegisterProperty from '@/classes/RegisterProperty';
import IRegisterProperty from '@/interfaces/IRegisterProperty';
import IRegisterPropertyExample from '@/interfaces/IRegisterPropertyExample';

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
