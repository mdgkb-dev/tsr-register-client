import IFilterModel from '@/interfaces/filters/IFilterModel';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';

export default class FilterQuery implements IFilterQuery {
  id?: string;
  filterModels: IFilterModel[] = [];
  offset = 0;

  toUrl(): string {
    const offset = `offset=${this.offset}`;
    const filterModels = this.filterModels.map((filterModel: IFilterModel) => {
      return `filterModel=${JSON.stringify(filterModel)}`;
    });
    let url = `?${[offset, ...filterModels].join('&')}`;
    if (this.id) {
      url = `${this.id}${url}`;
    }
    return url;
  }
}
