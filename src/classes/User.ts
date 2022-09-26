import Human from '@/classes/humans/Human';
import RegionUser from '@/classes/RegionUser';
import RegisterPropertyToUser from '@/classes/RegisterPropertyToUser';
import RegisterUser from '@/classes/RegisterUser';
import IHuman from '@/interfaces/IHuman';
import IRegionUser from '@/interfaces/IRegionUser';
import IRegisterProperty from '@/interfaces/IRegisterProperty';
import IRegisterPropertyToUser from '@/interfaces/IRegisterPropertyToUser';
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
  registerPropertyToUser: IRegisterPropertyToUser[] = [];

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
    if (i.registerPropertyToUser) {
      this.registerPropertyToUser = i.registerPropertyToUser.map((i: IRegisterPropertyToUser) => new RegisterPropertyToUser(i));
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

  filterActualProperties(registerProperties: IRegisterProperty[]): IRegisterProperty[] {
    const props = registerProperties.filter(
      (prop: IRegisterProperty) => !this.registerPropertyToUser.find((userProp) => userProp.registerPropertyId === prop.id)
    );
    return props;
  }
}
