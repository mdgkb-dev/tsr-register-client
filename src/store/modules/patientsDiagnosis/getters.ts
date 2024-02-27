import { GetterTree } from 'vuex';

import PatientDiagnosis from '@/classes/PatientDiagnosis';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<PatientDiagnosis, State>(),
};

export default getters;
