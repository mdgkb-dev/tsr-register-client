import IHuman from '@/interfaces/IHuman';
import IRegionUser from '@/interfaces/IRegionUser';
import IRegisterUser from '@/interfaces/IRegisterUser';

export default interface IUser {
  id?: string;
  human: IHuman;
  login: string;
  email: string;
  registersUsers: IRegisterUser[];
  registersUsersForDelete: string[];

  regionsUsers: IRegionUser[];
  regionsUsersForDelete: string[];

  addRegister: (isAdd: boolean, registerId: string) => void;
}
