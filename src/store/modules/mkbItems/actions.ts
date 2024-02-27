import { ActionTree } from 'vuex';

import MkbItem from '@/classes/MkbItem';
import HttpClient from '@/services/HttpClient';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const httpClient = new HttpClient('mkb-items');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<MkbItem, State>(httpClient),
  tree: async (): Promise<void> => {
    await httpClient.get({ query: `tree` });
  },
};

export default actions;
