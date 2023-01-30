import IFileInfo from '@/interfaces/files/IFileInfo';
import IRegion from '@/interfaces/IRegion';

export default class HmfseScaleQuestion {
  id?: string;
  name = '';

  constructor(i?: IRegion) {
    if (!i) return;
    this.id = i.id;
    this.name = i.name;
  }

  getFileInfos(): IFileInfo[] {
    return [];
  }
}
