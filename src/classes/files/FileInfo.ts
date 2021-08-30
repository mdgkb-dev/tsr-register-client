import { v4 as uuidv4 } from 'uuid';

import IFile from '@/interfaces/files/IFile';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IFilesList from '@/interfaces/files/IFIlesList';

export default class FileInfo implements IFileInfo {
  id?: string = uuidv4();
  category = '';
  originalName = '';
  fileSystemPath?: string;
  file?: Blob;
  isDraft?: boolean = false;

  constructor(i?: IFileInfo) {
    if (!i) return;
    this.id = i.id;
    this.category = i.category;
    this.originalName = i.originalName;
    this.fileSystemPath = i.fileSystemPath;
    if (i.file) this.file = i.file;
    this.isDraft = i.isDraft ?? false;
  }

  static CreateDraft(file: File, category: string): IFileInfo {
    const fileInfo = new FileInfo();
    fileInfo.id = uuidv4();
    fileInfo.originalName = file.name;
    fileInfo.file = file;
    fileInfo.category = category;
    fileInfo.isDraft = true;
    return fileInfo;
  }

  static CreateFileFromBlob(file: IFile, id?: string): IFileInfo {
    const fileInfo = new FileInfo();
    fileInfo.id = id ?? uuidv4();
    fileInfo.originalName = file.name;
    fileInfo.file = file.blob;
    fileInfo.fileSystemPath = uuidv4();
    return fileInfo;
  }

  getImageUrl(): string {
    return `${process.env.VUE_APP_STATIC_URL}/${this.fileSystemPath}`;
  }

  getFileListObject(): IFilesList {
    return { name: this.originalName, url: this.getImageUrl() };
  }
}
