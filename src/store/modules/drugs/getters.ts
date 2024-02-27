import { GetterTree } from 'vuex';

import Drug from '@/classes/Drug';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<Drug, State>(),
};

export default getters;
