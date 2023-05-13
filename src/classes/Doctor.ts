import Human from '@/services/classes/Human';
import ClassHelper from '@/services/ClassHelper';

export default class Doctor {
  id?: string;
  human = new Human();
  humanId?: string;
  position = '';

  constructor(i?: Doctor) {
    ClassHelper.BuildClass(this, i);
  }
}
