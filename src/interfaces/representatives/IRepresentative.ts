import IHuman from '../humans/IHuman';
import IRepresetnationType from './IRepresetnationType';

export default interface IRepresentative {
  id?: string;
  human: IHuman;
  representativeToPatient: IRepresetnationType[];
}
