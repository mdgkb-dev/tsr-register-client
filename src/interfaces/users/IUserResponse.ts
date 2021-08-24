import IUser from '@/interfaces/users/IUser';
import IToken from '@/interfaces/auth/IToken';

export default interface IUserResponse {
  user: IUser;
  token: IToken;
};
