import { GetterTree } from 'vuex';

import CommissionStatus from '@/classes/CommissionStatus';
import getBaseGetters from '@/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<CommissionStatus, State>(),
};

export default getters;
