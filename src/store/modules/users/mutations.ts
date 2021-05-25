import { MutationTree } from 'vuex';
import IUser from '@/interfaces/users/IUser';
import { State } from './state';
import User from '@/classes/user/User';

const mutations: MutationTree<State> = {
  setAll(state, users: IUser[]) {
    state.users = users.map((p: IUser) => new User(p));
  },
  set(state, patient: IUser) {
    state.user = new User(patient);
  },
  create(state, payload: IUser) {
    state.users.push(new User(payload));
  },
  update(state, payload: IUser) {
    const item = state.users.find((i: any) => i.id === payload.id);
    if (item) {
      Object.assign(item, payload);
    }
  },
  delete(state, id: string) {
    const i = state.users.findIndex((item: any) => item.id === id);
    state.users.splice(i, 1);
  },
};

export default mutations;
