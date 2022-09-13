import MkbGroup from '@/classes/mkb/MkbGroup';
import IMkbClass from '@/interfaces/mkb/IMkbClass';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IMkbElement from '@/interfaces/mkb/IMkbElement';
import IMkbGroup from '@/interfaces/mkb/IMkbGroup';
import IMkbIdSet from '@/interfaces/mkb/IMkbIdSet';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';
import IMkbSubGroup from '@/interfaces/mkb/IMkbSubGroup';
import IMkbSubSubGroup from '@/interfaces/mkb/IMkbSubSubGroup';
import { MkbLevel } from '@/interfaces/mkb/MkbLevel';

export default class MkbClass implements IMkbClass {
  id = '';
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
  selectedGroup?: IMkbGroup;
  selectedGroupId?: string;
  selectedSubGroup?: IMkbSubGroup;
  selectedSubGroupId?: string;
  selectedSubSubGroup?: IMkbSubSubGroup;
  selectedSubSubGroupId?: string;
  selectedDiagnosis?: IMkbDiagnosis;
  selectedDiagnosisId?: string;
  selectedSubDiagnosis?: IMkbSubDiagnosis;
  selectedSubDiagnosisId?: string;

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

  getAllSubGroups(): IMkbSubGroup[] {
    const items: IMkbSubGroup[] = [];
    this.mkbGroups.forEach((mg: IMkbGroup) =>
      items.push(
        ...mg.mkbSubGroups.filter((msg: IMkbSubGroup) => {
          return this.selectedGroupId ? msg.mkbGroupId === this.selectedGroupId : true;
        })
      )
    );
    return items;
  }

  getAllSubSubGroups(): IMkbSubSubGroup[] {
    const items: IMkbSubSubGroup[] = [];
    this.mkbGroups.forEach((mg: IMkbGroup) => items.push(...mg.getAllSubSubGroups()));
    return items;
  }

  getAllDiagnosis(): IMkbDiagnosis[] {
    let diagnosis: IMkbDiagnosis[] = [];
    this.mkbGroups.forEach((mg: IMkbGroup) => diagnosis.push(...mg.getAllDiagnosis()));
    diagnosis.push(...this.mkbDiagnosis);
    diagnosis = diagnosis.filter((d: IMkbDiagnosis) => (this.selectedGroupId ? d.mkbGroupId === this.selectedGroupId : true));
    diagnosis = diagnosis.filter((d: IMkbDiagnosis) => (this.selectedSubGroupId ? d.mkbSubGroupId === this.selectedSubGroupId : true));
    return diagnosis;
  }

  getAllSubDiagnosis(): IMkbSubDiagnosis[] {
    let items: IMkbSubDiagnosis[] = [];
    this.getAllDiagnosis().forEach((d: IMkbDiagnosis) => items.push(...d.mkbSubDiagnosis));
    items = items.filter((msd: IMkbSubDiagnosis) => (this.selectedDiagnosisId ? msd.mkbDiagnosisId === this.selectedDiagnosisId : true));
    return items;
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

  selectSubGroup(id: string): void {
    this.selectedSubGroupId = id;
    let subGroup: IMkbSubGroup;
    this.mkbGroups.forEach((m: IMkbGroup) => {
      const sg = m.getSubGroup(id);
      if (!sg) {
        return;
      } else {
        subGroup = sg;
        this.selectedGroupId = sg.mkbGroupId;
      }
    });
  }

  selectDiagnosis(id: string): void {
    this.selectedDiagnosisId = id;
    this.mkbGroups.forEach((m: IMkbGroup) => {
      const d = m.getDiagnosis(id);
      if (!d) {
        return;
      } else {
        this.selectedGroupId = d.mkbGroupId;
        this.selectedSubGroupId = d.mkbSubGroupId;
      }
    });
  }

  selectSubDiagnosis(id: string): void {
    this.selectedSubDiagnosisId = id;
    this.mkbGroups.forEach((m: IMkbGroup) => {
      const sd = m.getSubDiagnosis(id);
      if (!sd || !sd.mkbDiagnosisId) {
        return sd;
      }
      const d = m.getDiagnosis(sd.mkbDiagnosisId);
      if (!d) {
        return;
      } else {
        this.selectedSubGroupId = d.mkbSubGroupId;
        this.selectedGroupId = d.mkbGroupId;
        this.selectedSubSubGroupId = d.mkbSubSubGroupId;
        this.selectedSubGroupId = d.mkbSubGroupId;
        this.selectedDiagnosisId = d.id;
      }
    });
  }

  resetSelected(): void {
    this.selectedSubGroupId = undefined;
    this.selectedGroupId = undefined;
    this.selectedSubSubGroupId = undefined;
    this.selectedSubGroupId = undefined;
    this.selectedDiagnosisId = undefined;
  }

  selectByElement(mkbElement: IMkbElement): void {
    if (!mkbElement.id) {
      return;
    }
    if (mkbElement.level === MkbLevel.MkbGroupLevel) {
      this.selectedGroupId = mkbElement.id;
    }
    if (mkbElement.level === MkbLevel.MkbSubGroupLevel) {
      this.selectSubGroup(mkbElement.id);
    }
    // if (mkbElement.level === MkbLevel.MkbSubSubGroupLevel) {
    //   this.selectSubSubGroup(mkbElement.id);
    // }
    if (mkbElement.level === MkbLevel.MkbDiagnosisLevel) {
      this.selectDiagnosis(mkbElement.id);
    }
    if (mkbElement.level === MkbLevel.MkbSubDiagnosisLevel) {
      this.selectSubDiagnosis(mkbElement.id);
    }
  }
}
