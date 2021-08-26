import IFileInfoToDocument from '@/interfaces/documents/IFileInfoToDocument';

import FileInfo from '../files/FileInfo';

export default class FileInfoToDocument implements IFileInfoToDocument {
  id?: string;
  documentId?: string;
  fileInfoId?: string;
  fileInfo?: FileInfo;

  constructor(i?: IFileInfoToDocument) {
    if (!i) return;
    this.id = i.id;
    this.documentId = i.documentId;
    this.fileInfoId = i.fileInfoId;
    if (i.fileInfo) this.fileInfo = new FileInfo(i.fileInfo);
  }
}
