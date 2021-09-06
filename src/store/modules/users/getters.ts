import { GetterTree } from 'vuex';

import IHuman from '@/interfaces/humans/IHuman';
import IUser from '@/interfaces/users/IUser';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  users(state): IUser[] | undefined {
    return state.users;
  },
  user(state): IUser | undefined {
    return state.user;
  },
  getById(state, id: string): IUser | undefined {
    return state.users.find((item: IUser) => item.id === id);
  },
  getHuman(state: State): IHuman {
    return state.user.human;
  },
};

export default getters;
