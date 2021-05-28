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
  leaf: boolean;
  disabled: boolean;
  checked: boolean;

  mkbSubDiagnosis: IMkbSubDiagnosis[];

  getFullName: () => string;
}
