import IMkbConcreteDiagnosis from '@/interfaces/mkb/IMkbConcreteDiagnosis';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';
import { MkbLevel } from '@/interfaces/MkbLevel';

export default interface IMkbNode {
  id: string;
  level: MkbLevel;
  data: IMkbDiagnosis;
  checked: boolean;
  subCode: number;
  code: string;

  mkbDiagnosis: IMkbDiagnosis[];
  mkbConcreteDiagnosis: IMkbConcreteDiagnosis[];
  mkbSubDiagnosis: IMkbSubDiagnosis[];
  mkbSubDiagnosisId: string;
  mkbDiagnosisId: string;
  mkbConcreteDiagnosisId: string;

  parent: IMkbNode;
  childNodes: IMkbNode[];
}
