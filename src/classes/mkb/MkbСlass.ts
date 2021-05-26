import IMkbClass from '@/interfaces/mkb/IMkbClass';
import IMkbGroup from '@/interfaces/mkb/IMkbGroup';
import MkbGroup from '@/classes/mkb/MkbGroup';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';

export default class MkbCLass implements IMkbClass {
  id?: string;
  number?: string;
  name?: string;
  rangeStart?: string;
  rangeEnd?: string;
  comment?: string;
  leaf = false;
  disabled = true;
  showCheckbox = false;
  mkbGroups: IMkbGroup[] = [];
  mkbDiagnosis: IMkbDiagnosis[] = [];

  constructor(mkbClass?: IMkbClass) {
    if (!mkbClass) {
      return;
    }
    this.id = mkbClass.id;
    this.number = mkbClass.number;
    this.name = mkbClass.name;
    this.rangeStart = mkbClass.rangeStart;
    this.rangeEnd = mkbClass.rangeEnd;
    this.comment = mkbClass.comment;
    this.leaf = mkbClass.leaf;
    if (mkbClass.mkbGroups) {
      this.mkbGroups = mkbClass.mkbGroups.map((mkbGroup: IMkbGroup) => new MkbGroup(mkbGroup));
    }
    this.disabled = true;
    this.showCheckbox = false;
  }

  getDiagnosis(diagnosisId: string): IMkbDiagnosis | undefined {
    return this.mkbDiagnosis.find((d: IMkbDiagnosis) => d.id === diagnosisId);
  }
}
