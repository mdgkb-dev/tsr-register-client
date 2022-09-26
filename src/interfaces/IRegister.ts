import IRegisterDiagnosis from '@/interfaces/IRegisterDiagnosis';
import IRegisterGroup from '@/interfaces/IRegisterGroup';
import IRegisterProperty from '@/interfaces/IRegisterProperty';
import IRegisterToPatient from '@/interfaces/IRegisterToPatient';
import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';

export default interface IRegister {
  id?: string;
  name: string;
  registerDiagnosis: IRegisterDiagnosis[];
  registerDiagnosisForDelete: string[];
  registerGroups: IRegisterGroup[];
  registerGroupsForDelete: string[];
  registerToPatient: IRegisterToPatient[];
  registerToPatientCount: number;

  addRegisterGroup: (item?: IRegisterGroup) => void;
  removeRegisterGroup: (index: number) => void;

  getProps: () => IRegisterProperty[];
  patientIncludableByDiagnosis: (patientDiagnosis: IPatientDiagnosis[]) => boolean;
  patientInRegister: (registerToPatient: IRegisterToPatient[]) => boolean;
  getTagName: () => string;
  sortGroups: () => void;
}
