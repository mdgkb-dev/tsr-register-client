import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';
import IRegisterDiagnosis from '@/interfaces/registers/IRegisterDiagnosis';
import IRegisterGroup from '@/interfaces/registers/IRegisterGroup';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import IRegisterToPatient from '@/interfaces/registers/IRegisterToPatient';

export default interface IRegister {
  id?: string;
  name: string;
  registerDiagnosis: IRegisterDiagnosis[];
  registerDiagnosisForDelete: string[];
  registerGroups: IRegisterGroup[];
  registerGroupsForDelete: string[];
  registerToPatient: IRegisterToPatient[];
  registerToPatientCount: number;

  addRegisterGroup: () => void;
  removeRegisterGroup: (index: number) => void;

  getProps: () => IRegisterProperty[];
  patientIncludableByDiagnosis: (patientDiagnosis: IPatientDiagnosis[]) => boolean;
  patientInRegister: (registerToPatient: IRegisterToPatient[]) => boolean;
  getTagName: () => string;
}
