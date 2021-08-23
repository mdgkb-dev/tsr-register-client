import IFileInfo from '@/interfaces/files/IFileInfo';

export default interface IFileInfoToDocument {
  id?: string;
  documentId?: string;
  fileInfo?: IFileInfo;
  fileInfoId?: string;
}
