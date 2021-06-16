import IRegister from '@/interfaces/registers/IRegister';
import IRegisterGroupToRegister from '@/interfaces/registers/IRegisterGroupToRegister';
import RegisterGroupToRegister from '@/classes/registers/RegisterGroupToRegister';

export default class Register implements IRegister {
  id?: string;
  name?: string;
  registerGroupToRegister: IRegisterGroupToRegister[] = [];

  constructor(register?: IRegister) {
    if (!register) {
      return;
    }
    this.id = register.id;
    this.name = register.name;
    if (register.registerGroupToRegister) {
      this.registerGroupToRegister = register.registerGroupToRegister.map((group: IRegisterGroupToRegister) => new RegisterGroupToRegister(group));
    }
  }
}
