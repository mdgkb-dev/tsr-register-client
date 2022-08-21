import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import IRegisterPropertyToUser from '@/interfaces/registers/IRegisterPropertyToUser';

export default interface IUserAuthorized {
  id: string;
  login: string;
  email: string;
  region: string;
  registerPropertyToUser: IRegisterPropertyToUser[];

  filterActualProperties: (registerProperties: IRegisterProperty[]) => IRegisterProperty[];
}
