import IUser from '@/interfaces/users/IUser';
import IHuman from '@/interfaces/humans/IHuman';
import Human from '@/classes/humans/Human';

export default class User implements IUser {
  id = '';
  human: IHuman = new Human();
  login = '';
  email = '';

  constructor(user?: IUser) {
    if (!user) return;
    this.id = user.id;
    this.human = new Human(user.human);
    this.login = user.login;
    this.email = user.email;
  }
}