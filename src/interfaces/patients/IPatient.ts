import IMkbToPatient from '@/interfaces/mkb/IMkbToPatient';
import IRepresentationType from '@/interfaces/representatives/IRepresetnationType';
import IDisability from '@/interfaces/disabilities/IDisability';
import IAnthropometryData from '../anthropometry/IAnthropometryData';
import IHuman from '../humans/IHuman';

export default interface IPatient {
  id?: string;
  human: IHuman;
  anthropometryData: IAnthropometryData[];
  mkbToPatient: IMkbToPatient[];
  representativeToPatient: IRepresentationType[];
  disabilities: IDisability[];
}
