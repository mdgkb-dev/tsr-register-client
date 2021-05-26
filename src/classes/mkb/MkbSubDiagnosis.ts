import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';

export default class MkbSubDiagnosis implements IMkbSubDiagnosis {
  id?: string;
  name?: string;
  subCode?: number;
  comment?: string;
  mkbDiagnosisId?: string;
  leaf = true;
  disabled = false;

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
  }

  getFullName = () => `${this.subCode} ${this.name}`;
}
