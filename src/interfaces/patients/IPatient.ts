import IHeightWeight from '@/interfaces/anthropometry/IHeightWeight';
import IDisability from '@/interfaces/disabilities/IDisability';
import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';
import IRegisterPropertySetToPatient from '@/interfaces/registers/IRegisterPropertySetToPatient';
import IRegisterPropertyToPatient from '@/interfaces/registers/IRegisterPropertyToPatient';
import IRegisterToPatient from '@/interfaces/registers/IRegisterToPatient';
import IRepresentativeToPatient from '@/interfaces/representatives/IRepresentativeToPatient';

import IAnthropometryData from '../anthropometry/IAnthropometryData';
import IHuman from '../humans/IHuman';
import IRegisterProperty from '../registers/IRegisterProperty';

export default interface IPatient {
  id?: string;
  human: IHuman;
  anthropometryData: IAnthropometryData[];
  patientDiagnosis: IPatientDiagnosis[];
  representativeToPatient: IRepresentativeToPatient[];
  representativeToPatientForDelete: string[];
  disabilities: IDisability[];
  disabilitiesForDelete: string[];
  heightWeight: IHeightWeight[];
  registerToPatient: IRegisterToPatient[];
  registerPropertyToPatient: IRegisterPropertyToPatient[];
  registerPropertySetToPatient: IRegisterPropertySetToPatient[];

  getAnthropometryDataFull: () => string;
  getAnthropometryShortData: () => string;
  getActuallyDisability: () => IDisability;
  getLastAnthropometryValue: (name: string) => number;
  getBmiGroup: () => string;
  getRegisterPropertyValue: (property: IRegisterProperty) => boolean | string | number | Date | null;
  setRegisterPropertyValue: (value: number | string | Date, property: IRegisterProperty) => void;
}
