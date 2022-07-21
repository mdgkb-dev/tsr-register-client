import IUserAuthorized from '@/interfaces/IUserAuthorized';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';

export default interface IRegisterPropertyToUser {
  id?: string;
  registerPropertyId: string;
  registerProperty?: IRegisterProperty;
  userId: string;
  user?: IUserAuthorized;
}
