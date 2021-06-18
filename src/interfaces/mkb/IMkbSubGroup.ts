import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IMkbSubSubGroup from '@/interfaces/mkb/IMkbSubSubGroup';

export default interface IMkbSubGroup {
  id?: string;
  name?: string;
  rangeStart?: string;
  rangeEnd?: string;
  comment?: string;
  mkbGroupId?: string;
  relevant?: boolean;
  disabled: boolean;

  mkbSubSubGroups: IMkbSubSubGroup[];
  mkbDiagnosis: IMkbDiagnosis[];

  getDiagnosis: (diagnosisId: string) => IMkbDiagnosis | undefined;
  getChildren: (relevant: boolean) => (IMkbSubSubGroup | IMkbDiagnosis)[];
}
