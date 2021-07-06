import Register from '@/classes/registers/Register';
import RegisterGroup from '@/classes/registers/RegisterGroup';
import IRegister from '@/interfaces/registers/IRegister';
import IRegisterGroup from '@/interfaces/registers/IRegisterGroup';
import IRegisterGroupToRegister from '@/interfaces/registers/IRegisterGroupToRegister';

export default class RegisterGroupToRegister implements IRegisterGroupToRegister {
  id?: string;
  registerId?: string;
  registerGroupId?: string;
  order = 0;

  registerGroup?: IRegisterGroup;
  register?: IRegister;

  constructor(item?: IRegisterGroupToRegister) {
    if (!item) {
      return;
    }
    this.id = item.id;
    this.registerId = item.registerId;
    this.registerGroupId = item.registerGroupId;
    this.order = item.order;
    if (item.register) this.register = new Register(item.register);
    if (item.registerGroup) this.registerGroup = new RegisterGroup(item.registerGroup);
  }
}
