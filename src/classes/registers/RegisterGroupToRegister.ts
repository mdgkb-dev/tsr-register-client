import IRegisterGroupToRegister from '@/interfaces/registers/IRegisterGroupToRegister';
import IRegisterGroup from '@/interfaces/registers/IRegisterGroup';
import IRegister from '@/interfaces/registers/IRegister';
import Register from '@/classes/registers/Register';
import RegisterGroup from '@/classes/registers/RegisterGroup';

export default class RegisterGroupToRegister implements IRegisterGroupToRegister {
  id?: string;
  registerId?: string;
  registerGroupId?: string;

  registerGroup?: IRegisterGroup;
  register?: IRegister;

  constructor(item?: IRegisterGroupToRegister) {
    if (!item) {
      return;
    }
    this.id = item.id;
    this.registerId = item.registerId;
    this.registerGroupId = item.registerGroupId;
    if (item.register) this.register = new Register(item.register);
    if (item.registerGroup) this.registerGroup = new RegisterGroup(item.registerGroup);
  }
}
