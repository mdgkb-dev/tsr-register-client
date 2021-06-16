import IRegisterGroupToRegister from '@/interfaces/registers/IRegisterGroupToRegister';

export default interface IRegister {
  id?: string;
  name?: string;
  registerGroupToRegister: IRegisterGroupToRegister[];
}
