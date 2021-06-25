import MkbGroup from '@/classes/mkb/MkbGroup';
import IMkbClass from '@/interfaces/mkb/IMkbClass';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IMkbGroup from '@/interfaces/mkb/IMkbGroup';
import IMkbIdSet from '@/interfaces/mkb/IMkbIdSet';
import IMkbSubGroup from '@/interfaces/mkb/IMkbSubGroup';

export default class MkbCLass implements IMkbClass {
  id?: string;
  number?: string;
  name?: string;
  rangeStart?: string;
  rangeEnd?: string;
  comment?: string;
  relevant?: boolean;
  leaf = false;
  disabled = true;
  showCheckbox = false;
  mkbGroups: IMkbGroup[] = [];
  mkbDiagnosis: IMkbDiagnosis[] = [];
  isEditMode = false;

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
    this.relevant = mkbClass.relevant;
    if (mkbClass.mkbGroups) {
      this.mkbGroups = mkbClass.mkbGroups.map((mkbGroup: IMkbGroup) => new MkbGroup(mkbGroup));
    }
    this.disabled = true;
    this.showCheckbox = false;
    this.isEditMode = mkbClass.isEditMode;
  }

  getDiagnosis(diagnosisId: string): IMkbDiagnosis | undefined {
    return this.mkbDiagnosis.find((d: IMkbDiagnosis) => d.id === diagnosisId);
  }

  getChildren(relevant: boolean): (IMkbGroup | IMkbDiagnosis)[] {
    if (relevant) return [...this.mkbGroups.filter((i) => i.relevant), ...this.mkbDiagnosis.filter((i) => i.relevant)];
    return [...this.mkbGroups, ...this.mkbDiagnosis];
  }

  getGroup(mkbGroupId: string): IMkbGroup | undefined {
    return this.mkbGroups.find((g: IMkbGroup) => g.id === mkbGroupId);
  }

  getSubGroup(mkbIdSet: IMkbIdSet): IMkbSubGroup | undefined {
    const group = this.mkbGroups.find((g: IMkbGroup) => g.id === mkbIdSet.groupId);
    return group ? group.getSubGroup(mkbIdSet.subGroupId) : undefined;
  }

  getDiagnosisFromTree(mkbIdSet: IMkbIdSet): IMkbDiagnosis | undefined {
    let diagnosis = this.getDiagnosis(mkbIdSet.diagnosisId);
    if (diagnosis) return diagnosis;

    const group = this.getGroup(mkbIdSet.groupId);
    if (!group) return undefined;
    diagnosis = group.getDiagnosis(mkbIdSet.diagnosisId);
    if (diagnosis) return diagnosis;

    const subGroup = group.getSubGroup(mkbIdSet.subGroupId);
    if (!subGroup) return undefined;
    return subGroup.getDiagnosis(mkbIdSet.diagnosisId);
  }
}
