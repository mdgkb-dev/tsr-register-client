import { ActionTree } from 'vuex';

import PatientHistory from '@/classes/PatientHistory';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<PatientHistory, State>('patient-histories'),
};

export default actions;
