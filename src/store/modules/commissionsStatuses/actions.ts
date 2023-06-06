import { ActionTree } from 'vuex';

import CommissionStatus from '@/classes/CommissionStatus';
import HttpClient from '@/services/HttpClient';
import getBaseActions from '@/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const httpClient = new HttpClient('commissions-statuses');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<CommissionStatus, State>(httpClient),
};

export default actions;
