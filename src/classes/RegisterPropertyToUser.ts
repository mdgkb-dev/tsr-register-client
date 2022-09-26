import RegisterProperty from '@/classes/RegisterProperty';
import UserAuthorized from '@/classes/UserAuthorized';
import IRegisterProperty from '@/interfaces/IRegisterProperty';
import IRegisterPropertyToUser from '@/interfaces/IRegisterPropertyToUser';
import IUserAuthorized from '@/interfaces/IUserAuthorized';

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
