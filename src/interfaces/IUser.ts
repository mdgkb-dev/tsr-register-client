import IHuman from '@/interfaces/IHuman';
import IRegionUser from '@/interfaces/IRegionUser';
import IRegisterProperty from '@/interfaces/IRegisterProperty';
import IRegisterPropertyToUser from '@/interfaces/IRegisterPropertyToUser';
import IRegisterUser from '@/interfaces/IRegisterUser';

export default interface IUser {
  id?: string;
  human: IHuman;
  login: string;
  email: string;
  registersUsers: IRegisterUser[];
  registersUsersForDelete: string[];
  registerPropertyToUser: IRegisterPropertyToUser[];
  regionsUsers: IRegionUser[];
  regionsUsersForDelete: string[];

  addRegister: (isAdd: boolean, registerId: string) => void;
  filterActualProperties: (registerProperties: IRegisterProperty[]) => IRegisterProperty[];
}
