import IRegisterProperty from '@/interfaces/IRegisterProperty';
import IRegisterPropertyToUser from '@/interfaces/IRegisterPropertyToUser';

export default interface IUserAuthorized {
  id: string;
  login: string;
  email: string;
  region: string;
  registerPropertyToUser: IRegisterPropertyToUser[];

  filterActualProperties: (registerProperties: IRegisterProperty[]) => IRegisterProperty[];
}
