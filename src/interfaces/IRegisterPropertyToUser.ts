import IRegisterProperty from '@/interfaces/IRegisterProperty';
import IUserAuthorized from '@/interfaces/IUserAuthorized';

export default interface IRegisterPropertyToUser {
  id?: string;
  registerPropertyId: string;
  registerProperty?: IRegisterProperty;
  userId: string;
  user?: IUserAuthorized;
}
