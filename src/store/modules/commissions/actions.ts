import { ActionTree } from 'vuex';

import Commission from '@/classes/Commission';
import HttpClient from '@/services/HttpClient';
import getBaseActions from '@/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const httpClient = new HttpClient('commissions');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<Commission, State>(httpClient),
  createAndSetNumber: async ({ commit, state }, item: Commission): Promise<void> => {
    const resp = await httpClient.post<Commission, Commission>({ payload: item, isFormData: true });
    if (resp) {
      item.number = resp.number;
    }
  },
};

export default actions;
