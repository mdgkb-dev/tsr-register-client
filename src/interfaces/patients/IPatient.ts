import IHuman from '../humans/IHuman';
import IAnthropometryData from '../anthropometry/IAnthropometryData';
import IMkbToPatient from '@/interfaces/mkb/IMkbToPatient';

export default interface IPatient {
  id?: string;
  human: IHuman;
  anthropometryData: IAnthropometryData[];
  mkbToPatient: IMkbToPatient[];
}
