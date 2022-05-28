import { ActionTree } from 'vuex';

import IMkbGroup from '@/interfaces/mkb/IMkbGroup';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('mkb-groups');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IMkbGroup[]>());
  },
  get: async ({ commit }, id: string) => {
    commit('set', await httpClient.get<IMkbGroup>({ query: id }));
  },
};

export default actions;
