import FileInfo from '@/classes/files/FileInfo';
import ClassHelper from '@/services/ClassHelper';

export default class Edv {
  id?: string;
  dateStart: Date = new Date();
  dateEnd: Date = new Date();
  disabilityId?: string;
  parameter1 = false;
  parameter2 = false;
  parameter3 = false;
  fileInfoId?: string;
  fileInfo?: FileInfo;

  constructor(i?: Edv) {
    ClassHelper.BuildClass(this, i);
  }
}
