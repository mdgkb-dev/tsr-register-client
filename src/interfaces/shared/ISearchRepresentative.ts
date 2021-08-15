import IRepresentative from '@/interfaces/representatives/IRepresentative';
import ISearch from '@/interfaces/shared/ISearch';

export default interface ISearchRepresentative extends ISearch {
  representative: IRepresentative;
}
