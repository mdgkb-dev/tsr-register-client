import IMkbConcreteDiagnosis from '@/interfaces/mkb/IMkbConcreteDiagnosis';
import IMkbGroup from '@/interfaces/mkb/IMkbGroup';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';

export default interface IMkbDiagnosis {
  id: string;
  code: string;

  name: string;
  fullName: string;
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
  queryStringDiagnosis: string;
  queryStringGroup: string;

  mkbSubDiagnosis: IMkbSubDiagnosis[];
  mkbGroup?: IMkbGroup;

  getAllConcreteDiagnosis: () => IMkbConcreteDiagnosis[];
  getConcreteDiagnosis: (id: string) => IMkbConcreteDiagnosis | undefined;
  getFullName: () => string;
  setQueryStrings: () => void;
}
