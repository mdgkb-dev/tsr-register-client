import MkbDiagnosis from '@/classes/mkb/MkbDiagnosis';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IMkbSubSubGroup from '@/interfaces/mkb/IMkbSubSubGroup';

export default class MkbSubSubGroup implements IMkbSubSubGroup {
  id?: string;
  name?: string;
  rangeStart?: string;
  rangeEnd?: string;
  comment?: string;
  mkbSubGroupId?: string;
  relevant?: boolean;
  disabled = true;
  isEditMode = false;

  mkbDiagnosis: IMkbDiagnosis[] = [];

  constructor(mkbSubSubGroup?: IMkbSubSubGroup) {
    if (!mkbSubSubGroup) {
      return;
    }
    this.id = mkbSubSubGroup.id;
    this.name = mkbSubSubGroup.name;
    this.rangeStart = mkbSubSubGroup.rangeStart;
    this.rangeEnd = mkbSubSubGroup.rangeEnd;
    this.comment = mkbSubSubGroup.comment;
    this.mkbSubGroupId = mkbSubSubGroup.mkbSubGroupId;
    this.relevant = mkbSubSubGroup.relevant;
    this.isEditMode = mkbSubSubGroup.isEditMode;

    if (mkbSubSubGroup.mkbDiagnosis) {
      this.mkbDiagnosis = mkbSubSubGroup.mkbDiagnosis.map((d: IMkbDiagnosis) => new MkbDiagnosis(d));
    }
    this.disabled = true;
  }

  getDiagnosis(diagnosisId: string): IMkbDiagnosis | undefined {
    return this.mkbDiagnosis.find((d: IMkbDiagnosis) => d.id === diagnosisId);
  }
}
