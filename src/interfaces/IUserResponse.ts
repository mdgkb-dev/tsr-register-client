import IToken from '@/interfaces/auth/IToken';
import IUser from '@/interfaces/IUser';

export default interface IUserResponse {
  user: IUser;
  token: IToken;
}
