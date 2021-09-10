import IFilterModel from '@/interfaces/filters/IFilterModel';

export default interface IFilterQuery {
  id?: string;
  offset: number;
  filterModels: IFilterModel[];

  toUrl: () => string;
}
