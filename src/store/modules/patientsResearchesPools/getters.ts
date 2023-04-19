import { GetterTree } from 'vuex';

import PatientResearchesPool from '@/classes/PatientResearchesPool';
import getBaseGetters from '@/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<PatientResearchesPool, State>(),
};

export default getters;
