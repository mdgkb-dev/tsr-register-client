import IHuman from '../humans/IHuman';
import IRepresetnationType from './IRepresentativeToPatient';

export default interface IRepresentative {
  id?: string;
  human: IHuman;
  representativeToPatient: IRepresetnationType[];
}
