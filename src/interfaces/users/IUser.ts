import IHuman from '@/interfaces/humans/IHuman';

export default interface IUser {
  id: string;
  human: IHuman;
  login: string;
  email: string;
}
