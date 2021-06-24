import IRegisterPropertyToRegisterGroup from '@/interfaces/registers/IRegisterPropertyToRegisterGroup';

export default class RegisterPropertyToRegisterGroup implements IRegisterPropertyToRegisterGroup {
  id?: string;
  registerPropertyId?: string;
  registerGroupId?: string;

  constructor(registerPropertyToRegisterGroup?: IRegisterPropertyToRegisterGroup) {
    if (!registerPropertyToRegisterGroup) {
      return;
    }
    this.id = registerPropertyToRegisterGroup.id;
    this.registerPropertyId = registerPropertyToRegisterGroup.registerPropertyId;
    this.registerGroupId = registerPropertyToRegisterGroup.registerGroupId;
  }
}
