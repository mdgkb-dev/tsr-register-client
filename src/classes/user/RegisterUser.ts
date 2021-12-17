import Human from '@/classes/humans/Human';
import IHuman from '@/interfaces/humans/IHuman';
import IUser from '@/interfaces/users/IUser';
import IRegisterUser from '@/interfaces/users/IRegisterUser';

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
