import Answer from '@/classes/Answer';
import FileInfo from '@/classes/files/FileInfo';
import IFileInfo from '@/interfaces/files/IFileInfo';
import ClassHelper from '@/services/ClassHelper';

export default class RegisterPropertyToPatientToFile {
  id?: string;
  registerPropertyToPatient?: Answer;
  registerPropertyToPatientId?: string;
  fileInfo: IFileInfo = new FileInfo();
  fileInfoId?: string;

  constructor(i?: RegisterPropertyToPatientToFile) {
    ClassHelper.BuildClass(this, i);
  }
}
