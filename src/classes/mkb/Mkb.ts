import IMkb from '@/interfaces/mkb/IMkb';

export default class Mkb implements IMkb {
  id = '';
  class = '';
  className = '';
  classRange = '';
  classComment = '';

  groupName = '';
  groupRange = '';
  groupComment = '';

  subGroupName = '';
  subGroupRange = '';
  subGroupComment = '';

  subSubGroupName = '';
  subSubGroupRange = '';
  subSubGroupComment = '';

  diagnosisName = '';
  diagnosisComment = '';

  subDiagnosisName = '';
  subDiagnosisComment = '';

  constructor(mkb?: IMkb) {
    if (!mkb) {
      return;
    }
    this.id = mkb.id;
    this.class = mkb.class;
    this.className = mkb.className;
    this.classRange = mkb.classRange;
    this.classComment = mkb.classComment;

    this.groupName = mkb.groupName;
    this.groupRange = mkb.groupRange;
    this.groupComment = mkb.groupComment;

    this.subGroupName = mkb.subGroupName;
    this.subGroupRange = mkb.subGroupRange;
    this.subGroupComment = mkb.subGroupComment;

    this.subSubGroupName = mkb.subSubGroupName;
    this.subSubGroupRange = mkb.subSubGroupRange;
    this.subSubGroupComment = mkb.subSubGroupComment;

    this.diagnosisName = mkb.diagnosisName;
    this.diagnosisComment = mkb.diagnosisComment;

    this.subDiagnosisName = mkb.subDiagnosisName;
    this.subDiagnosisComment = mkb.subDiagnosisComment;
  }
}
