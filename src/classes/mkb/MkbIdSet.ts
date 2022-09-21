import { MkbLevel } from '@/interfaces/mkb/MkbLevel';
import IMkbNode from '@/interfaces/mkb/mkbTree/IMkbNode';

export default class MkbIdSet {
  classId = '';
  groupId = '';
  subGroupId = '';
  subSubGroupId = '';
  diagnosisId = '';
  subDiagnosisId = '';
  concreteDiagnosisId = '';

  setIds(node: IMkbNode): void {
    if (node.level === MkbLevel.MkbGroupLevel) {
      this.classId = node.data.id;
    }

    if (node.level === MkbLevel.MkbSubGroupLevel) {
      this.classId = node.parent.data.id;
      this.groupId = node.data.id;
      this.diagnosisId = node.data.id;
    }

    if (node.level === MkbLevel.MkbSubSubGroupLevel) {
      this.classId = node.parent.parent.data.id;
      this.groupId = node.parent.data.id;
      this.subGroupId = node.data.id;
      this.diagnosisId = node.data.id;
    }

    if (node.level === MkbLevel.MkbDiagnosisLevel) {
      this.classId = node.parent.parent.parent.data.id;
      this.groupId = node.parent.parent.data.id;
      this.diagnosisId = node.parent.data.id;
      this.subDiagnosisId = node.data.id;
    }
  }
}
