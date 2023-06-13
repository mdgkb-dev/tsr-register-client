import { ActionTree } from 'vuex';

import DrugApplicationStatus from '@/classes/DrugApplicationStatus';
import HttpClient from '@/services/HttpClient';
import getBaseActions from '@/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const httpClient = new HttpClient('drug-applications-statuses');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<DrugApplicationStatus, State>(httpClient),
};

export default actions;
