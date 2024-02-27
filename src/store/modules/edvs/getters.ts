import { GetterTree } from 'vuex';

import Edv from '@/classes/Edv';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<Edv, State>(),
};

export default getters;
