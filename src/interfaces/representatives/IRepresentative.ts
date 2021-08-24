import IHuman from '../humans/IHuman';
import IRepresentativeToPatient from './IRepresentativeToPatient';

export default interface IRepresentative {
  id?: string;
  human: IHuman;
  representativeToPatient: IRepresentativeToPatient[];
  representativeToPatientForDelete: string[];
}
