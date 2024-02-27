import { GetterTree } from 'vuex';

import Commission from '@/classes/Commission';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<Commission, State>(),
};

export default getters;
