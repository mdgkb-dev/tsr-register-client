import { GetterTree } from 'vuex';

import User from '@/classes/User';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<User, State>(),
};

export default getters;
