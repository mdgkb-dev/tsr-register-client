import IRepresentativeToPatient from '@/interfaces/representatives/IRepresentativeToPatient';
import IDisability from '@/interfaces/disabilities/IDisability';
import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';
import IHeightWeight from '@/interfaces/anthropometry/IHeightWeight';
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

  getAnthropometryDataFull: () => string;
  getActuallyDisability: () => IDisability;
  getLastAnthropometryValue: (name: string) => number;
  getBmiGroup: () => string;
}
