import { ActionTree } from 'vuex';

import FTSPSaveQuery from '@/services/classes/FTSPSaveQuery';
import HttpClient from '@/services/HttpClient';
import RootState from '@/services/interfaces/types';
import getBaseActions from '@/services/store/baseModule/baseActions';

import { State } from './index';

const httpClient = new HttpClient('ftsp');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<FTSPSaveQuery, State>(httpClient),
};

export default actions;
