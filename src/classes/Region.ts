import IRegion from '@/interfaces/IRegion';
import ClassHelper from '@/services/ClassHelper';

export default class Region {
  id?: string;
  name = '';

  constructor(i?: IRegion) {
    ClassHelper.BuildClass(this, i);
  }
}
