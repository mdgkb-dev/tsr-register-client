import { GetterTree } from 'vuex';

import Doctor from '@/classes/Doctor';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<Doctor, State>(),
};

export default getters;
