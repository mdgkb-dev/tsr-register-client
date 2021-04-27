import IHuman from '../humans/IHuman';
import IAnthropometryData from '../anthropometry/IAnthropometryData';
import IMkbToPatient from '@/interfaces/mkb/IMkbToPatient';
import IRepresentationType from '@/interfaces/representatives/IRepresetnationType';
import IDisability from '@/interfaces/disabilities/IDisability';

export default interface IPatient {
  id?: string;
  human: IHuman;
  anthropometryData: IAnthropometryData[];
  mkbToPatient: IMkbToPatient[];
  representativeToPatient: IRepresentationType[];
  disabilities: IDisability[];
}
