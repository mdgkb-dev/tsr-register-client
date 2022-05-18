import Pagination from '@/classes/filters/Pagination';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import ISortModel from '@/interfaces/filters/ISortModel';
import IPagination from '@/interfaces/IPagination';

export default class FilterQuery implements IFilterQuery {
  id?: string;
  col = '';
  value = '';
  filterModels: IFilterModel[] = [];
  sortModels: ISortModel[] = [];
  pagination: IPagination = new Pagination();
  withDeleted = false;
  offset = 0;
  limit = 0;
  allLoaded = false;

  toUrl(): string {
    const filterModels = this.filterModels?.map((filterModel: IFilterModel) => {
      return `filterModel=${JSON.stringify(filterModel)}`;
    });
    const sortModels = this.sortModels.map((sortModels: ISortModel) => {
      return `sortModel=${JSON.stringify(sortModels)}`;
    });

    const pagination = `pagination=${JSON.stringify(this.pagination)}`;

    const withDeleted = `withDeleted=${this.withDeleted}`;
    const col = `col=${this.col}`;
    const value = `value=${this.value}`;
    let url = `?${[...filterModels, ...sortModels, withDeleted, pagination, col, value].join('&')}`;
    if (this.id) {
      url = `${this.id}${url}`;
    }
    return url;
  }
  setAllLoaded(loadedItemsLength: number): void {
    if (loadedItemsLength >= this.pagination.limit) {
      return;
    }
    this.allLoaded = true;
  }

  setParams(col: string, value: string): void {
    this.col = col;
    this.value = value;
  }
}
