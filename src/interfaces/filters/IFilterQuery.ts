import IFilterModel from '@/interfaces/filters/IFilterModel';

export default interface IFilterQuery {
  offset: number;
  filterModels: IFilterModel[];

  toUrl: () => string;
}
