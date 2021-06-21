import IRegister from '@/interfaces/registers/IRegister';
import IRegisterGroupToRegister from '@/interfaces/registers/IRegisterGroupToRegister';
import IRegisterDiagnosis from '@/interfaces/registers/IRegisterDiagnosis';
import RegisterGroupToRegister from '@/classes/registers/RegisterGroupToRegister';
import RegisterDiagnosis from '@/classes/registers/RegisterDiagnosis';

export default class Register implements IRegister {
  id?: string;
  name?: string;
  registerDiagnosis: IRegisterDiagnosis[] = [];
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
    if (register.registerDiagnosis) {
      this.registerDiagnosis = register.registerDiagnosis.map((registerDiagnosis: IRegisterDiagnosis) => new RegisterDiagnosis(registerDiagnosis));
    }
  }
}
