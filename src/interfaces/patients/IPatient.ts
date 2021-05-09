import IMkbToPatient from '@/interfaces/mkb/IMkbToPatient';
import IRepresentativeToPatient from '@/interfaces/representatives/IRepresentativeToPatient';
import IDisability from '@/interfaces/disabilities/IDisability';
import IAnthropometryData from '../anthropometry/IAnthropometryData';
import IHuman from '../humans/IHuman';

export default interface IPatient {
  id?: string;
  human: IHuman;
  anthropometryData: IAnthropometryData[];
  mkbToPatient: IMkbToPatient[];
  representativeToPatient: IRepresentativeToPatient[];
  disabilities: IDisability[];

  getAnthropometryDataFull: () => string;
}
