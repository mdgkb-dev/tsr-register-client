import IMkbConcreteDiagnosis from '@/interfaces/mkb/IMkbConcreteDiagnosis';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';

export default interface IMkbSubDiagnosis {
  id?: string;
  name: string;
  fullName: string;
  subCode?: number;
  comment?: string;
  mkbDiagnosisId?: string;
  mkbDiagnosis?: IMkbDiagnosis;
  relevant?: boolean;
  leaf: boolean;
  disabled: boolean;
  isEditMode: boolean;
  mkbConcreteDiagnosis: IMkbConcreteDiagnosis[];
  getConcreteDiagnosis: (concreteDiagnosisId: string) => IMkbConcreteDiagnosis | undefined;
  queryString: string;
  getFullName: () => string;
}
