import { ActionTree } from 'vuex';

import DrugApplication from '@/classes/DrugApplication';
import HttpClient from '@/services/HttpClient';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const httpClient = new HttpClient('drug-applications');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<DrugApplication, State>(httpClient),
};

export default actions;
