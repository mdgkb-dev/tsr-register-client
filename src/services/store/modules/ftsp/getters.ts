import { GetterTree } from 'vuex';

import FTSPSaveQuery from '@/services/classes/FTSPSaveQuery';
import RootState from '@/services/interfaces/types';
import getBaseGetters from '@/services/store/baseModule/baseGetters';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<FTSPSaveQuery, State>(),
};

export default getters;
