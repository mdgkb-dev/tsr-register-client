import IHuman from '../humans/IHuman';
import IAnthropometryData from '../anthropometry/IAnthropometryData';

export default interface IPatient {
  id?: number;
  human: IHuman;
  anthropometryData: IAnthropometryData[];
}
