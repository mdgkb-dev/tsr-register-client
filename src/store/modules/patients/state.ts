import IPatient from '@/interfaces/patients/IPatient';

export interface State {
  patients: IPatient[];
  patient?: IPatient;
}
