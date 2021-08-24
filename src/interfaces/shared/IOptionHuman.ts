import IRepresentative from '@/interfaces/representatives/IRepresentative';
import ISearch from '@/interfaces/shared/ISearch';
import IOption from '@/interfaces/shared/IOption';
import IHuman from '@/interfaces/humans/IHuman';

export default interface IOptionHuman extends IOption {
  human: IHuman;
}
