import IHuman from '@/interfaces/IHuman';
import IRegionUser from '@/interfaces/IRegionUser';
import IRegisterUser from '@/interfaces/IRegisterUser';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import IRegisterPropertyToUser from '@/interfaces/registers/IRegisterPropertyToUser';

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
