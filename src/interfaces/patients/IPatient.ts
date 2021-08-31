import IHeightWeight from '@/interfaces/anthropometry/IHeightWeight';
import IDisability from '@/interfaces/disabilities/IDisability';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IPatientConstructor from '@/interfaces/patients/IPatientConstructor';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';

export default interface IPatient extends IPatientConstructor {
  getRegisterPropertyValueSet: (setId: string) => boolean;
  getActuallyDisability: () => IDisability;
  getHeightWeightShort: () => string;
  getLastHeightWeight: () => IHeightWeight | undefined;
  getBmiGroup: () => string;
  getRegisterPropertyValue: (property: IRegisterProperty) => boolean | string | number | Date | null;
  setRegisterPropertyValue: (value: number | string | Date, property: IRegisterProperty) => void;
  getFileInfos: () => IFileInfo[];
}
