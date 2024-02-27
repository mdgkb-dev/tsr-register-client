import { ActionTree } from 'vuex';

import FundCouncil from '@/classes/FundCouncil';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<FundCouncil, State>('fund-contracts'),
};

export default actions;
