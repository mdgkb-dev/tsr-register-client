import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';
import MkbSubDiagnosis from '@/classes/mkb/MkbSubDiagnosis';
import IMkbGroup from '@/interfaces/mkb/IMkbGroup';
import MkbGroup from '@/classes/mkb/MkbGroup';

export default class MkbDiagnosis implements IMkbDiagnosis {
  id?: string;
  name = '';
  code = '';
  comment?: string;
  mkbClassId?: string;
  mkbGroupId?: string;
  mkbSubGroupId?: string;
  mkbSubSubGroupId?: string;
  checked = false;
  relevant?: boolean;
  leaf = false;
  disabled = false;

  mkbSubDiagnosis: IMkbSubDiagnosis[] = [];
  mkbGroup?: IMkbGroup;

  constructor(mkbDiagnosis?: IMkbDiagnosis) {
    if (!mkbDiagnosis) {
      return;
    }
    this.id = mkbDiagnosis.id;
    this.name = mkbDiagnosis.name;
    this.code = mkbDiagnosis.code;
    this.comment = mkbDiagnosis.comment;
    this.mkbClassId = mkbDiagnosis.mkbClassId;
    this.mkbGroupId = mkbDiagnosis.mkbGroupId;
    this.mkbSubGroupId = mkbDiagnosis.mkbSubGroupId;
    this.mkbSubSubGroupId = mkbDiagnosis.mkbSubSubGroupId;
    this.leaf = mkbDiagnosis.leaf;
    this.relevant = mkbDiagnosis.relevant;
    if (mkbDiagnosis.mkbSubDiagnosis) {
      this.mkbSubDiagnosis = mkbDiagnosis.mkbSubDiagnosis.map((d: IMkbSubDiagnosis) => new MkbSubDiagnosis(d));
    }
    this.disabled = false;
    this.mkbGroup = new MkbGroup(mkbDiagnosis.mkbGroup);
  }

  getFullName = () => `${this.code} ${this.name}`;
}
