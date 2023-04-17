import FileInfo from '@/classes/files/FileInfo';
import Period from '@/classes/shared/Period';
import ClassHelper from '@/services/ClassHelper';

export default class Edv {
  id?: string;
  period?: Period = new Period();
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
