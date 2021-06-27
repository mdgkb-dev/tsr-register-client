import IUserAuthorized from '@/interfaces/users/IUserAuthorized';

export interface State {
  user?: IUserAuthorized;
  isAuthorized: boolean;
  authorizationError: string;
}
