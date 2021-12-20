import IRegion from '@/interfaces/IRegion';

export default class Region implements IRegion {
  id?: string;
  name = '';

  constructor(i?: IRegion) {
    if (!i) return;
    this.id = i.id;
    this.name = i.name;
  }
}
