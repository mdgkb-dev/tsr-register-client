import { GetterTree } from 'vuex';

import FundContract from '@/classes/FundContract';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<FundContract, State>(),
};

export default getters;
