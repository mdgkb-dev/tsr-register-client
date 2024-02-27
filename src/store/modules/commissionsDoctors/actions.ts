import { ActionTree } from 'vuex';

import CommissionDoctor from '@/classes/CommissionDoctor';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<CommissionDoctor, State>('commissions-doctors'),
};

export default actions;
