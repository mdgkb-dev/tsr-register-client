import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';

export default interface IMkbNode {
  id: string;
  level: number;
  data: IMkbDiagnosis;
  checked: boolean;
  subCode: number;
  code: string;

  mkbDiagnosis: IMkbDiagnosis[];
  mkbSubDiagnosis: IMkbSubDiagnosis[];
  mkbDiagnosisId: string;

  parent: IMkbNode;
  childNodes: IMkbNode[];
}
