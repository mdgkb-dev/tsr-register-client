import MkbDiagnosis from '@/classes/mkb/MkbDiagnosis';
import MkbSubGroup from '@/classes/mkb/MkbSubGroup';
import IMkbConcreteDiagnosis from '@/interfaces/mkb/IMkbConcreteDiagnosis';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IMkbGroup from '@/interfaces/mkb/IMkbGroup';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';
import IMkbSubGroup from '@/interfaces/mkb/IMkbSubGroup';
import IMkbSubSubGroup from '@/interfaces/mkb/IMkbSubSubGroup';

export default class MkbGroup implements IMkbGroup {
  id = '';
  name = '';
  fullName = '';
  rangeStart?: string;
  rangeEnd?: string;
  comment?: string;
  mkbClassId?: string;
  disabled = true;
  mkbSubGroups: IMkbSubGroup[] = [];
  mkbDiagnosis: IMkbDiagnosis[] = [];
  relevant?: boolean;
  isEditMode = false;

  constructor(mkbGroup?: IMkbGroup) {
    if (!mkbGroup) {
      return;
    }
    this.id = mkbGroup.id;
    this.name = mkbGroup.name;
    this.fullName = mkbGroup.fullName;
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
    this.isEditMode = mkbGroup.isEditMode;
  }

  getDiagnosis(diagnosisId: string): IMkbDiagnosis | undefined {
    return this.mkbDiagnosis.find((d: IMkbDiagnosis) => d.id === diagnosisId);
  }

  getConcreteDiagnosis(id: string): IMkbConcreteDiagnosis | undefined {
    let concreteDiagnosis: IMkbConcreteDiagnosis | undefined;
    this.mkbDiagnosis.forEach((d: IMkbDiagnosis) => {
      const item = d.getConcreteDiagnosis(id);
      if (item) {
        concreteDiagnosis = item;
      }
    });
    return concreteDiagnosis;
  }

  getFullName(): string {
    return `${this.rangeStart}-${this.rangeEnd} ${this.name}`;
  }

  getChildren(relevant: boolean): (IMkbSubGroup | IMkbDiagnosis)[] {
    if (relevant) return [...this.mkbSubGroups.filter((i) => i.relevant), ...this.mkbDiagnosis.filter((i) => i.relevant)];
    return [...this.mkbSubGroups, ...this.mkbDiagnosis];
  }

  getSubGroup(mkbSubGroupId: string): IMkbSubGroup | undefined {
    return this.mkbSubGroups.find((g: IMkbSubGroup) => g.id === mkbSubGroupId);
  }

  getAllDiagnosis(): IMkbDiagnosis[] {
    const diagnosis: IMkbDiagnosis[] = [];
    diagnosis.push(...this.mkbDiagnosis);
    this.mkbSubGroups.forEach((msg: IMkbSubGroup) => diagnosis.push(...msg.getAllDiagnosis()));
    return diagnosis;
  }

  getAllSubSubGroups(): IMkbSubSubGroup[] {
    const items: IMkbSubSubGroup[] = [];
    this.mkbSubGroups.forEach((msg: IMkbSubGroup) => items.push(...msg.mkbSubSubGroups));
    return items;
  }

  getSubDiagnosis(subDiagnosisId: string): IMkbSubDiagnosis | undefined {
    let subDiagnosis: IMkbSubDiagnosis | undefined;
    this.mkbDiagnosis.forEach((d: IMkbDiagnosis) => {
      const item = d.mkbSubDiagnosis.find((msd: IMkbSubDiagnosis) => msd.id === subDiagnosisId);
      if (item) {
        subDiagnosis = item;
      }
    });
    return subDiagnosis;
  }
}
