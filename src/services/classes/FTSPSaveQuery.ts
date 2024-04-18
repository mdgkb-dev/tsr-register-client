import { FTSP } from '@/Main';
import ClassHelper from '@/services/ClassHelper';

export default class FTSPSaveQuery {
  id?: string;
  ftsp?: string;

  constructor(i?: FTSPSaveQuery) {
    ClassHelper.BuildClass(this, i);
  }

  static Create(ftsp: FTSP): FTSPSaveQuery {
    const item = new FTSPSaveQuery();
    item.id = ClassHelper.CreateUUID();
    item.ftsp = JSON.stringify(ftsp);
    return item;
  }
}
