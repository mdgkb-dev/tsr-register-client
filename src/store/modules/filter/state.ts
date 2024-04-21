import FilterQuery from '@/services/classes/filters/FilterQuery';
import FTSP from '@/services/classes/filters/FTSP';
import SortModel from '@/services/classes/SortModel';

export interface State {
  trigger: string;
  restore: boolean;
  filterQuery: FilterQuery;
  storeModule: string;
  action: string;
  sortModels: SortModel[];
  setDefaultSortModel: boolean;
  filterExists: boolean;
  ftsp: FTSP;
}
