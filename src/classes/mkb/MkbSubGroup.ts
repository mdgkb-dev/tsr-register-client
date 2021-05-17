import IMkbSubGroup from '@/interfaces/mkb/IMkbSubGroup';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IMkbSubSubGroup from '@/interfaces/mkb/IMkbSubSubGroup';

export default class MkbSubGroup implements IMkbSubGroup {
  id?: string;
  name?: string;
  rangeStart?: string;
  rangeEnd?: string;
  comment?: string;
  mkbGroupId?: string;

  mkbDiagnosis: IMkbDiagnosis[] = [];
  mkbSubSubGroups: IMkbSubSubGroup[] = [];

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
  }

  getDiagnosis(diagnosisId: string): IMkbDiagnosis | undefined {
    return this.mkbDiagnosis.find((d: IMkbDiagnosis) => d.id === diagnosisId);
  }
}
