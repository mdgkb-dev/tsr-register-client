import { GetterTree } from 'vuex';
import { RootState } from '@/store/types';
import { State } from './state';
import IUser from '@/interfaces/users/IUser';

const getters: GetterTree<State, RootState> = {
  users(state): IUser[] | undefined {
    return state.users;
  },
  user(state): IUser | undefined {
    return state.user;
  },
  getById(state, id: number): IUser | undefined {
    return state.users.find((item: any) => item.id === id);
  },
};

export default getters;
