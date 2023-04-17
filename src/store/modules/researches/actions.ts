import { ActionTree } from 'vuex';

import Research from '@/classes/Research';
import getBaseActions from '@/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<Research, State>('researches'),
};

export default actions;
