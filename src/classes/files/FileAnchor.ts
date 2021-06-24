import IFileAnchor from '@/interfaces/files/IFileAnchor';

export default class FileAnchor implements IFileAnchor {
  href: string;
  download: string;

  constructor(anchor: IFileAnchor) {
    this.href = anchor.href;
    this.download = anchor.download;
  }
}
