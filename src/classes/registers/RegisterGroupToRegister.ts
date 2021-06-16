import IRegisterGroupToRegister from '@/interfaces/registers/IRegisterGroupToRegister';

export default class RegisterGroupToRegister implements IRegisterGroupToRegister {
  id?: string;
  registerId?: string;
  registerGroupId?: string;

  constructor(registerGroupToRegister?: IRegisterGroupToRegister) {
    if (!registerGroupToRegister) {
      return;
    }
    this.id = registerGroupToRegister.id;
    this.registerId = registerGroupToRegister.registerId;
    this.registerGroupId = registerGroupToRegister.registerGroupId;
  }
}
