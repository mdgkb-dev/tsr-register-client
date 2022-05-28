import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IMkbSubGroup from '@/interfaces/mkb/IMkbSubGroup';

export default interface IMkbGroup {
  id: string;
  name: string;
  rangeStart?: string;
  rangeEnd?: string;
  comment?: string;
  mkbClassId?: string;
  relevant?: boolean;
  mkbSubGroups: IMkbSubGroup[];
  mkbDiagnosis: IMkbDiagnosis[];
  disabled: boolean;
  isEditMode: boolean;

  getDiagnosis: (diagnosisId: string) => IMkbDiagnosis | undefined;
  getFullName: () => string;
  getChildren: (relevant: boolean) => (IMkbSubGroup | IMkbDiagnosis)[];
  getSubGroup: (subGroupId: string) => IMkbSubGroup | undefined;
}
