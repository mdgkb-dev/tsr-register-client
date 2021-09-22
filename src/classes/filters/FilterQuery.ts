import IFilterModel from '@/interfaces/filters/IFilterModel';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import ISortModel from '@/interfaces/filters/ISortModel';

export default class FilterQuery implements IFilterQuery {
  id?: string;
  filterModels: IFilterModel[] = [];
  sortModels: ISortModel[] = [];
  offset = 0;

  toUrl(): string {
    const offset = `offset=${this.offset}`;
    const filterModels = this.filterModels.map((filterModel: IFilterModel) => {
      return `filterModel=${JSON.stringify(filterModel)}`;
    });
    const sortModels = this.sortModels.map((sortModels: ISortModel) => {
      return `sortModel=${JSON.stringify(sortModels)}`;
    });
    let url = `?${[offset, ...filterModels, ...sortModels].join('&')}`;
    if (this.id) {
      url = `${this.id}${url}`;
    }
    return url;
  }
}
