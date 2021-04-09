import IHuman from '../humans/IHuman';
import IRepresetnationType from './IRepresetnationType';
import IDocumentFieldValue from '@/interfaces/documents/IDocumentFieldValue';

export default interface IRepresentative {
  id?: string;
  human: IHuman;
  representativeToPatient: IRepresetnationType[];
}
