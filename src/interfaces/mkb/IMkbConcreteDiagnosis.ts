import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';

export default interface IMkbConcreteDiagnosis {
  id?: string;
  name: string;
  comment?: string;
  mkbSubDiagnosisId?: string;
  mkbSubDiagnosis: IMkbSubDiagnosis;
  relevant?: boolean;
  leaf: boolean;
  disabled: boolean;
  isEditMode: boolean;
  queryString: string;
}
