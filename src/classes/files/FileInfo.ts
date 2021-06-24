import { v4 as uuidv4 } from 'uuid';
import IFileInfo from '@/interfaces/files/IFileInfo';

export default class FileInfo implements IFileInfo {
  id?: string = uuidv4();
  category = '';
  originalName = '';
  file?: File;
  isDraft?: boolean = false;

  constructor(fileInfo: IFileInfo) {
    this.id = fileInfo.id;
    this.category = fileInfo.category;
    this.originalName = fileInfo.originalName;

    if (fileInfo.file) {
      this.file = fileInfo.file;
    }

    this.isDraft = fileInfo.isDraft ?? false;
  }
}
