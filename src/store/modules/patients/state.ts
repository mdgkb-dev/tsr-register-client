import IPatient from '@/interfaces/patients/IPatient';
import IFilesList from '@/interfaces/files/IFIlesList';

export interface State {
  patients: IPatient[];
  patient: IPatient;
  filteredPatients?: IPatient[];
  photoFileList: IFilesList[];
}
