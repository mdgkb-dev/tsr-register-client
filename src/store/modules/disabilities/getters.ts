import { GetterTree } from 'vuex';

import Disability from '@/classes/Disability';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<Disability, State>(),
};

export default getters;
