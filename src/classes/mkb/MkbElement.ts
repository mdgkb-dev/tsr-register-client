import IMkbElement from '@/interfaces/mkb/IMkbElement';
import { MkbLevel } from '@/interfaces/mkb/MkbLevel';

export default class MkbElement implements IMkbElement {
  id?: string;
  classId = '';
  fullName = '';
  level: MkbLevel = MkbLevel.MkbClassLevel;

  constructor(item?: IMkbElement) {
    if (!item) {
      return;
    }
    this.id = item.id;
    this.classId = item.classId;
    this.fullName = item.fullName;
    this.level = item.level;
  }
}
