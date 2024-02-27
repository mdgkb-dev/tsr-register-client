import { GetterTree } from 'vuex';

import PatientRepresentative from '@/classes/PatientRepresentative';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<PatientRepresentative, State>(),
};

export default getters;
