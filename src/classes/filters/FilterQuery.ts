import IFilterModel from '@/interfaces/filters/IFilterModel';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';

export default class FilterQuery implements IFilterQuery {
  filterModels: IFilterModel[] = [];
  offset = 0;

  toUrl(): string {
    const offset = `offset=${this.offset}`;

    const filterModels = this.filterModels.map((filterModel: IFilterModel) => {
      return `filterModel=${JSON.stringify(filterModel)}`;
    });
    return [offset, ...filterModels].join('&');
  }
}
