import RegisterProperty from '@/classes/registers/RegisterProperty';
import UserAuthorized from '@/classes/UserAuthorized';
import IUserAuthorized from '@/interfaces/IUserAuthorized';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import IRegisterPropertyToUser from '@/interfaces/registers/IRegisterPropertyToUser';

export default class RegisterPropertyToUser implements IRegisterPropertyToUser {
  id?: string;
  registerPropertyId = '';
  registerProperty?: IRegisterProperty;
  userId = '';
  user?: IUserAuthorized;

  constructor(item?: IRegisterPropertyToUser) {
    if (!item) {
      return;
    }
    this.id = item.id;
    this.registerPropertyId = item.registerPropertyId;
    this.userId = item.userId;
    if (this.registerProperty) this.registerProperty = new RegisterProperty(item.registerProperty);
    if (this.user) this.user = new UserAuthorized(item.user);
  }
}
