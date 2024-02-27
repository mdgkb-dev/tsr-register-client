import { GetterTree } from 'vuex';

import ResearchesPool from '@/classes/ResearchesPool';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<ResearchesPool, State>(),
};

export default getters;
