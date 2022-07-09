import MkbConcreteDiagnosis from '@/classes/mkb/MkbConcreteDiagnosis';
import MkbDiagnosis from '@/classes/mkb/MkbDiagnosis';
import IMkbConcreteDiagnosis from '@/interfaces/mkb/IMkbConcreteDiagnosis';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';

export default class MkbSubDiagnosis implements IMkbSubDiagnosis {
  id?: string;
  name = '';
  subCode?: number;
  fullName = '';
  comment?: string;
  mkbDiagnosisId?: string;
  mkbDiagnosis?: IMkbDiagnosis;
  relevant?: boolean;
  leaf = true;
  disabled = false;
  isEditMode = false;
  mkbConcreteDiagnosis: IMkbConcreteDiagnosis[] = [];
  queryString = '';

  constructor(i?: IMkbSubDiagnosis) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.subCode = i.subCode;
    this.fullName = i.fullName;
    this.leaf = i.leaf;
    this.comment = i.comment;
    this.mkbDiagnosisId = i.mkbDiagnosisId;
    if (i.mkbDiagnosis) {
      this.mkbDiagnosis = new MkbDiagnosis(i.mkbDiagnosis);
    }
    this.disabled = false;
    this.relevant = i.relevant;
    this.isEditMode = i.isEditMode;
    if (i.mkbConcreteDiagnosis) {
      this.mkbConcreteDiagnosis = i.mkbConcreteDiagnosis.map((d: IMkbConcreteDiagnosis) => new MkbConcreteDiagnosis(d));
    }
    this.setQueryStrings();
  }

  setQueryStrings(): void {
    this.queryString = this.fullName;
  }

  getFullName = (): string => `${this.subCode} ${this.name}`;
}
