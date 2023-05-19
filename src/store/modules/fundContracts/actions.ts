import { ActionTree } from 'vuex';

import FundContract from '@/classes/FundContract';
import getBaseActions from '@/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<FundContract, State>('fund-contracts'),
};

export default actions;
