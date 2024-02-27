import { Constructable } from '@/services/ClassHelper';
import IWithId from '@/services/interfaces/IWithId';

import LocalStoreKeys from '../interfaces/LocalStoreKeys';
import LocalStore from './LocalStore';

export default class AuthUser<UserT extends IWithId> {
  private user: UserT | undefined;
  userConstructor?: Constructable<UserT>;

  setUserConstructor(userConstructor: Constructable<UserT>) {
    this.userConstructor = userConstructor;
  }

  get(): UserT | undefined {
    return LocalStore.Get(LocalStoreKeys.User);
  }

  getId(): string | undefined {
    return this.get()?.id;
  }

  set(user: UserT): void {
    console.log(user);
    // console.log(this.userConstructor);
    if (!this.userConstructor) {
      return;
    }
    this.user = new this.userConstructor(user);
    LocalStore.Set(LocalStoreKeys.User, this.user);
  }
  reset(): void {
    this.user = undefined;
    LocalStore.Remove(LocalStoreKeys.User);
  }

  actualize() {
    const user = LocalStore.Get<UserT>(LocalStoreKeys.User);
    if (!user) {
      return;
    }
    this.set(user);
  }
}
