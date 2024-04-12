import Human from '@/classes/Human';
import RegionUser from '@/classes/RegionUser';
import RegisterUser from '@/classes/RegisterUser';
import UserAccount from '@/services/classes/UserAccount';
import ClassHelper from '@/services/ClassHelper';

export default class User {
  id?: string;
  @ClassHelper.GetClassConstructor(UserAccount)
  userAccount: UserAccount = new UserAccount();
  userAccountId?: string;

  @ClassHelper.GetClassConstructor(RegisterUser)
  human: Human = new Human();
  @ClassHelper.GetClassConstructor(RegisterUser)
  registersUsers: RegisterUser[] = [];
  registersUsersForDelete: string[] = [];
  @ClassHelper.GetClassConstructor(RegionUser)
  regionsUsers: RegionUser[] = [];
  regionsUsersForDelete: string[] = [];

  position = '';
  division = '';
  // registerPropertyToUser: RegisterPropertyToUser[] = [];

  constructor(i?: User) {
    ClassHelper.BuildClass(this, i);
  }

  static Create(): User {
    const item = new User();
    item.id = ClassHelper.CreateUUID();
    item.userAccount = UserAccount.Create();
    item.userAccountId = item.userAccount.id;
    return item;
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
  static GetClassName(): string {
    return 'user';
  }
}
