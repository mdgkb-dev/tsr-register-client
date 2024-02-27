import { GetterTree } from 'vuex';

import Research from '@/classes/Research';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<Research, State>(),
};

export default getters;
