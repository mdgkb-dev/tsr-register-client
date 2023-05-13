import { ActionTree } from 'vuex';

import Commission from '@/classes/Commission';
import getBaseActions from '@/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<Commission, State>('commissions'),
};

export default actions;
