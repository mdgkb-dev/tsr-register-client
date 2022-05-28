import IMkbClass from '@/interfaces/mkb/IMkbClass';
import IMkbConcreteDiagnosis from '@/interfaces/mkb/IMkbConcreteDiagnosis';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IMkbGroup from '@/interfaces/mkb/IMkbGroup';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';
import ISearch from '@/interfaces/shared/ISearch';

export default interface ISearchMkb extends ISearch {
  mkbElement: IMkbClass | IMkbGroup | IMkbDiagnosis | IMkbSubDiagnosis | IMkbConcreteDiagnosis;
}
