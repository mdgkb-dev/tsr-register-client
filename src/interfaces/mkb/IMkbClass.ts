import IMkbGroup from '@/interfaces/mkb/IMkbGroup';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IMkbIdSet from '@/interfaces/mkb/IMkbIdSet';
import IMkbSubGroup from '@/interfaces/mkb/IMkbSubGroup';

export default interface IMkbClass {
  id?: string;
  number?: string;
  name?: string;
  rangeStart?: string;
  rangeEnd?: string;
  comment?: string;
  relevant?: boolean;
  leaf: boolean;
  disabled: boolean;
  isEditMode: boolean;

  mkbGroups: IMkbGroup[];
  mkbDiagnosis: IMkbDiagnosis[];

  getDiagnosis: (diagnosisId: string) => IMkbDiagnosis | undefined;
  getChildren: (relevant: boolean) => (IMkbGroup | IMkbDiagnosis)[];
  getSubGroup: (mkbIdSet: IMkbIdSet) => IMkbSubGroup | undefined;
  getGroup: (mkbGroupId: string) => IMkbGroup | undefined;
  getDiagnosisFromTree: (mkbIdSet: IMkbIdSet) => IMkbDiagnosis | undefined;
}
