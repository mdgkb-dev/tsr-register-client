import IPatient from '@/interfaces/patients/IPatient';
import IRepresentative from '@/interfaces/representatives/IRepresentative';

export default interface IRepresentationType {
  id?: string;
  type: string;
  patientId?: string;
  patient?: IPatient;
  representative?: IRepresentative;
}
