import RegisterPropertyToUser from '@/classes/RegisterPropertyToUser';
import IRegisterProperty from '@/interfaces/IRegisterProperty';
import IRegisterPropertyToUser from '@/interfaces/IRegisterPropertyToUser';
import IUserAuthorized from '@/interfaces/IUserAuthorized';

export default class UserAuthorized implements IUserAuthorized {
  id = '';
  login = '';
  email = '';
  region = '';
  registerPropertyToUser: IRegisterPropertyToUser[] = [];

  constructor(item?: IUserAuthorized) {
    if (!item) return;
    this.id = item.id;
    this.login = item.login;
    this.email = item.email;
    this.region = item.region;
    if (item.registerPropertyToUser) {
      this.registerPropertyToUser = item.registerPropertyToUser.map((i: IRegisterPropertyToUser) => new RegisterPropertyToUser(i));
    }
  }

  filterActualProperties(registerProperties: IRegisterProperty[]): IRegisterProperty[] {
    const props = registerProperties.filter((prop: IRegisterProperty) => !this.registerPropertyToUser.find((userProp) => userProp.registerPropertyId === prop.id));
    return props;
  }
}
