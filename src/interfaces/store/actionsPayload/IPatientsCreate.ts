import IFileSet from '@/interfaces/files/IFileSet';
import IPatient from '@/interfaces/patients/IPatient';

export default interface IPatientsCreate {
  patient: IPatient;
  scans: IFileSet[];
}
