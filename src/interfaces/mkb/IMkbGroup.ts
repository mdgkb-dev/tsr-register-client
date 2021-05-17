import IMkbSubGroup from '@/interfaces/mkb/IMkbSubGroup';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';

export default interface IMkbGroup {
  id?: string;
  name?: string;
  rangeStart?: string;
  rangeEnd?: string;
  comment?: string;
  mkbClassId?: string;
  mkbSubGroups: IMkbSubGroup[];
  mkbDiagnosis: IMkbDiagnosis[];

  getDiagnosis: (diagnosisId: string) => IMkbDiagnosis | undefined;
}
