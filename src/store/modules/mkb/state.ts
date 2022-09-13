import IMkbClass from '@/interfaces/mkb/IMkbClass';
import IMkbConcreteDiagnosis from '@/interfaces/mkb/IMkbConcreteDiagnosis';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IMkbElement from '@/interfaces/mkb/IMkbElement';
import IMkbGroup from '@/interfaces/mkb/IMkbGroup';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';

export interface State {
  mkbClasses: IMkbClass[];
  mkbDiagnosis: IMkbDiagnosis[];
  mkbFilteredDiagnosis: IMkbDiagnosis[];
  mkbFilteredSubDiagnosis: IMkbSubDiagnosis[];
  mkbFilteredConcreteDiagnosis: IMkbConcreteDiagnosis[];
  mkbGroups: IMkbGroup[];
  mkbSubDiagnosis: IMkbSubDiagnosis[];
  mkbConcreteDiagnosis: IMkbConcreteDiagnosis[];
  mkbClass: IMkbClass;
  mkbElement: IMkbElement;
}
