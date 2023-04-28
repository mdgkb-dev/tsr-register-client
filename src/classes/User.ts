import Human from '@/classes/Human';
import RegionUser from '@/classes/RegionUser';
import RegisterUser from '@/classes/RegisterUser';
import ClassHelper from '@/services/ClassHelper';

export default class User {
  id?: string;
  human: Human = new Human();
  login = '';
  password = '';
  email = '';
  @ClassHelper.GetClassConstructor(RegisterUser)
  registersUsers: RegisterUser[] = [];
  registersUsersForDelete: string[] = [];
  @ClassHelper.GetClassConstructor(RegionUser)
  regionsUsers: RegionUser[] = [];
  regionsUsersForDelete: string[] = [];
  // registerPropertyToUser: RegisterPropertyToUser[] = [];

  constructor(i?: User) {
    ClassHelper.BuildClass(this, i);
  }

  addRegister(isAdd: boolean, registerId: string): void {
    if (isAdd) {
      const registerUser = new RegisterUser();
      registerUser.registerId = registerId;
      registerUser.userId = this.id;
      this.registersUsers.push(registerUser);
      return;
    }
    const index = this.registersUsers?.findIndex((i: RegisterUser) => i.registerId === registerId);

    if (index <= -1) {
      return;
    }
    const idForDelete = this.registersUsers[index].id;
    if (idForDelete) {
      this.registersUsersForDelete.push(idForDelete);
    }
    this.registersUsers.splice(index, 1);
  }

  // filterActualProperties(registerProperties: IRegisterProperty[]): IRegisterProperty[] {
  //   const props = registerProperties.filter(
  //     (prop: IRegisterProperty) => !this.registerPropertyToUser.find((userProp) => userProp.registerPropertyId === prop.id)
  //   );
  //   return props;
  // }
}
