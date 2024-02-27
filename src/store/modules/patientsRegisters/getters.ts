import { GetterTree } from 'vuex';

import PatientRegister from '@/classes/PatientRegister';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<PatientRegister, State>(),
};

export default getters;
