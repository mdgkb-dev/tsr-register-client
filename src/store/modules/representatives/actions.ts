import { ActionTree } from 'vuex';

import Representative from '@/classes/Representative';
import getBaseActions from '@/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<Representative, State>('representatives'),
};

export default actions;
