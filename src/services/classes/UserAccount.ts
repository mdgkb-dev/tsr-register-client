import ClassHelper from '@/services/ClassHelper';

export default class UserAccount {
  login = '';
  email = '';

  constructor(i?: UserAccount) {
    ClassHelper.BuildClass(this, i);
  }
}
