import { ActionTree } from 'vuex';

import IUser from '@/interfaces/users/IUser';
import IUserAuthorized from '@/interfaces/users/IUserAuthorized';
import IUserResponse from '@/interfaces/users/IUserResponse';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import State from './state';

const httpClient = new HttpClient('auth');

const actions: ActionTree<State, RootState> = {
  login: async ({ commit }, user: IUser): Promise<void> => {
    const { user: newUser, token } = await httpClient.post<IUser, IUserResponse>({ query: 'login', payload: user });
    localStorage.setItem('token', token.accessToken);
    if (newUser.id) localStorage.setItem('userId', newUser.id);
    if (newUser.email) localStorage.setItem('userEmail', newUser.email);
    commit('setToken', token);
    commit('setUser', newUser);
    commit('setIsAuth', true);
  },
  getMe: async ({ commit }): Promise<void> => {
    commit('setUser', await httpClient.get<IUserAuthorized>({ query: 'me' }));
  },
  register: async ({ commit }, user: IUser): Promise<void> => {
    const { user: newUser, token } = await httpClient.post<IUser, IUserResponse>({ query: 'register', payload: user });
    localStorage.setItem('token', token.accessToken);
    if (newUser.id) localStorage.setItem('userId', newUser.id);
    commit('setToken', token.accessToken);
    commit('setUser', newUser);
    commit('setIsAuth', true);
  },
  logout: async ({ commit }): Promise<void> => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    commit('setIsAuth', false);
  },
  editAuthUser: async ({ commit }, user: IUser): Promise<void> => {
    const { user: newUser } = await httpClient.put<IUser, IUserResponse>({ query: user.id, payload: user });
    commit('setUser', newUser);
  },
};

export default actions;
