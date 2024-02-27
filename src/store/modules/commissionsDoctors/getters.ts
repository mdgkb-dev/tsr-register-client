import { GetterTree } from 'vuex';

import CommissionDoctor from '@/classes/CommissionDoctor';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<CommissionDoctor, State>(),
};

export default getters;
