import { ActionTree } from 'vuex';

import Status from '@/classes/Status';
import HttpClient from '@/services/HttpClient';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const httpClient = new HttpClient('statuses');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<Status, State>(httpClient),
};

export default actions;
