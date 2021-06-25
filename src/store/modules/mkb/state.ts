import IMkbClass from '@/interfaces/mkb/IMkbClass';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IMkbGroup from '@/interfaces/mkb/IMkbGroup';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';

export interface State {
  mkbClasses: IMkbClass[];
  mkbDiagnosis: IMkbDiagnosis[];
  mkbFilteredDiagnosis: IMkbDiagnosis[];
  mkbGroups: IMkbGroup[];
  mkbSubDiagnosis: IMkbSubDiagnosis[];
}
