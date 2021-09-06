import IPatient from '@/interfaces/patients/IPatient';

export default interface IPatientsWithCount {
  patients: IPatient[];
  count: number;
}
