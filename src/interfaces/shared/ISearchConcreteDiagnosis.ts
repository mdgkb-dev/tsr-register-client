import IMkbConcreteDiagnosis from '@/interfaces/mkb/IMkbConcreteDiagnosis';
import ISearch from '@/interfaces/shared/ISearch';

export default interface ISearchConcreteDiagnosis extends ISearch {
  mkbConcreteDiagnosis: IMkbConcreteDiagnosis;
}
