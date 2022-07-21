import Human from '@/classes/humans/Human';
import RegionUser from '@/classes/RegionUser';
import RegisterUser from '@/classes/RegisterUser';
import IHuman from '@/interfaces/IHuman';
import IRegionUser from '@/interfaces/IRegionUser';
import IRegisterUser from '@/interfaces/IRegisterUser';
import IUser from '@/interfaces/IUser';

export default class User implements IUser {
  id?: string;
  human: IHuman = new Human();
  login = '';
  email = '';
  registersUsers: IRegisterUser[] = [];
  registersUsersForDelete: string[] = [];
  regionsUsers: IRegionUser[] = [];
  regionsUsersForDelete: string[] = [];

  constructor(i?: IUser) {
    if (!i) return;
    this.id = i.id;
    this.human = new Human(i.human);
    this.login = i.login;
    this.email = i.email;
    if (i.registersUsers) {
      this.registersUsers = i.registersUsers.map((r: IRegisterUser) => new RegisterUser(r));
    }
    if (i.regionsUsers) {
      this.regionsUsers = i.regionsUsers.map((r: IRegionUser) => new RegionUser(r));
    }
  }

  addRegister(isAdd: boolean, registerId: string): void {
    if (isAdd) {
      const registerUser = new RegisterUser();
      registerUser.registerId = registerId;
      registerUser.userId = this.id;
      this.registersUsers.push(registerUser);
      return;
    }
    const index = this.registersUsers?.findIndex((i: IRegisterUser) => i.registerId === registerId);

    if (index <= -1) {
      return;
    }
    const idForDelete = this.registersUsers[index].id;
    if (idForDelete) {
      this.registersUsersForDelete.push(idForDelete);
    }
    this.registersUsers.splice(index, 1);
  }
}
