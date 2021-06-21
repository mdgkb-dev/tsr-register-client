import IRegister from '@/interfaces/registers/IRegister';
import IRegisterGroupToRegister from '@/interfaces/registers/IRegisterGroupToRegister';
import RegisterGroupToRegister from '@/classes/registers/RegisterGroupToRegister';
import IRegisterToPatient from '@/interfaces/registers/IRegisterToPatient';
import RegisterToPatient from '@/classes/registers/RegisterToPatient';

export default class Register implements IRegister {
  id?: string;
  name?: string;
  registerGroupToRegister: IRegisterGroupToRegister[] = [];
  registerToPatient: IRegisterToPatient[] = [];

  constructor(register?: IRegister) {
    if (!register) {
      return;
    }
    this.id = register.id;
    this.name = register.name;
    if (register.registerGroupToRegister) {
      this.registerGroupToRegister = register.registerGroupToRegister.map((group: IRegisterGroupToRegister) => new RegisterGroupToRegister(group));
    }
    if (register.registerToPatient) {
      this.registerToPatient = register.registerToPatient.map((item: IRegisterToPatient) => new RegisterToPatient(item));
    }
  }
}
