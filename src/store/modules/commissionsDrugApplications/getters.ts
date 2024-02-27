import { GetterTree } from 'vuex';

import CommissionDrugApplication from '@/classes/CommissionDrugApplication';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<CommissionDrugApplication, State>(),
};

export default getters;
