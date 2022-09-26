import ICircumference from '@/interfaces/anthropometry/ICircumference';
import IHeightWeight from '@/interfaces/anthropometry/IHeightWeight';
import IDisability from '@/interfaces/disabilities/IDisability';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IRegisterGroupToPatient from '@/interfaces/IRegisterGroupToPatient';
import IPatientConstructor from '@/interfaces/patients/IPatientConstructor';
import IPatientDiagnosisAnamnesis from '@/interfaces/patients/IPatientDiagnosisAnamnesis';

export default interface IPatient extends IPatientConstructor {
  getActuallyDisability: () => IDisability;
  getAnamnesis: (id: string) => IPatientDiagnosisAnamnesis;
  // getBmiGroup: () => string;
  getFileInfos: () => IFileInfo[];
  getHeightWeightShort: () => string;
  getLastHeightWeight: () => IHeightWeight | undefined;
  getLastCircumference: (circumference: ICircumference[]) => ICircumference | undefined;

  getParentsAddresses: () => string[];
  addRegisterGroupToPatient: (registerGroupId: string) => void;
  removeRegisterGroupToPatient: (paneName: string) => void;
  getRegisterGroupsToPatientByGroupId: (groupId: string) => IRegisterGroupToPatient[];
  initRegisterGroupsToPatient: (registerGroupId: string) => void;
}
