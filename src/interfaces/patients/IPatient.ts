import IHeightWeight from '@/interfaces/anthropometry/IHeightWeight';
import IDisability from '@/interfaces/disabilities/IDisability';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IPatientConstructor from '@/interfaces/patients/IPatientConstructor';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';

import IRegisterPropertyToPatient from '../registers/IRegisterPropertyToPatient';

export default interface IPatient extends IPatientConstructor {
  getRegisterPropertyValueSet: (setId: string) => boolean;
  getActuallyDisability: () => IDisability;
  getHeightWeightShort: () => string;
  getLastHeightWeight: () => IHeightWeight | undefined;
  getBmiGroup: () => string;
  findProperty: (propertyId: string) => IRegisterPropertyToPatient | undefined;
  pushRegisterProperty: (propertyId: string) => void;
  getOtherPropertyValue: (property: IRegisterProperty) => string | undefined;
  getRegisterPropertyValue: (property: IRegisterProperty) => boolean | string | number | Date | null;
  setRegisterPropertyValueOther: (value: string, property: IRegisterProperty) => void;
  setRegisterPropertyValue: (value: number | string | Date, property: IRegisterProperty) => void;
  setRegisterPropertyValueSet: (isAdd: boolean, setId: string) => void;
  getFileInfos: () => IFileInfo[];
}
