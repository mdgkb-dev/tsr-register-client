import IMainHeader from '@/interfaces/shared/IMainHeader';

import Link from './Link';

export default class MainHeader implements IMainHeader {
  title = '';
  links?: Link[];
  save?: undefined | (() => Promise<void>);
  create?: undefined | (() => Promise<void>) | (() => void);

  constructor(i?: IMainHeader) {
    if (!i) return;
    this.title = i.title;
    this.links = i.links;
    this.save = i.save;
    this.create = i.create;
  }
}
