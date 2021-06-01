import IMkbGroup from '@/interfaces/mkb/IMkbGroup';
import IMkbSubGroup from '@/interfaces/mkb/IMkbSubGroup';
import MkbSubGroup from '@/classes/mkb/MkbSubGroup';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import MkbDiagnosis from '@/classes/mkb/MkbDiagnosis';

export default class MkbGroup implements IMkbGroup {
  id?: string;
  name?: string;
  rangeStart?: string;
  rangeEnd?: string;
  comment?: string;
  mkbClassId?: string;
  disabled = true;
  mkbSubGroups: IMkbSubGroup[] = [];
  mkbDiagnosis: IMkbDiagnosis[] = [];
  relevant?: boolean;

  constructor(mkbGroup?: IMkbGroup) {
    if (!mkbGroup) {
      return;
    }
    this.id = mkbGroup.id;
    this.name = mkbGroup.name;
    this.rangeStart = mkbGroup.rangeStart;
    this.rangeEnd = mkbGroup.rangeEnd;
    this.comment = mkbGroup.comment;
    this.mkbClassId = mkbGroup.mkbClassId;

    if (mkbGroup.mkbSubGroups) {
      this.mkbSubGroups = mkbGroup.mkbSubGroups.map((mkbSubGroup: IMkbSubGroup) => new MkbSubGroup(mkbSubGroup));
    }

    if (mkbGroup.mkbDiagnosis) {
      this.mkbDiagnosis = mkbGroup.mkbDiagnosis.map((d: IMkbDiagnosis) => new MkbDiagnosis(d));
    }
    this.disabled = true;
    this.relevant = mkbGroup.relevant;
  }

  getDiagnosis(diagnosisId: string): IMkbDiagnosis | undefined {
    return this.mkbDiagnosis.find((d: IMkbDiagnosis) => d.id === diagnosisId);
  }
}
