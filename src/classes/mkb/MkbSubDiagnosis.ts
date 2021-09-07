import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';

export default class MkbSubDiagnosis implements IMkbSubDiagnosis {
  id = '';
  name?: string;
  subCode?: number;
  comment?: string;
  mkbDiagnosisId?: string;
  relevant?: boolean;
  leaf = true;
  disabled = false;
  isEditMode = false;

  constructor(mkbSubDiagnosis?: IMkbSubDiagnosis) {
    if (!mkbSubDiagnosis) {
      return;
    }
    this.id = mkbSubDiagnosis.id;
    this.name = mkbSubDiagnosis.name;
    this.subCode = mkbSubDiagnosis.subCode;
    this.leaf = mkbSubDiagnosis.leaf;
    this.comment = mkbSubDiagnosis.comment;
    this.mkbDiagnosisId = mkbSubDiagnosis.mkbDiagnosisId;
    this.disabled = false;
    this.relevant = mkbSubDiagnosis.relevant;
    this.isEditMode = mkbSubDiagnosis.isEditMode;
  }

  getFullName = (): string => `${this.subCode} ${this.name}`;
}
