import { GetterTree } from 'vuex';

import CommissionTemplate from '@/classes/CommissionTemplate';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<CommissionTemplate, State>(),
};

export default getters;
