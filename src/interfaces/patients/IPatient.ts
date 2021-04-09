import IHuman from '../humans/IHuman';
import IAnthropometryData from '../anthropometry/IAnthropometryData';

export default interface IPatient {
  id?: string;
  human: IHuman;
  anthropometryData: IAnthropometryData[];
}
