import IMkbClass from '@/interfaces/mkb/IMkbClass';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';
import IMkbGroup from '@/interfaces/mkb/IMkbGroup';

export interface State {
  mkbClasses: IMkbClass[];
  mkbDiagnosis: IMkbDiagnosis[];
  mkbFilteredDiagnosis: IMkbDiagnosis[];
  mkbGroups: IMkbGroup[];
  mkbSubDiagnosis: IMkbSubDiagnosis[];
}
