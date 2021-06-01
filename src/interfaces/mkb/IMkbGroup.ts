import IMkbSubGroup from '@/interfaces/mkb/IMkbSubGroup';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';

export default interface IMkbGroup {
  id?: string;
  name?: string;
  rangeStart?: string;
  rangeEnd?: string;
  comment?: string;
  mkbClassId?: string;
  relevant?: boolean;
  mkbSubGroups: IMkbSubGroup[];
  mkbDiagnosis: IMkbDiagnosis[];
  disabled: boolean;

  getDiagnosis: (diagnosisId: string) => IMkbDiagnosis | undefined;
}
