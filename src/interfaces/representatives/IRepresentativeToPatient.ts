import IPatient from '@/interfaces/patients/IPatient';
import IRepresentative from '@/interfaces/representatives/IRepresentative';

export default interface IRepresentativeToPatient {
  id?: string;
  type: string;
  patientId?: string;
  patient?: IPatient;
  representative?: IRepresentative;
}
