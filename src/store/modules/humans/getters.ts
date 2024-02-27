import { GetterTree } from 'vuex';

import Human from '@/classes/Human';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<Human, State>(),
};

export default getters;
