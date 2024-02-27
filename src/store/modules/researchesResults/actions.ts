import { ActionTree } from 'vuex';

import ResearchResult from '@/classes/ResearchResult';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<ResearchResult, State>('researches-results'),
};

export default actions;
