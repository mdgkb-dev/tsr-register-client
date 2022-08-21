import IRegisterUser from '@/interfaces/IRegisterUser';

export default class RegisterUser implements IRegisterUser {
  id?: string;
  userId?: string;
  registerId?: string;

  constructor(i?: IRegisterUser) {
    if (!i) return;
    this.id = i.id;
    this.userId = i.userId;
    this.registerId = i.registerId;
  }
}
