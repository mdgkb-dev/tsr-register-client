import AuthButton from '@/services/classes/auth/AuthButton';
import { AuthStatusesObjects } from '@/services/classes/auth/AuthStatusesObjects';
import Profile from '@/services/classes/auth/Profile';
import AuthStatuses from '@/services/interfaces/AuthStatuses';

export default class Auth {
  authModalVisible = false;
  status: AuthStatuses = AuthStatuses.Login;
  profile = new Profile();

  isLogin(): boolean {
    return this.status === AuthStatuses.Login;
  }

  isRegister(): boolean {
    return this.status === AuthStatuses.Register;
  }

  isRestore(): boolean {
    return this.status === AuthStatuses.Restore;
  }

  isRefresh(): boolean {
    return this.status === AuthStatuses.Refresh;
  }

  setStatus(status: AuthStatuses): void {
    this.status = status;
  }

  getAuthChunkTitle(): string {
    return AuthStatusesObjects[this.status].title as string;
  }

  getComponent(): string {
    return AuthStatusesObjects[this.status].component as string;
  }

  getAuthButtons(): AuthButton[] {
    return AuthStatusesObjects[this.status].buttons as AuthButton[];
  }

  closeModal(): void {
    this.authModalVisible = false;
  }

  openModal(): void {
    this.authModalVisible = true;
  }

  getSuccessMessage(): string {
    return AuthStatusesObjects[this.status].successMessage as string;
  }

  getErrorMessage(): string {
    return AuthStatusesObjects[this.status].errorMessage as string;
  }

  showEmailField(): boolean {
    return this.isLogin() || this.isRegister() || this.isRestore();
  }

  showPasswordField(): boolean {
    return this.isLogin() || this.isRegister() || this.isRefresh();
  }
}
