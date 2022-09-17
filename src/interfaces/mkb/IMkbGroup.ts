import IMkbConcreteDiagnosis from '@/interfaces/mkb/IMkbConcreteDiagnosis';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';
import IMkbSubGroup from '@/interfaces/mkb/IMkbSubGroup';
import IMkbSubSubGroup from '@/interfaces/mkb/IMkbSubSubGroup';

export default interface IMkbGroup {
  id: string;
  name: string;
  fullName: string;
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
  getSubDiagnosis: (subDiagnosisId: string) => IMkbSubDiagnosis | undefined;
  getConcreteDiagnosis: (concreteDiagnosis: string) => IMkbConcreteDiagnosis | undefined;
  getFullName: () => string;
  getChildren: (relevant: boolean) => (IMkbSubGroup | IMkbDiagnosis)[];
  getSubGroup: (subGroupId: string) => IMkbSubGroup | undefined;
  getAllDiagnosis: () => IMkbDiagnosis[];
  getAllSubSubGroups: () => IMkbSubSubGroup[];
}
