import { ActionTree } from 'vuex';

import ResearchesPool from '@/classes/ResearchesPool';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<ResearchesPool, State>('researches-pools'),
};

export default actions;
