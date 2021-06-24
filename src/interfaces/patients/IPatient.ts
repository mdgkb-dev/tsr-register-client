import IRepresentativeToPatient from '@/interfaces/representatives/IRepresentativeToPatient';
import IDisability from '@/interfaces/disabilities/IDisability';
import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';
import IHeightWeight from '@/interfaces/anthropometry/IHeightWeight';
import IRegisterToPatient from '@/interfaces/registers/IRegisterToPatient';
import IRegisterPropertyToPatient from '@/interfaces/registers/IRegisterPropertyToPatient';
import IRegisterPropertySetToPatient from '@/interfaces/registers/IRegisterPropertySetToPatient';
import IAnthropometryData from '../anthropometry/IAnthropometryData';
import IHuman from '../humans/IHuman';

export default interface IPatient {
  id?: string;
  human: IHuman;
  anthropometryData: IAnthropometryData[];
  patientDiagnosis: IPatientDiagnosis[];
  representativeToPatient: IRepresentativeToPatient[];
  disabilities: IDisability[];
  heightWeight: IHeightWeight[];
  registerToPatient: IRegisterToPatient[];
  registerPropertyToPatient: IRegisterPropertyToPatient[];
  registerPropertySetToPatient: IRegisterPropertySetToPatient[];

  getAnthropometryDataFull: () => string;
  getActuallyDisability: () => IDisability;
  getLastAnthropometryValue: (name: string) => number;
  getBmiGroup: () => string;
}
