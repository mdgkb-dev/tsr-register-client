import IRegister from '../../interfaces/registers/IRegister';

export default class Register implements IRegister {
  id!: string;
  name = '';

  constructor(register?: IRegister) {
    if (!register) {
      return;
    }
    this.id = register.id;
    this.name = register.name;
  }
}
