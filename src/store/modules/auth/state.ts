import IUserAuthorized from '@/interfaces/users/IUserAuthorized';

export default interface State {
  user?: IUserAuthorized;
  token: string;
  isAuth: boolean;
}
