import IRegisterGroupToRegister from '@/interfaces/registers/IRegisterGroupToRegister';
import IRegisterToPatient from '@/interfaces/registers/IRegisterToPatient';
import IRegisterDiagnosis from '@/interfaces/registers/IRegisterDiagnosis';

export default interface IRegister {
  id?: string;
  name: string;
  registerDiagnosis: IRegisterDiagnosis[];
  registerGroupToRegister: IRegisterGroupToRegister[];
  registerToPatient: IRegisterToPatient[];
}
