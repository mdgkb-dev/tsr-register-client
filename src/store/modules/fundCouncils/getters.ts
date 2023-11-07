import { GetterTree } from 'vuex';

import FundCouncil from '@/classes/FundCouncil';
import getBaseGetters from '@/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<FundCouncil, State>(),
};

export default getters;
