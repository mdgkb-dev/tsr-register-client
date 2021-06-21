import IRegisterGroupToRegister from '@/interfaces/registers/IRegisterGroupToRegister';
import IRegisterToPatient from '@/interfaces/registers/IRegisterToPatient';

export default interface IRegister {
  id?: string;
  name?: string;
  registerGroupToRegister: IRegisterGroupToRegister[];
  registerToPatient: IRegisterToPatient[];
}
