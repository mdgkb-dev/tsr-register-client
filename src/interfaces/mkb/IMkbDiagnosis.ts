import IMkbGroup from '@/interfaces/mkb/IMkbGroup';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';

export default interface IMkbDiagnosis {
  id?: string;
  code: string;
  name: string;
  comment?: string;
  mkbClassId?: string;
  mkbGroupId?: string;
  mkbSubGroupId?: string;
  mkbSubSubGroupId?: string;
  relevant?: boolean;
  leaf: boolean;
  disabled: boolean;
  checked: boolean;
  isEditMode: boolean;

  mkbSubDiagnosis: IMkbSubDiagnosis[];
  mkbGroup?: IMkbGroup;

  getFullName: () => string;
}
