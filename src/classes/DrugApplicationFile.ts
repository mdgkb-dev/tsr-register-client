import FileInfo from '@/classes/files/FileInfo';
import ClassHelper from '@/services/ClassHelper';

export default class DrugApplicationFile {
  id?: string;
  @ClassHelper.GetClassConstructor(FileInfo)
  fileInfo: FileInfo = new FileInfo();
  fileInfoId?: string;
  drugApplicationId?: string;
  comment = '';
  name = '';

  constructor(i?: DrugApplicationFile) {
    ClassHelper.BuildClass(this, i);
  }
}
