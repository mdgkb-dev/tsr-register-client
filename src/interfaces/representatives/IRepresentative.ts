import IHuman from '../humans/IHuman';
import IRepresetnationType from './IRepresetnationType';

export default interface IRepresentative {
  id?: number;
  human: IHuman;
  representativeToPatient: IRepresetnationType[];
}
