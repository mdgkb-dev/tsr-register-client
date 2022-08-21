import ICircumference from '@/interfaces/anthropometry/ICircumference';
import IHeightWeight from '@/interfaces/anthropometry/IHeightWeight';
import IDisability from '@/interfaces/disabilities/IDisability';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IPatientConstructor from '@/interfaces/patients/IPatientConstructor';
import IPatientDiagnosisAnamnesis from '@/interfaces/patients/IPatientDiagnosisAnamnesis';
import IRegisterGroupToPatient from '@/interfaces/registers/IRegisterGroupToPatient';

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
