import IFilesList from '@/interfaces/files/IFIlesList';
import IPatient from '@/interfaces/patients/IPatient';

export interface State {
  patients: IPatient[];
  patient: IPatient;
  filteredPatients?: IPatient[];
  photoFileList: IFilesList[];
}
