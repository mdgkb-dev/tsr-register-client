import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import ISearch from '@/interfaces/shared/ISearch';

export default interface ISearchDiagnosis extends ISearch {
  diagnosis: IMkbDiagnosis;
}
