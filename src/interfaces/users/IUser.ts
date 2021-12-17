import IHuman from '@/interfaces/humans/IHuman';
import IRegisterUser from '@/interfaces/users/IRegisterUser';

export default interface IUser {
  id?: string;
  human: IHuman;
  login: string;
  email: string;
  registersUsers: IRegisterUser[];
  registersUsersForDelete: string[];

  addRegister: (isAdd: boolean, registerId: string) => void;
}
