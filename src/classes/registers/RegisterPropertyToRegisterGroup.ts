import IRegisterPropertyToRegisterGroup from '@/interfaces/registers/IRegisterPropertyToRegisterGroup';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import IRegisterGroup from '@/interfaces/registers/IRegisterGroup';
import RegisterProperty from '@/classes/registers/RegisterProperty';
import RegisterGroup from '@/classes/registers/RegisterGroup';

export default class RegisterPropertyToRegisterGroup implements IRegisterPropertyToRegisterGroup {
  id?: string;
  registerPropertyId?: string;
  registerGroupId?: string;

  registerProperty?: IRegisterProperty;
  registerGroup?: IRegisterGroup;

  constructor(item?: IRegisterPropertyToRegisterGroup) {
    if (!item) {
      return;
    }
    this.id = item.id;
    this.registerPropertyId = item.registerPropertyId;
    this.registerGroupId = item.registerGroupId;
    if (item.registerProperty) this.registerProperty = new RegisterProperty(item.registerProperty);
    if (item.registerGroup) this.registerGroup = new RegisterGroup(item.registerGroup);
  }
}
