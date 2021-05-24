import IMkbClass from '@/interfaces/mkb/IMkbClass';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';

export interface State {
  mkbClasses: IMkbClass[];
  mkbDiagnosis: IMkbDiagnosis[];
  mkbSubDiagnosis: IMkbSubDiagnosis[];
}
