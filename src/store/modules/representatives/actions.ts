import { ActionTree } from 'vuex';

import Representative from '@/classes/Representative';
import HttpClient from '@/services/HttpClient';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const httpClient = new HttpClient('representatives');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<Representative, State>(httpClient),
  getBySnils: async ({ commit }, snils: string) => {
    commit('setExists', await httpClient.get<Representative>({ query: 'by-snils/' + snils }));
  },
};

export default actions;
