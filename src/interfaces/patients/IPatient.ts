import ICircumference from '@/interfaces/anthropometry/ICircumference';
import IHeightWeight from '@/interfaces/anthropometry/IHeightWeight';
import IDisability from '@/interfaces/disabilities/IDisability';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IPatientConstructor from '@/interfaces/patients/IPatientConstructor';
import IPatientDiagnosisAnamnesis from '@/interfaces/patients/IPatientDiagnosisAnamnesis';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import IRegisterPropertyToPatient from '@/interfaces/registers/IRegisterPropertyToPatient';

export default interface IPatient extends IPatientConstructor {
  findProperty: (propertyId: string) => IRegisterPropertyToPatient | undefined;
  getActuallyDisability: () => IDisability;
  getAnamnesis: (id: string) => IPatientDiagnosisAnamnesis;
  getBmiGroup: () => string;
  getFileInfos: () => IFileInfo[];
  getHeightWeightShort: () => string;
  getLastHeightWeight: () => IHeightWeight | undefined;
  getLastCircumference: (circumference: ICircumference[]) => ICircumference | undefined;
  getOtherPropertyValue: (property: IRegisterProperty) => string | undefined;
  getRegisterPropertyValue: (property: IRegisterProperty, originalValue: boolean) => boolean | string | number | Date | null;
  getRegisterPropertyValueSet: (setId: string) => boolean;
  pushRegisterProperty: (propertyId: string) => void;
  setRegisterPropertyValue: (value: number | string | Date, property: IRegisterProperty) => void;
  setRegisterPropertyValueOther: (value: string, property: IRegisterProperty) => void;
  setRegisterPropertyValueSet: (isAdd: boolean, setId: string) => void;
}
