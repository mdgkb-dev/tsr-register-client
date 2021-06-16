import IRegister from '@/interfaces/registers/IRegister';
import IRegisterGroup from '@/interfaces/registers/IRegisterGroup';
import IRegisterGroupToRegister from '@/interfaces/registers/IRegisterGroupToRegister';

export default class RegisterGroupToRegister implements IRegisterGroupToRegister {
  id?: string;
  registerId?: string;
  registerGroupId?: string;
  register?: IRegister;
  registerGroup?: IRegisterGroup;

  constructor(registerGroupToRegister?: IRegisterGroupToRegister) {
    if (!registerGroupToRegister) {
      return;
    }
    this.id = registerGroupToRegister.id;
    this.registerId = registerGroupToRegister.registerId;
    this.registerGroupId = registerGroupToRegister.registerGroupId;
    this.register = registerGroupToRegister.register;
    this.registerGroup = registerGroupToRegister.registerGroup;
  }
}
