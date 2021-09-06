import IFilesList from '@/interfaces/files/IFIlesList';
import IPatient from '@/interfaces/patients/IPatient';

export interface State {
  patients: IPatient[];
  count: number;
  patient: IPatient;
  filteredPatients?: IPatient[];
  photoFileList: IFilesList[];
  curPage: number;
}
