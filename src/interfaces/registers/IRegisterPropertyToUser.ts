import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import IUserAuthorized from '@/interfaces/users/IUserAuthorized';

export default interface IRegisterPropertyToUser {
  id?: string;
  registerPropertyId: string;
  registerProperty?: IRegisterProperty;
  userId: string;
  user?: IUserAuthorized;
}
