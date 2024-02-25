import AuthStatuses from '@/services/interfaces/AuthStatuses';

type MyCallbackWithOptParam = (error?: Error) => void;

export default class EmailField {
  email = '';

  rule(_: unknown, value: string, callback: MyCallbackWithOptParam) {
    if (!value.trim().length) {
      callback(new Error('Необходимо указать email'));
      return;
    }
    callback();
    return;
  }

  reset(): void {
    this.email = '';
  }

  show(status: AuthStatuses): boolean {
    console.log(status);
    return [AuthStatuses.Login, AuthStatuses.Register, AuthStatuses.Restore].includes(status);
  }
}
