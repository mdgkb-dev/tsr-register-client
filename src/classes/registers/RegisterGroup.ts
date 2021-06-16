import IRegisterGroup from '@/interfaces/registers/IRegisterGroup';

export default class RegisterGroup implements IRegisterGroup {
  id?: string;
  name?: string;

  constructor(register?: IRegisterGroup) {
    if (!register) {
      return;
    }
    this.id = register.id;
    this.name = register.name;
  }
}
