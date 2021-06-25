import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IMkbSubGroup from '@/interfaces/mkb/IMkbSubGroup';
import IMkbSubSubGroup from '@/interfaces/mkb/IMkbSubSubGroup';

export default class MkbSubGroup implements IMkbSubGroup {
  id?: string;
  name?: string;
  rangeStart?: string;
  rangeEnd?: string;
  comment?: string;
  mkbGroupId?: string;
  relevant?: boolean;
  disabled = true;
  mkbDiagnosis: IMkbDiagnosis[] = [];
  mkbSubSubGroups: IMkbSubSubGroup[] = [];
  isEditMode = false;

  constructor(mkbSubGroup?: IMkbSubGroup) {
    if (!mkbSubGroup) {
      return;
    }
    this.id = mkbSubGroup.id;
    this.name = mkbSubGroup.name;
    this.rangeStart = mkbSubGroup.rangeStart;
    this.rangeEnd = mkbSubGroup.rangeEnd;
    this.comment = mkbSubGroup.comment;
    this.mkbGroupId = mkbSubGroup.mkbGroupId;
    this.disabled = true;
    this.relevant = mkbSubGroup.relevant;
    this.isEditMode = mkbSubGroup.isEditMode;
  }

  getDiagnosis(diagnosisId: string): IMkbDiagnosis | undefined {
    return this.mkbDiagnosis.find((d: IMkbDiagnosis) => d.id === diagnosisId);
  }

  getChildren(relevant: boolean): (IMkbSubSubGroup | IMkbDiagnosis)[] {
    if (relevant) return [...this.mkbSubSubGroups.filter((i) => i.relevant), ...this.mkbDiagnosis.filter((i) => i.relevant)];
    return [...this.mkbSubSubGroups, ...this.mkbDiagnosis];
  }
}
