import IMkbConcreteDiagnosis from '@/interfaces/mkb/IMkbConcreteDiagnosis';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IMkbElement from '@/interfaces/mkb/IMkbElement';
import IMkbGroup from '@/interfaces/mkb/IMkbGroup';
import IMkbIdSet from '@/interfaces/mkb/IMkbIdSet';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';
import IMkbSubGroup from '@/interfaces/mkb/IMkbSubGroup';
import IMkbSubSubGroup from '@/interfaces/mkb/IMkbSubSubGroup';

export default interface IMkbClass {
  id: string;
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
  getAllSubGroups: () => IMkbSubGroup[];
  getAllSubSubGroups: () => IMkbSubSubGroup[];
  getAllDiagnosis: () => IMkbDiagnosis[];
  getAllSubDiagnosis: () => IMkbSubDiagnosis[];
  getAllConcreteDiagnosis: () => IMkbConcreteDiagnosis[];
  // SelectedElements
  selectedGroup?: IMkbGroup;
  selectedGroupId?: string;
  selectedSubGroup?: IMkbSubGroup;
  selectedSubGroupId?: string;
  selectedSubSubGroup?: IMkbSubSubGroup;
  selectedSubSubGroupId?: string;
  selectedDiagnosis?: IMkbDiagnosis;
  selectedDiagnosisId?: string;
  selectedSubDiagnosis?: IMkbSubDiagnosis;
  selectedSubDiagnosisId?: string;
  selectedConcreteDiagnosis?: IMkbConcreteDiagnosis;
  selectedConcreteDiagnosisId?: string;

  selectByElement: (mkbElement: IMkbElement) => void;
}
