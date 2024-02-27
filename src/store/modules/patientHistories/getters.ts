import { GetterTree } from 'vuex';

import PatientHistory from '@/classes/PatientHistory';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<PatientHistory, State>(),
};

export default getters;
