import { GetterTree } from 'vuex';

import PatientResearch from '@/classes/PatientResearch';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<PatientResearch, State>(),
};

export default getters;
