import { ActionTree } from 'vuex';

import ITokens from '@/interfaces/ITokens';
import IUser from '@/interfaces/IUser';
import IUserAuthorized from '@/interfaces/IUserAuthorized';
import IUserResponse from '@/interfaces/IUserResponse';
import Profile from '@/services/classes/auth/Profile';
import HttpClient from '@/services/HttpClient';
import TokenService from '@/services/Token';
import RootState from '@/store/types';

import State from './state';

const httpClient = new HttpClient('auth');

const actions: ActionTree<State, RootState> = {
  register: async ({ commit, state }): Promise<void> => {
    const res = await httpClient.post<Profile, { user: IUser; tokens: ITokens }>({
      query: 'register',
      payload: state.auth.profile,
    });
    if (!res) {
      return;
    }
    const { user: newUser, tokens } = res;
    commit('setUser', newUser);
    commit('setTokens', tokens);
    commit('setIsAuth', true);
  },
  login: async ({ commit, state }): Promise<void> => {
    const res = await httpClient.post<Profile, { user: IUser; tokens: ITokens }>({
      query: 'login',
      payload: state.auth.profile,
    });
    if (!res) {
      return;
    }
    const { user: newUser, tokens } = res;
    commit('setUser', newUser);
    commit('setTokens', tokens);
    commit('setIsAuth', true);
  },
  getMe: async ({ commit }): Promise<void> => {
    commit('setUser', await httpClient.get<IUserAuthorized>({ query: 'me' }));
  },
  logout: async ({ commit }): Promise<void> => {
    commit('setIsAuth', false);
    commit('clearUser');
    commit('clearTokens');
  },
  editAuthUser: async ({ commit }, user: IUser): Promise<void> => {
    const { user: newUser } = await httpClient.put<IUser, IUserResponse>({ query: user.id, payload: user });
    commit('setUser', newUser);
  },
  checkPathPermissions: async (_, path: string): Promise<void> => {
    await httpClient.post<string, string>({ query: `check-path-permissions`, payload: path });
  },
  refreshToken: async ({ commit }): Promise<void> => {
    commit(
      'setTokens',
      await httpClient.post<{ refreshToken: string | null }, { user: IUser; token: ITokens }>({
        query: 'refresh-token',
        payload: { refreshToken: TokenService.getRefreshToken() },
      })
    );
  },
  setAuth: async ({ commit }): Promise<void> => {
    const user = TokenService.getUser();
    const token = TokenService.getAccessToken();
    if (user && token) {
      commit('setTokens', token);
      commit('setUser', user);
      commit('setIsAuth', true);
    }
  },
};

export default actions;
