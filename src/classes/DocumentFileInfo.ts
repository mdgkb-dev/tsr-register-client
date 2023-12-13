import ClassHelper from '@/services/ClassHelper';

import FileInfo from './files/FileInfo';

export default class DocumentFileInfo {
  id?: string;
  documentId?: string;
  fileInfoId?: string;
  @ClassHelper.GetClassConstructor(FileInfo)
  fileInfo: FileInfo = new FileInfo();

  constructor(i?: DocumentFileInfo) {
    ClassHelper.BuildClass(this, i);
  }
}
