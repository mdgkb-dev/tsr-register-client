import IRegisterGroup from '@/interfaces/registers/IRegisterGroup';
import IRegisterPropertyToRegisterGroup from '@/interfaces/registers/IRegisterPropertyToRegisterGroup';
import RegisterPropertyToRegisterGroup from '@/classes/registers/RegisterPropertyToRegisterGroup';

export default class RegisterGroup implements IRegisterGroup {
  id?: string;
  name?: string;
  registerPropertyToRegisterGroup: IRegisterPropertyToRegisterGroup[] = [];

  constructor(registerGroup?: IRegisterGroup) {
    if (!registerGroup) {
      return;
    }
    this.id = registerGroup.id;
    this.name = registerGroup.name;
    if (registerGroup.registerPropertyToRegisterGroup) {
      this.registerPropertyToRegisterGroup = registerGroup.registerPropertyToRegisterGroup.map(
        (registerProperty: IRegisterPropertyToRegisterGroup) => new RegisterPropertyToRegisterGroup(registerProperty),
      );
    }
  }
}
