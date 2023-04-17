import User from '@/classes/User';
import Auth from '@/services/classes/auth/Auth';

export default interface State {
  user: User;
  token: string;
  isAuth: boolean;
  showWarning: boolean;
  authOnly: boolean;
  authModalVisible: boolean;
  loginStatus: 'login' | 'register' | 'forgotPassword' | 'passwordChange';
  auth: Auth;
}
