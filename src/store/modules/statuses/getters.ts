import { GetterTree } from 'vuex';

import Status from '@/classes/Status';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<Status, State>(),
};

export default getters;
