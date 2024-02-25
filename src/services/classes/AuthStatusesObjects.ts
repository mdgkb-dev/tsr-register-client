import AuthButton from '@/services/classes/AuthButton';
import AuthStatuses from '@/services/interfaces/AuthStatuses';

export const AuthStatusesObjects: Record<AuthStatuses, Record<string, string | AuthButton[]>> = {
  [AuthStatuses.Login]: {
    title: 'Войдите в систему',
    action: 'login',
    component: 'LoginChunk',
    buttons: AuthButton.LoginButtons(),
    errorMessage: 'Неверно указан email или пароль',
  },
  [AuthStatuses.Register]: {
    title: 'Зарегистрируйтесь',
    action: 'register',
    component: 'RegisterChunk',
    buttons: AuthButton.RegisterButtons(),
    errorMessage: 'Неверно указан email или пароль',
    successMessage: 'Вы успешно зарегистрировались в системе, проверьте почту для подтверждения',
  },
  [AuthStatuses.Restore]: {
    title: 'Введите email для восстановления пароля',
    component: 'ForgotPasswordChunk',
    action: 'restorePassword',
    successMessage: 'Ссылка для восстановления пароля отправлена на Вашу почту',
    errorMessage: 'Неверно указан email',
    buttons: AuthButton.RestoreButtons(),
  },
  [AuthStatuses.Refresh]: {
    title: 'Введите новый пароль',
    action: 'passwordChange',
    component: 'PasswordChangeChunk',
    successMessage: 'Воспользуйтесь новым паролем для входа',
    errorMessage: 'Неверно указан email',
    buttons: AuthButton.RefreshButtons(),
  },
};
