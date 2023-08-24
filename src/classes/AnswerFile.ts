import ClassHelper from '@/services/ClassHelper';

import FileInfo from './files/FileInfo';

export default class AnswerFile {
  id?: string;
  answerId?: string;
  comment = '';
  fileInfoId?: string;
  fileInfo: FileInfo = new FileInfo();

  constructor(i?: AnswerFile) {
    ClassHelper.BuildClass(this, i);
  }
}
