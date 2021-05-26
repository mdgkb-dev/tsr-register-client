export default interface IMkbSubDiagnosis {
  id?: string;
  name?: string;
  subCode?: number;
  comment?: string;
  mkbDiagnosisId?: string;
  leaf: boolean;
  disabled: boolean;

  getFullName: () => string;
}
