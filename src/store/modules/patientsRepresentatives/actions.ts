import { ActionTree } from 'vuex';

import PatientRepresentative from '@/classes/PatientRepresentative';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<PatientRepresentative, State>('patients-representatives'),
};

export default actions;
