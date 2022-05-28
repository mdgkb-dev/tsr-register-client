import MkbSubDiagnosis from '@/classes/mkb/MkbSubDiagnosis';
import IMkbConcreteDiagnosis from '@/interfaces/mkb/IMkbConcreteDiagnosis';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';

export default class MkbConcreteDiagnosis implements IMkbConcreteDiagnosis {
  id = '';
  name = '';
  subCode?: number;
  comment?: string;
  mkbSubDiagnosisId?: string;
  mkbSubDiagnosis: IMkbSubDiagnosis = new MkbSubDiagnosis();
  relevant?: boolean;
  leaf = true;
  disabled = false;
  isEditMode = false;
  queryString = '';
  constructor(i?: IMkbConcreteDiagnosis) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.leaf = i.leaf;
    this.comment = i.comment;
    this.mkbSubDiagnosisId = i.mkbSubDiagnosisId;

    if (i.mkbSubDiagnosis) {
      this.mkbSubDiagnosis = new MkbSubDiagnosis(i.mkbSubDiagnosis);
    }
    this.disabled = false;
    this.relevant = i.relevant;
    this.isEditMode = i.isEditMode;
    this.setQueryStrings();
  }

  setQueryStrings(): void {
    this.queryString = this.getFullName();
  }

  getFullName = (): string => `${this.name}`;
}
