import IRepresentativeToPatient from '@/interfaces/representatives/IRepresentativeToPatient';
import IDisability from '@/interfaces/disabilities/IDisability';
import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';
import IHeightWeight from '@/interfaces/anthropometry/IHeightWeight';
import IAnthropometryData from '../anthropometry/IAnthropometryData';
import IHuman from '../humans/IHuman';
import IRegisterToPatient from '@/interfaces/registers/IRegisterToPatient';

export default interface IPatient {
  id?: string;
  human: IHuman;
  anthropometryData: IAnthropometryData[];
  patientDiagnosis: IPatientDiagnosis[];
  representativeToPatient: IRepresentativeToPatient[];
  disabilities: IDisability[];
  heightWeight: IHeightWeight[];
  registerToPatient: IRegisterToPatient[];

  getAnthropometryDataFull: () => string;
  getActuallyDisability: () => IDisability;
  getLastAnthropometryValue: (name: string) => number;
  getBmiGroup: () => string;
}
