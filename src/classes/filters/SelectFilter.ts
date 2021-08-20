import ISelectFilter from '@/interfaces/filters/ISelectFilter';

export default class SelectFilter implements ISelectFilter {
  title = '';
  options = [''];

  constructor(i?: ISelectFilter) {
    if (!i) return;
    this.title = i.title;
    this.options = i.options;
  }
}
