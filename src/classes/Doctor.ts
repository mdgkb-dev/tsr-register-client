import Human from '@/services/classes/Human';
import ClassHelper from '@/services/ClassHelper';

export default class Doctor {
  id?: string;
  human = new Human();
  humanId?: string;
  position = '';
  name = '';

  constructor(i?: Doctor) {
    ClassHelper.BuildClass(this, i);
  }

  getNameWithPosition(): string {
    const position = this.position !== '' ? ` (${this.position})` : '';
    return this.name + position;
  }
}
