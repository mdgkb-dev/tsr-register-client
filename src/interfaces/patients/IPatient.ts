import IHuman from '../humans/IHuman';

export default interface IPatient {
  id?: number;
  human: IHuman;
}
