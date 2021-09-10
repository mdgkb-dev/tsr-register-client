import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';
import IRegisterDiagnosis from '@/interfaces/registers/IRegisterDiagnosis';
import IRegisterGroupToRegister from '@/interfaces/registers/IRegisterGroupToRegister';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import IRegisterToPatient from '@/interfaces/registers/IRegisterToPatient';

export default interface IRegister {
  id?: string;
  name: string;
  registerDiagnosis: IRegisterDiagnosis[];
  registerDiagnosisForDelete: string[];
  registerGroupToRegister: IRegisterGroupToRegister[];
  registerGroupToRegisterForDelete: string[];
  registerToPatient: IRegisterToPatient[];
  registerToPatientCount: number;

  getProps: () => IRegisterProperty[];
  patientIncludableByDiagnosis: (patientDiagnosis: IPatientDiagnosis[]) => boolean;
  patientInRegister: (registerToPatient: IRegisterToPatient[]) => boolean;
}
