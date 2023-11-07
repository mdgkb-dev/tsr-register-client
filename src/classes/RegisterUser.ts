import ClassHelper from '@/services/ClassHelper';

export default class RegisterUser {
  id?: string;
  userId?: string;
  registerId?: string;

  constructor(i?: RegisterUser) {
    ClassHelper.BuildClass(this, i);
  }
}
