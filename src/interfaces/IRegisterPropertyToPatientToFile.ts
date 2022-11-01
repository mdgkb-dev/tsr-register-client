import IFileInfo from '@/interfaces/files/IFileInfo';
import IRegisterPropertyToPatient from '@/interfaces/IRegisterPropertyToPatient';

export default interface IRegisterPropertyToPatientToFile {
  id?: string;
  registerPropertyToPatient?: IRegisterPropertyToPatient;
  registerPropertyToPatientId?: string;
  fileInfoId?: string;
  fileInfo: IFileInfo;
}
