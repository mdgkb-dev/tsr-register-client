import FileInfo from '@/classes/files/FileInfo';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IRegisterPropertyToPatient from '@/interfaces/IRegisterPropertyToPatient';
import IRegisterPropertyToPatientToFile from '@/interfaces/IRegisterPropertyToPatientToFile';

export default class RegisterPropertyToPatientToFile implements IRegisterPropertyToPatientToFile {
  id?: string;
  registerPropertyToPatient?: IRegisterPropertyToPatient;
  registerPropertyToPatientId?: string;
  fileInfo: IFileInfo = new FileInfo();
  fileInfoId?: string;

  constructor(i?: IRegisterPropertyToPatientToFile) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.registerPropertyToPatientId = i.registerPropertyToPatientId;
    this.fileInfoId = i.fileInfoId;
    if (i.fileInfo) {
      this.fileInfo = new FileInfo(i.fileInfo);
    }
  }
}
